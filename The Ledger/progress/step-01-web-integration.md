# Web Integration Progress — The Ledger (Vue)

This folder tracks progress for the web app located at `Documents/Ledger/web/The Ledger/`.

## Context

- Backend source of truth: Go service in `Documents/Ledger/OCR-ACC-USER-MODULE/`
- Backend API contract: `Documents/Ledger/OCR-ACC-USER-MODULE/postman_collection.json`
- Base URL (prod): `https://ocr-acc-user-module.onrender.com`
- Integration roadmap (web): `Documents/Ledger/web/OCR_LEDGER_WEB_INTEGRATION_ROADMAP.md`

## Done

- Added this `progress/` tracking folder and this progress file.
- Added `VITE_API_BASE_URL` support (defaults to Render base URL).
- Implemented API client + auth store with refresh-on-401 retry.
- Wired `/login` and `/getstarted` forms to Go auth endpoints.
- Added protected `/app/*` routes and a minimal `AppShell` layout placeholder.

## In progress / Next

### Step 2 — First real protected screens

- Dashboard: `GET /api/v1/dashboard/summary`
- Groups list + create group: `GET/POST /api/v1/groups`
- Group detail:
  - `GET /api/v1/groups/:groupId`
  - uploads: `POST /api/v1/groups/:groupId/images` (multipart key: `files`)
  - list images: `GET /api/v1/groups/:groupId/images`
- Image detail:
  - `GET /api/v1/images/:imageId`
  - `GET /api/v1/images/:imageId/result` (decode base64 JSON fields)
  - `POST /api/v1/images/:imageId/review`
  - `POST /api/v1/images/:imageId/retry`
- Exports:
  - `POST /api/v1/groups/:groupId/exports/csv`
  - `GET /api/v1/groups/:groupId/exports`

## Left (Later)

- Implement actual post-login screens (Dashboard/Groups/Group detail/Image detail/Exports) and wire to endpoints.
- Improve error + loading UX across the app.
