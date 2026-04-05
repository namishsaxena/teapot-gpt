# Contributing to TeapotGPT

Thanks for your interest in contributing to TeapotGPT! Whether you want to add new 418 responses, fix bugs, or improve the UI, contributions are welcome.

## Getting Started

1. Fork the repository
2. Clone your fork and install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env.local` with your Upstash Redis credentials:
   ```
   KV_REST_API_URL=your_url
   KV_REST_API_TOKEN=your_token
   ```
4. Start the dev server:
   ```bash
   pnpm dev
   ```

## Ways to Contribute

### Add New 418 Responses

The teapot's personality lives in `data/responses.json`. Each response has a category and keyword triggers defined in `data/trigger_map.json`. New responses should:

- Always refuse to brew coffee (HTTP 418, no exceptions)
- Match the deadpan corporate AI tone
- Be categorized appropriately

### Report Bugs

Open an issue with:
- What you expected
- What actually happened
- Browser and OS info

### Submit Code Changes

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting:
   ```bash
   pnpm test
   pnpm lint
   npx tsc --noEmit
   ```
4. Open a pull request against `main`

## Terminology

This project uses tea-themed terminology throughout. Please maintain consistency:

| Use | Not |
|-----|-----|
| brews | attempts |
| steeps | upvotes |
| Spillboard | leaderboard |
| Incident Reports | previous attempts |

## Code Style

- TypeScript strict mode
- Tailwind CSS for styling
- All components in `components/` use `"use client"`
- Monospace font (Geist Mono) for data, Space Grotesk for headings

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
