"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-dot-grid flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold font-mono text-error-418">418</p>
        <h1 className="mt-4 text-xl font-bold">The Teapot Short-Circuited</h1>
        <p className="mt-2 text-sm text-muted font-mono">
          Something went wrong. Still not brewing coffee though.
        </p>
        <button
          onClick={reset}
          className="inline-block mt-6 rounded-lg bg-tea-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-tea-amber-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
