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
- Implemented functional v1 protected screens:
  - Dashboard: loads `GET /api/v1/dashboard/summary`
  - Groups: list + create (`GET/POST /api/v1/groups`)
  - Group detail: group + image list + multi-upload (`GET /groups/:id`, `GET /groups/:id/images`, `POST /groups/:id/images`)
  - Image detail: metadata + result decode + review/retry
  - Exports: create + history per group

## In progress / Next

### Step 3 — UX polish + completeness

- Group detail:
  - pagination for images/results/exports
  - add results table (`GET /api/v1/groups/:groupId/results`)
- Dashboard:
  - if `recent_groups/recent_images` are empty, fallback to listing groups
- Image detail:
  - render line items in a proper table (not JSON dump)
  - hide “Retry OCR” button unless failed/needs_review
- Exports:
  - handle `storage_url: null` better (backend might need a download endpoint)
- Global:
  - toast system
  - consistent loading/empty/error states
  - token expiry UI handling (forced logout vs silent refresh)

## Left (Later)

- Implement actual post-login screens (Dashboard/Groups/Group detail/Image detail/Exports) and wire to endpoints.
- Improve error + loading UX across the app.
