# Contributing to Mirema Hotel

Thank you for considering contributing! We welcome contributions to improve the Mirema Hotel platform.

Please read this document to understand our workflow.

## Code of Conduct

By participating, you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Setup

1. Fork & clone the repo
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up env vars (Wix keys, MongoDB URI)
4. Run dev servers:
   ```bash
   # Terminal 1: Frontend
   cd frontend && npm run dev

   # Terminal 2: Backend
   cd backend && npm run dev
   ```

## How to Contribute

### Reporting Bugs
- Use [bug_report.md](ISSUE_TEMPLATE/bug_report.md)
- Include steps to reproduce, expected/actual behavior, environment (browser/Node version, OS)

### Feature Requests
- Use [feature_request.md](ISSUE_TEMPLATE/feature_request.md)
- Describe use case, screenshots/mockups if possible

### Pull Requests
1. Create branch: `git checkout -b feature/short-desc`
2. Commit atomically: Conventional commits preferred (`feat: add X`, `fix: resolve Y`)
3. Update code, tests, docs
4. Pass lint/tests: `npm run check && npm run test:run`
5. PR against `main` using [pull_request_template.md](pull_request_template.md)

## Code Style

- Follow existing patterns (Prettier/ESLint autoformat)
- TypeScript strict
- Components: PascalCase, small/single-responsibility
- API: RESTful, error handling consistent

## Testing
- Unit tests: Vitest (`npm run test:run`)
- E2E: Playwright/Vitest workspace
- Test new/changed code

## Releasing
- Bump version in package.json (frontend/backend)
- `npm run build && npm run preview`
- Create tag/release

## Questions?
Open an issue or ask in discussions.

Happy contributing! 🎉
