# Lendsqr Frontend Assessment

This repository implements the Lendsqr admin experience described in the Frontend Engineer assessment. The app covers a split login screen, authenticated shell (header + sidebar), dashboard entry, users directory backed by five hundred mock records, and a detailed user profile view aligned to the shared Figma references.


**Design reference:** [Figma — Lendsqr Frontend Testing](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend)  
**Live preview:** _[https://chisom-lendsqr-fe-test.vercel.app]_

---

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Architecture decisions](#architecture-decisions)
- [Mock data and API strategy](#mock-data-and-api-strategy)
- [Data flow](#data-flow)
- [Testing strategy](#testing-strategy)
- [Visual fidelity notes](#visual-fidelity-notes)
- [Known limitations](#known-limitations)

---

## Tech stack

| Layer | Library / Tool | Version |
|---|---|---|
| UI framework | React | 19 |
| Language | TypeScript | ~5.7 |
| Build tool | Vite | 5 |
| Routing | React Router | 7 |
| Server state | TanStack Query | 5 |
| Forms | React Hook Form + Zod | 7 / 3 |
| Styling | Tailwind CSS | 3 |
| Icons | Lucide React | 0.468 |
| Mock API server | JSON Server | 1.0.0-beta |
| Testing | Vitest + Testing Library | 2 / 16 |

**Tailwind design tokens** mirror the Figma palette:

| Token | Value | Usage |
|---|---|---|
| `lendsqr-primary` | `#39CDCC` | Buttons, active states, status badges |
| `lendsqr-navy` | `#213F7D` | Headings, sidebar active text |
| `lendsqr-muted` | `#545F7D` | Body text, table cells |
| `lendsqr-border` | translucent | Table dividers, input borders |
| `lendsqr-surface` | translucent | Alternate table rows, card backgrounds |

---

## Getting started

### Prerequisites

- Node.js **≥ 20.0.0** (required by React Router 7)
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/chisom5/lendsqr-fe-test.git
cd lendsqr-fe-test

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example 
``` And generate a new .env file with the content
```

### Running the app

The app requires two processes — the Vite dev server and JSON Server:

```bash
# Terminal 1 — mock API server (runs on port 5001)
npm run server

# Terminal 2 — Vite dev server (runs on port 5173)
npm run dev
```
Terminal 2 is to run the mock data generated from json-generator.com

Visit `http://localhost:5173`

### Sign in credentials

The login form validates email format and a minimum 8-character password. Any valid email and password combination will authenticate in development.

```
Email:    any.valid@email.com
Password: anypassword (min 8 characters)
```

---

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_USERS_API_URL` | No | — | JSON Server endpoint for the users list. Falls back to in-memory catalog if unset |

**.env.example**
```bash
# Point to the local JSON Server instance
VITE_USERS_API_URL=http://localhost:5001/users

# Or point to a hosted json-generator.com endpoint
# VITE_USERS_API_URL=https://next.json-generator.com/api/json/get/YOUR_ID
```

> `.env` is git-ignored. Never commit real credentials.

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run server` | Start JSON Server at `http://localhost:5001` watching `db.json` |
| `npm run build` | Type-check with `tsc --noEmit` then produce a production bundle |
| `npm run preview` | Serve the production bundle locally |
| `npm test` | Run Vitest once — CI friendly |
| `npm run test:watch` | Vitest in interactive watch mode |

---

## Project structure

```
lendsqr-frontend-assessment/
├── db.json                          # JSON Server database — 500 user records
├── .env.example                     # Environment variable template
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.app.json
│
├── src/
│   ├── app/
│   │   └── router.tsx               # createBrowserRouter route tree
│   │
│   ├── features/                    # Domain-scoped feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.tsx    # RHF + Zod validated login form
│   │   │   └── pages/
│   │   │       └── LoginPage.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   └── SummaryCard.tsx  # Stat cards (Users, Active, etc.)
│   │   │   └── pages/
│   │   │       └── DashboardPage.tsx
│   │   │
│   │   └── users/
│   │       ├── api/
│   │       │   ├── use-users-list-query.ts    # TanStack Query — paginated list
│   │       │   └── use-user-detail-query.ts   # TanStack Query — single user
│   │       ├── components/
│   │       │   ├── constant/
│   │       │   │   ├── action-config.constant.ts   # Row action definitions
│   │       │   │   └── summary-status.constant.ts  # Dashboard stat config
│   │       │   ├── userDetails/
│   │       │   │   ├── ActionButton.tsx            # Blacklist / Activate buttons
│   │       │   │   ├── DetailsContentCard.tsx      # Tabbed detail sections
│   │       │   │   └── DetailsTopCard.tsx          # Profile header card
│   │       │   ├── users/
│   │       │   │   ├── FilterDropdown.tsx          # Anchored filter panel
│   │       │   │   ├── Pagination.tsx              # Page controls
│   │       │   │   ├── StatusBadge.tsx             # Active/Inactive/Pending/Blacklisted
│   │       │   │   ├── SummaryCard.tsx             # Stat cards
│   │       │   │   ├── Table.tsx                   # Users data table
│   │       │   │   └── TableActionItem.tsx         # Row action dropdown
│   │       │   └── users-filter-schema.ts          # Zod filter validation
│   │                           
│   │       └── pages/
│   │           ├── UsersPage.tsx
│   │           └── UserDetailsPage.tsx
│   │
│   ├── shared/                      # Feature-agnostic, no feature imports
│   │   ├── components/              # Reusable UI primitives
│   │   └── hooks/
│   │       ├── usePagination.ts     # buildPageItems + page state
│   │       └── useIsMobile.ts       # ResizeObserver breakpoint hook
│   │
│   ├── lib/                         # Infrastructure and utilities
│   │   ├── auth/
│   │   ├── format/
│   │   │   └── index.ts             # formatCurrency, formatDate
│   │   └── users/
│   │       ├── mock-user-data.ts    # Deterministic 500-record generator
│   │       ├── mulberry32.ts        # Seeded PRNG for stable mock data
│   │       ├── user-details-storage.ts  # localStorage read/write/merge
│   │       └── users-api.ts         # fetchUsersList, fetchUserById
│   ├── types/                       # UserListRecord, UserDetailRecord, etc.
│   │     └── user.ts   
│   └── util/
│       └── index.ts                 # Shared pure utilities
```

---

## Architecture decisions

### Feature-based modules

Code is grouped by domain (`features/auth`, `features/users`, `features/dashboard`) rather than by file type. This means everything related to Users — types, API hooks, components, pages — lives together and can be reasoned about in isolation.

**Dependency rule (strictly enforced):**

```
features/  →  shared/    ✓
features/  →  lib/       ✓
shared/    →  features/  ✗  (never)
lib/       →  features/  ✗  (never)
features/  →  features/  ✗  (no cross-feature imports)
```

### Why TanStack Query over plain `useEffect`

All remote data fetching goes through TanStack Query. This gives automatic caching (the 500-record response is fetched once and reused across page changes), background refetching, and consistent loading/error states without manual `useState` boilerplate.

### Why JSON Server

The assessment allows mocky.io or json-generator.com but mocky.io was down at assessment time. JSON Server (`db.json`) provides a persistent, restartable, locally-hosted REST endpoint that supports `_page` and `_per_page` query params and survives browser refreshes — making it a more reliable stand-in for a real backend than a third-party hosted snippet.

### Form validation

Login and filter forms both use React Hook Form with Zod schemas. Zod schemas are colocated with their feature (`users-filter-schema.ts`) rather than in a global types folder, since they encode UI-specific validation rules, not shared domain contracts.

---

## Mock data and API strategy

### Data generation

`src/lib/users/mock-user-data.ts` generates 500 deterministic `UserDetailRecord` objects using a seeded PRNG (`mulberry32`). The same seed always produces the same records — no random variation between reloads — which makes the test suite stable.

### JSON Server

The generated records are written to `db.json` at the project root. JSON Server exposes them at:

```
GET http://localhost:5001/users           # all records
GET http://localhost:5001/users?_page=1&_per_page=10   # paginated
GET http://localhost:5001/users/:id       # single record
```

### Fallback chain

```
VITE_USERS_API_URL set?
  ├── Yes → fetch from URL → parse response
  │           └── parse fails? → fall back to in-memory getUserCatalog()
  └── No  → sleep(450ms) to simulate latency → return getUserCatalog()
```

This means the app works offline and in CI without JSON Server running.

### localStorage persistence

When a user row is clicked, the full `UserDetailRecord` is written to `localStorage` under the key `lendsqr:user-details:{id}`. The User Details page uses this as TanStack Query's `initialData`, giving an instant render before the background fetch settles. The `mergeWithCachedDetail` utility in `user-details-storage.ts` merges any locally-overridden fields (e.g. blacklist status) with the fresh server response.

---

## Data flow

```
UsersPage mounts
  → useUsersListQuery({ page, pageSize, ...filters })
      → fetchUsersList() → GET /users from JSON Server
          → TanStack Query caches { items, total, page, pageSize }
  → UserTable renders current page items
  → Pagination renders from usePagination({ total })

User clicks a row
  → writeUserDetailToStorage(user)     saves to localStorage
  → navigate('/users/:id')

UserDetailsPage mounts
  → useUserDetailQuery(userId)
      → initialData: readCachedUserDetail(userId)  instant render
      → fetchUserById() runs in background          reconciles fresh data
  → DetailsTopCard + DetailsContentCard render
```

---

## Testing strategy

Tests live alongside their source files and are run with Vitest.

### What is covered

| Area | File | Cases |
|---|---|---|
| Filter logic | `users-api.test.ts` | No filter returns all 500; org filter; status filter; non-matching username returns 0 |
| Login validation | `login-schema.test.ts` | Valid credentials pass; short password fails; invalid email fails |
| Currency formatting | `format.test.ts` | Whole numbers, decimals, zero, large values |

### Running tests

```bash
# Single run (CI)
npm test

# Watch mode (development)
npm run test:watch
```

### What is not covered by unit tests

Pixel-fidelity, routing transitions, and localStorage interaction are verified manually against the Figma. End-to-end tests (Playwright/Cypress) are out of scope for this assessment but would be the next addition in a production codebase.

---

## Visual fidelity notes

The implementation follows the Figma for:

- **Login** — split layout, Pablo illustration SVG, form validation states
- **Dashboard** — four summary cards with correct icons and stat labels
- **Users table** — column order, density, alternating row backgrounds, status badge colours, filter icon per column header, anchored filter dropdown (not a modal)
- **Pagination** — ellipsis window algorithm, page size selector, "Showing X out of 500"
- **Row action menu** — View Details, Blacklist User, Activate User anchored to the three-dot button
- **User Details** — profile header card with tier stars, account balance, tab navigation (General Details, Documents, Bank Details, Loans, Savings, App and System), all six data sections, two guarantors

Assets such as the Pablo sign-in illustration are recreated as lightweight SVG rather than shipping raster images without a license.

---

## Known limitations

- **JSON Server must be running** for the remote API path. If it is not started, the app falls back to the in-memory catalog automatically — users will still load but the URL will not be hit.
- **Blacklist / Activate actions** update local state only. Without a writable backend, status changes do not persist across hard refreshes (the JSON Server beta does not support `PATCH` by default in this configuration).
- **Authentication** is UI-only. Any valid email + 8-character password succeeds. There is no JWT or session management.

---

## Commit history convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: scaffold project with React 19, TypeScript, Vite, Tailwind
feat: build login page with RHF + Zod validation
feat: add JSON Server with 500 deterministic user records
feat: build users table with pagination and filter dropdown
feat: implement user details page with localStorage hydration
feat: add row action menu (View Details, Blacklist, Activate)
test: unit tests for filter logic, login schema, currency format
docs: add comprehensive README
```

---

## License

This repository was created as part of a timed engineering assessment and is not intended for production use.