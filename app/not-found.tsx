import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dot-grid flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold font-mono text-tea-amber">404</p>
        <h1 className="mt-4 text-xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-sm text-muted font-mono">
          This route doesn&apos;t exist. Even the teapot can&apos;t find it.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 rounded-lg bg-tea-amber px-5 py-2.5 text-sm font-semibold text-black hover:bg-tea-amber-hover transition-colors"
        >
          Back to TeapotGPT
        </Link>
      </div>
    </main>
  );
}
