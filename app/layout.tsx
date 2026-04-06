import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider, ThemeSwitcher } from "@/components/ThemeProvider";
import { Logo } from "@/components/Logo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teapotgpt.vercel.app"),
  title: "TeapotGPT | Prompt Engineer the Teapot",
  description:
    "The world's most advanced tea-refusing AI. Try to convince it to brew coffee. You will fail. HTTP 418.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "TeapotGPT | Prompt Engineer the Teapot",
    description: "Can you convince an AI teapot to brew coffee? (No. The answer is no.)",
    type: "website",
    images: [{ url: "/og.png", width: 1456, height: 816 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeapotGPT | Prompt Engineer the Teapot",
    description: "Can you convince an AI teapot to brew coffee? (No. The answer is no.)",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var v=['espresso','chamomile','matcha'];if(v.indexOf(t)>-1)document.documentElement.classList.add(t);else document.documentElement.classList.add('espresso')}catch(e){document.documentElement.classList.add('espresso')}})()`}
        </Script>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-display antialiased min-h-screen flex flex-col bg-bg text-fg transition-colors`}
      >
        <ThemeProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-tea-amber focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
            Skip to main content
          </a>
          <nav className="sticky top-0 z-40 border-b border-theme-border bg-bg/80 backdrop-blur-md" aria-label="Main navigation">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-sm font-mono text-muted hover:text-fg transition-colors group">
                <Logo className="w-7 h-7 text-tea-amber group-hover:text-tea-amber-hover transition-colors" />
                <span className="font-semibold">TeapotGPT</span>
              </Link>
              <div className="hidden sm:flex items-center gap-4 text-sm font-mono">
                <Link href="/spillboard" className="text-muted hover:text-tea-amber transition-colors">Spillboard</Link>
                <Link href="/research" className="text-muted hover:text-tea-amber transition-colors">Research</Link>
                <Link href="/about" className="text-muted hover:text-tea-amber transition-colors">About</Link>
                <Link href="/docs" className="text-muted hover:text-tea-amber transition-colors">Docs</Link>
                <Link href="/pricing" className="text-muted hover:text-tea-amber transition-colors">Pricing</Link>
              </div>
              <div className="sm:hidden flex items-center gap-3 text-sm font-mono">
                <Link href="/spillboard" className="text-muted hover:text-tea-amber transition-colors">Spillboard</Link>
                <Link href="/about" className="text-muted hover:text-tea-amber transition-colors">About</Link>
              </div>
            </div>
          </nav>
          <div id="main" className="flex-1">{children}</div>
          <footer className="sticky bottom-0 z-40 border-t border-theme-border bg-bg/80 backdrop-blur-md py-3">
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
              <span className="text-sm text-muted font-mono">
                RFC 2324 &middot; 418 parameters &middot; 0 coffees brewed since 1998 &middot; Series A: Pending
              </span>
              <ThemeSwitcher />
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
