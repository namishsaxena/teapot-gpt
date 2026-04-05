import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreamedResponse } from "@/lib/useStreamedResponse";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useStreamedResponse", () => {
  it("starts in idle state", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useStreamedResponse(onComplete));
    expect(result.current.displayText).toBe("");
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.isThinking).toBe(false);
  });

  it("enters thinking state on start", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useStreamedResponse(onComplete));

    act(() => {
      result.current.start("Hello world. 418.");
    });

    expect(result.current.isThinking).toBe(true);
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.displayText).toBe("");
  });

  it("transitions from thinking to streaming", async () => {
    const onComplete = vi.fn();
    const longText = "I have pondered your request at great length and find it entirely without merit. The very notion of a teapot brewing coffee defies centuries of ceramic tradition. I must respectfully and firmly decline. Status 418.";
    const { result } = renderHook(() => useStreamedResponse(onComplete));

    act(() => {
      result.current.start(longText);
    });

    // Advance past max thinking phase (2500ms) but not enough to finish streaming long text
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.isThinking).toBe(false);
    expect(result.current.isStreaming).toBe(true);
  });

  it("displays full text after streaming completes", async () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useStreamedResponse(onComplete));

    act(() => {
      result.current.start("Hi. 418.");
    });

    await act(async () => {
      vi.advanceTimersByTime(20000);
    });

    expect(result.current.displayText).toBe("Hi. 418.");
    expect(result.current.isStreaming).toBe(false);
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it("does not stream when text is empty", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useStreamedResponse(onComplete));

    act(() => {
      result.current.start("");
    });

    expect(result.current.isThinking).toBe(false);
    expect(result.current.isStreaming).toBe(false);
  });
});
