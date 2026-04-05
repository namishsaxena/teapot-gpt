"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "espresso" | "chamomile" | "matcha";
const THEMES: Theme[] = ["espresso", "chamomile", "matcha"];

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "espresso",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("espresso");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && THEMES.includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const THEME_META: Record<Theme, { emoji: string; label: string }> = {
  espresso: { emoji: "☕", label: "Espresso" },
  chamomile: { emoji: "🌼", label: "Chamomile" },
  matcha: { emoji: "🍵", label: "Matcha" },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          role="radio"
          aria-checked={theme === t}
          aria-label={THEME_META[t].label}
          title={THEME_META[t].label}
          className={`relative text-lg transition-all duration-200 rounded-lg px-1 py-0.5 ${
            theme === t
              ? "theme-cup-active opacity-100 drop-shadow-[0_0_4px_var(--color-tea-amber)]"
              : "opacity-40 hover:opacity-70"
          }`}
        >
          {THEME_META[t].emoji}
        </button>
      ))}
    </div>
  );
}
