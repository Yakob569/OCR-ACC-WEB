# OCR Ledger Web Integration Roadmap (Vue + Go API)

This file is the integration roadmap for turning the existing Vue web app (`Documents/Ledger/web/The Ledger/`) + the Stitch-exported standalone screens (`Documents/Ledger/web/stitch_smart_receipt_extractor(*)/`) into **one working, authenticated, end-to-end product** backed by the Go API in `Documents/Ledger/OCR-ACC-USER-MODULE/`.

## Source of Truth

- Backend plan: `Documents/Ledger/OCR-ACC-USER-MODULE/OCR_LEDGER_BACKEND_PLAN.md`
- Backend API contract (definitive): `Documents/Ledger/OCR-ACC-USER-MODULE/postman_collection.json`
- Current Vue app (already has Landing + Register + Login UI): `Documents/Ledger/web/The Ledger/`
- Remaining post-login designs (standalone exports):
  - `Documents/Ledger/web/stitch_smart_receipt_extractor(4)/` (Dashboard)
  - `Documents/Ledger/web/stitch_smart_receipt_extractor(5)/` (History / Groups list)
  - `Documents/Ledger/web/stitch_smart_receipt_extractor(6)/` (Group detail + upload + recent uploads)
  - `Documents/Ledger/web/stitch_smart_receipt_extractor(7)/` (Exports — older/duplicate)
  - `Documents/Ledger/web/stitch_smart_receipt_extractor(8)/` (Exports — recommended to use)

## Target UX (What “Done” Means)

An authenticated user can:

1. Register + login (email/password) and receive JWT tokens
2. View Dashboard summary and recent activity
3. Create receipt groups (batches)
4. Upload multiple receipt images to a group (`files[]`)
5. Track group progress and per-image status
6. Open an image detail view, see OCR results, submit review/corrections, and retry failed OCR
7. Create a CSV export for a group and see export history

## Current Web App State (Vue)

Implemented in `Documents/Ledger/web/The Ledger/src/`:

- Public routes:
  - `/` landing (`Features.vue`)
  - `/getstarted` register UI (`Get-Started.vue`)
  - `/login` login UI (`Log-in.vue`)

Not yet implemented in the Vue app:

- Post-login app shell (`/app/*`)
- Protected routing and token handling
- All post-login screens (Dashboard, Groups, Group detail, Image detail, Exports, Settings)
- API integration to Go backend

## Backend Endpoints (From Postman)

All protected endpoints require:

- `Authorization: Bearer <access_token>`

### Health
- `GET /health`

### Auth
- `POST /api/v1/register` (email, password, full_name, phone) → returns `tokens`
- `POST /api/v1/login` (email, password) → returns tokens
- `POST /api/v1/refresh` (refresh_token) → returns tokens
- `POST /api/v1/logout` (refresh_token)
- `GET /api/v1/profile`

### Dashboard
- `GET /api/v1/dashboard/summary`

### Groups
- `POST /api/v1/groups` (name, description)
- `GET /api/v1/groups?limit=&offset=`
- `GET /api/v1/groups/:groupId`

### Group images / results / exports
- `POST /api/v1/groups/:groupId/images` (multipart form-data `files` as file input; supports multiple)
- `GET /api/v1/groups/:groupId/images?limit=&offset=`
- `GET /api/v1/groups/:groupId/results?limit=&offset=`
- `POST /api/v1/groups/:groupId/exports/csv` (`selected_columns`, `include_corrected_values`)
- `GET /api/v1/groups/:groupId/exports?limit=&offset=`

### Image detail actions
- `GET /api/v1/images/:imageId`
- `GET /api/v1/images/:imageId/result`
- `POST /api/v1/images/:imageId/review` (`quality_label`, `is_accepted`, `corrected_fields`, `review_notes`)
- `POST /api/v1/images/:imageId/retry`

## API/UX “Gotchas” (Must Handle)

1. Several response fields are stored as base64-encoded JSON strings (examples in Postman):
   - OCR result: `fields_json`, `items_json`, `warnings_json`, `debug_json` (e.g. `e30=` for `{}`)
   - Export: `selected_columns_json` (base64 for a JSON array)
   - The UI must **decode base64 → JSON** before rendering, and handle decode failures safely.
2. Export download links:
   - Postman examples show `storage_url: null` for exports.
   - UX should treat exports as “created” but may not be directly downloadable until backend returns a URL or adds a signed-download endpoint.
3. “Recent Images” on Dashboard:
   - There is no global “list all my images” endpoint in Postman.
   - The Dashboard screen should rely on `GET /dashboard/summary` providing `recent_images`, or we add a backend endpoint later.
4. Stitch designs show UI metrics (ex: “Total Value”) that are **not in `/dashboard/summary`** today.
   - Either remove/replace those fields in the UI or compute from OCR results later (future scope).

## Screen-to-Endpoint Mapping (What Each Screen Calls)

### A) Dashboard (Stitch: `stitch_smart_receipt_extractor(4)`)

- Summary cards → `GET /api/v1/dashboard/summary`
- Recent groups table → `dashboard.summary.recent_groups` (preferred) or fallback to `GET /api/v1/groups?limit=...`
- Recent images list → `dashboard.summary.recent_images` (required; otherwise needs backend support)

### B) History / Groups list (Stitch: `stitch_smart_receipt_extractor(5)`)

- Groups table → `GET /api/v1/groups?limit=&offset=`
- “New Group” → `POST /api/v1/groups`
- Row click → `GET /api/v1/groups/:groupId` (or navigate and load it there)

### C) Group detail (Stitch: `stitch_smart_receipt_extractor(6)`)

- Header + counters → `GET /api/v1/groups/:groupId`
- Upload receipts (multi-file) → `POST /api/v1/groups/:groupId/images` with form-data key `files`
- Images table/list → `GET /api/v1/groups/:groupId/images?limit=&offset=`
- Results preview (if implemented) → `GET /api/v1/groups/:groupId/results?limit=&offset=`
- Exports panel → `GET /api/v1/groups/:groupId/exports` + `POST /api/v1/groups/:groupId/exports/csv`

### D) Image detail (No Stitch export found yet; must be implemented)

- Image metadata → `GET /api/v1/images/:imageId`
- OCR result → `GET /api/v1/images/:imageId/result` (decode base64 JSON fields)
- Submit review/corrections → `POST /api/v1/images/:imageId/review`
- Retry OCR → `POST /api/v1/images/:imageId/retry`

### E) Exports (Stitch: use `stitch_smart_receipt_extractor(8)`; (7) appears duplicated)

- Group dropdown → `GET /api/v1/groups?limit=&offset=` (or cached groups store)
- Create export → `POST /api/v1/groups/:groupId/exports/csv`
- Export history → `GET /api/v1/groups/:groupId/exports?limit=&offset=`

## What’s Missing (UX / Product Completeness)

These items should be included in implementation even if not perfectly covered by the exports:

- Protected routing (`/app/*`) + redirect rules (unauthenticated → `/login`)
- Global API error handling (401 → refresh token → retry; or logout)
- Loading/empty/error states for every table/list
- Pagination (limit/offset) for groups/images/results/exports
- Image detail screen design (can start “functional-first” and polish later)
- Export download UX (until backend provides `storage_url`, show “created” state with disabled download)
- Retry UX: only show retry when `ocr_status=failed` (and show last error code/message)

## Integration Roadmap (Implementation Order)

### Step 0 — Decide/Confirm Web App Integration Strategy

We keep the existing Vue app (`Documents/Ledger/web/The Ledger/`) as the single app.

Decision points (keep minimal):

- Styling approach for Stitch Tailwind exports:
  - Option A (fastest): add Tailwind to the existing Vue app and reuse exported classnames
  - Option B (slowest): rewrite exported Tailwind markup into the current CSS approach
- Token storage:
  - Start with `localStorage` (simple) and migrate to cookies later if needed

### Step 1 — Add API Layer + Auth Store

- Add a single `API_BASE_URL` config (env, `.env`)
- Implement `apiClient` wrapper (fetch/axios) that:
  - attaches `Authorization: Bearer <access_token>`
  - handles 401 by calling `POST /api/v1/refresh` then retries once
- Add a minimal auth store (reactive module):
  - access token, refresh token, expires_at
  - `login()`, `register()`, `logout()`, `loadProfile()`

### Step 2 — Rework Routes to Match Post-Login UX

Target routes (from `UI_DESIGN_PROMPT.md`):

- Public: `/`, `/login`, `/getstarted`
- Protected:
  - `/app` (redirect → `/app/dashboard`)
  - `/app/dashboard`
  - `/app/groups`
  - `/app/groups/:groupId`
  - `/app/images/:imageId`
  - `/app/exports`
  - `/app/settings` (minimal placeholder)

Add route guards:

- If route is protected and no valid token → redirect to `/login`

### Step 3 — Implement App Shell Layout (Protected)

- Left navigation (desktop) / collapsed nav (mobile)
- Top bar: page title + user menu (profile/logout) + “New Group”
- Fetch profile on shell mount → `GET /api/v1/profile`

### Step 4 — Dashboard Screen

- Implement the Stitch dashboard layout from `stitch_smart_receipt_extractor(4)/`
- Wire data to `GET /api/v1/dashboard/summary`
- Ensure empty states:
  - No groups/images yet → CTA “Create your first group”

### Step 5 — Groups List (History)

- Implement the Stitch history layout from `stitch_smart_receipt_extractor(5)/`
- Wire table to `GET /api/v1/groups?limit=&offset=`
- Implement create group:
  - modal or page → `POST /api/v1/groups`
  - navigate to `/app/groups/:groupId` on success
- Replace any metrics not supported by API (ex: “Total Value”) with values from `/dashboard/summary` or remove.

### Step 6 — Group Detail + Upload + Image List

- Implement group header + counters → `GET /api/v1/groups/:groupId`
- Implement upload:
  - multi-file picker + drag/drop
  - POST multipart form-data key `files` (append each file under the same key)
  - optimistic UI: show “uploading” rows, then refresh images list
- Images list table:
  - `GET /api/v1/groups/:groupId/images?limit=&offset=`
  - show status pills based on `upload_status`, `ocr_status`, `review_status`
  - actions:
    - “View” → `/app/images/:imageId`
    - “Review” → `/app/images/:imageId` (only when needs review / pending)
    - “Retry” → call retry endpoint (only when failed)
- Exports panel:
  - list exports → `GET /api/v1/groups/:groupId/exports`
  - create export → `POST /api/v1/groups/:groupId/exports/csv`

### Step 7 — Image Detail (OCR Result + Review + Retry)

- Implement functional-first screen (even if design is not perfect yet)
- Data loads:
  - metadata: `GET /api/v1/images/:imageId`
  - result: `GET /api/v1/images/:imageId/result`
- Decode `fields_json/items_json/warnings_json/debug_json` from base64 and render:
  - “Fields” key/value list
  - “Items” table when present
  - warnings list
- Review submit:
  - `POST /api/v1/images/:imageId/review`
  - keep corrected fields minimal at first (simple JSON textarea), then upgrade to a structured form
- Retry:
  - `POST /api/v1/images/:imageId/retry`
  - after retry, refetch metadata/result

### Step 8 — Exports Screen

- Implement exports UI from `stitch_smart_receipt_extractor(8)/`
- Group select uses groups list
- Create export uses `selected_columns` + `include_corrected_values`
- Export list table uses `GET /groups/:groupId/exports`
- Download UX:
  - if `storage_url` is null → show “Not available” (disabled)
  - if backend later returns a URL → enable download

### Step 9 — Polish + Hardening (After Everything Works)

- Consistent toast/notification system
- Skeleton loaders for tables/cards
- Centralized status mapping + labels
- Better corrected-fields editor UI
- Caching (groups list) and background refresh

