# Repository Agent Guidelines

## Versioning and Releases

- **Always bump version on changes**: Whenever making functional changes, fixes, or feature updates to the repository, ALWAYS bump the patch version across all version-tracking files:
  - `package.json`
  - `package-lock.json`
  - `src/constants/version.ts`
  - `index.html` (favicon query strings `?v=X.X.X`)

## Git and Remote Operations

- **NEVER push without explicit user permission**: Never execute `git push` (or push changes to any remote branch/repository) unless the user explicitly requests or approves a push in the conversation.
- **Keep changes local**: After editing files, verifying builds, and running tests, leave the changes local for user review. Never auto-push.
- **Commit message formatting**: In repositories enforcing commitlint (such as `commitlint.config.cjs`), always ensure commit messages strictly follow the configured rules (e.g., start with a capital letter and end with a period `.`).
