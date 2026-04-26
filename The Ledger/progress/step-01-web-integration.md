# Web Integration Progress — The Ledger (Vue)

This folder tracks progress for the web app located at `Documents/Ledger/web/The Ledger/`.

## Context

- Backend source of truth: Go service in `Documents/Ledger/OCR-ACC-USER-MODULE/`
- Backend API contract: `Documents/Ledger/OCR-ACC-USER-MODULE/postman_collection.json`
- Base URL (prod): `https://ocr-acc-user-module.onrender.com`
- Integration roadmap (web): `Documents/Ledger/web/OCR_LEDGER_WEB_INTEGRATION_ROADMAP.md`

## Done

- Added this `progress/` tracking folder and this progress file.

## In progress / Next

### Step 1 — API + Auth foundation

- Add `VITE_API_BASE_URL` with default to `https://ocr-acc-user-module.onrender.com`
- Add API client wrapper (Bearer attach, 401 refresh+retry once)
- Add minimal auth store (localStorage persistence):
  - `login`, `register`, `logout`, `refresh`
- Wire existing `/login` and `/getstarted` pages to backend endpoints:
  - `POST /api/v1/login`
  - `POST /api/v1/register`

### Step 2 — Protected routes + app shell skeleton

- Switch `App.vue` to `<router-view />` rendering
- Add protected routes under `/app/*`:
  - `/app/dashboard`, `/app/groups`, `/app/groups/:groupId`, `/app/images/:imageId`, `/app/exports`, `/app/settings`
- Add router guard: unauthenticated → redirect to `/login`
- Add minimal `AppShell` layout placeholder

## Left (Later)

- Implement actual post-login screens (Dashboard/Groups/Group detail/Image detail/Exports) and wire to endpoints.
- Improve error + loading UX across the app.

