# Cine-Stream — Sprint 09, Track A

A beginner-friendly migration of the Cine-Stream movie browsing experience to **Next.js 15 App Router**. Popular movies and movie detail data are fetched in Server Components. Small interactive features are isolated into Client Components.

## Sprint requirements covered

- [x] Next.js 15 project using the App Router (`app/` directory)
- [x] File-based home route at `/`
- [x] Dynamic movie route at `/movie/[id]`
- [x] Popular movies fetched on the server, not with `useEffect`
- [x] Client-side search input and favorite toggle
- [x] Server-side movie detail fetch
- [x] Dynamic `generateMetadata()` for movie titles, descriptions, and Open Graph data
- [x] TMDB image host allowlisted in `next.config.mjs`
- [x] `Prompts.md` starter log included
- [x] Responsive UI and accessible button labels

## Requirements

- Node.js 20.9 or newer (recommended for Next.js 15)
- npm
- A TMDB account and API Read Access Token

## 1. Install and run

```bash
npm install
```

Create `.env.local` in the project root. Copy the example file and add your TMDB token:

```bash
cp .env.example .env.local
```

On Windows PowerShell, you can instead run:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and replace the placeholder:

```dotenv
TMDB_API_READ_ACCESS_TOKEN=your_actual_tmdb_read_access_token
```

Do not commit `.env.local` or paste your token into GitHub, screenshots, or the demo video. `.gitignore` excludes it.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## 2. How to get the TMDB token

1. Sign in to The Movie Database (TMDB).
2. Open your account settings and find the API section.
3. Create/request API access if needed.
4. Copy the **API Read Access Token** (Bearer token), not a secret you plan to publish.
5. Put it in `.env.local`, then stop and restart `npm run dev`.

The token stays in server-side code (`lib/tmdb.js`); it is not intentionally exposed as a `NEXT_PUBLIC_` variable.

## 3. Folder structure

```text
sprint09-track-a-cine-stream/
├── app/
│   ├── movie/
│   │   └── [id]/
│   │       └── page.js       # Dynamic server-rendered movie detail + SEO
│   ├── globals.css           # Responsive site styling
│   ├── layout.js             # Shared root layout and base metadata
│   ├── not-found.js          # Friendly 404 page
│   └── page.js               # Home page; server fetch for popular movies
├── components/
│   ├── FavoriteButton.js     # Client Component: localStorage + click state
│   ├── MovieGrid.js          # Client Component: search state and movie cards
│   └── SiteHeader.js         # Client Component: mobile menu interaction
├── lib/
│   └── tmdb.js               # Server-side TMDB helpers
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── Prompts.md
└── README.md
```

## 4. Server vs Client Components

### Server Components

- `app/page.js`: is an async Server Component. It calls `getPopularMovies()` before the page is sent to the browser. The initial popular-movie fetch does not use `useEffect`.
- `app/movie/[id]/page.js`: fetches a specific movie on the server and exports `generateMetadata()` for dynamic SEO metadata.
- `lib/tmdb.js`: calls TMDB using a server environment variable and sets a one-hour revalidation window.

### Client Components

A file with `"use client"` at the top is part of the browser-interactive portion of the app.

- `components/MovieGrid.js`: owns the search input state and filters the already-fetched movie list.
- `components/FavoriteButton.js`: handles favorite clicks and browser `localStorage`. Its `useEffect` only reads browser storage after mounting; it is **not** used for the initial TMDB fetch.
- `components/SiteHeader.js`: handles the mobile navigation toggle.

Keep API tokens in server-only environment variables. Never rename the token to `NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN`.

## 5. Routes

| URL | Purpose |
| --- | --- |
| `/` | Popular movie listing |
| `/movie/603` | Example dynamic movie detail route (TMDB ID 603 is The Matrix) |
| Any unknown route | `app/not-found.js` |

Next.js App Router replaces `react-router-dom` here. Do not install or use `react-router-dom` for these routes.

## 6. Test checklist

After adding a valid token and starting the app:

1. Visit `/` and verify popular movie cards appear.
2. Open a movie card and verify the URL becomes `/movie/<id>`.
3. Refresh the detail route directly. It should still render.
4. Inspect the page source or browser DevTools Elements and verify the movie title/overview are present in the server-rendered HTML.
5. Inspect the detail page document head. Confirm the title and description vary by movie.
6. Search for a title using the search box; results should filter without a full page reload.
7. Toggle a heart button, refresh, and confirm the favorite state persists in the same browser.
8. Test mobile layout using DevTools responsive mode.
9. Run `npm run lint` and `npm run build`.

If movie data does not load, check `.env.local`, confirm the token is valid, and restart the server. The home page displays a friendly setup/API message when TMDB is unavailable.

## 7. Quality checks

```bash
npm run lint
npm run build
```

If lint reports configuration issues in your local environment, first check that `npm install` completed and your Node.js version meets the requirement. Resolve all warnings/errors before submission.

## 8. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. In Vercel Project Settings → Environment Variables, add `TMDB_API_READ_ACCESS_TOKEN`.
4. Deploy, then open the production URL and test both `/` and `/movie/<id>`.
5. Keep the token private; do not put it in source code.

## 9. Three-minute demo outline

- **0:00–0:30** — Introduce Cine-Stream and show the home page.
- **0:30–1:10** — Explain `app/page.js` and `lib/tmdb.js`: popular movies are fetched on the server.
- **1:10–1:45** — Open `/movie/<id>` and explain the dynamic route and `generateMetadata()`.
- **1:45–2:20** — Demonstrate search, favorite toggle, and mobile navigation. Explain why these components use `"use client"`.
- **2:20–2:45** — Show the folder structure and `next.config.mjs` image host allowlist.
- **2:45–3:00** — Show the deployed URL and summarize what you learned.

## Attribution

Movie data and artwork are supplied by TMDB. This is an educational, non-commercial demo. Add the attribution wording/logo required by TMDB's current developer terms before public release. This project is not endorsed or certified by TMDB.
