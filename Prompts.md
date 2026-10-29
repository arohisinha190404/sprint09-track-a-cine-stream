# Sprint 09 — AI Prompt Log

Keep this file as a truthful record of the AI-assisted debugging and learning work used during the sprint. Update it with the prompts you actually use and the changes you make. Do not claim a test passed unless you ran it.

## Initial project planning

**Prompt:** Explain how to migrate a React movie SPA to Next.js 15 App Router while meeting Sprint 09 Track A requirements. Separate server data fetching from browser-only interactivity and explain dynamic SEO metadata.

**Use in this project:** Created the folder plan and identified the server/client component boundary.

## TMDB integration

**Prompt:** Show a beginner-friendly server-side helper for the TMDB API that reads a Bearer token from an environment variable, handles missing tokens and non-2xx responses, and revalidates movie data.

**Use in this project:** `lib/tmdb.js` keeps the API token on the server and returns a predictable result shape.

## Dynamic route and SEO

**Prompt:** Explain a Next.js 15 App Router dynamic route at `app/movie/[id]/page.js` and how to use `generateMetadata()` with asynchronously resolved route params.

**Use in this project:** The detail route fetches movie data on the server and creates a movie-specific title and description.

## Client interactivity

**Prompt:** Help isolate a search input, a responsive navigation menu, and a favorite button into Client Components without moving the initial TMDB fetch into `useEffect`.

**Use in this project:** Search and menu state live in their respective client components. Favorites use browser storage after mount.

## Before submission — fill in your real work

Add dated entries below for any actual debugging or follow-up prompts you use.

- Date:
- Prompt used:
- What I changed:
- How I verified the change:

## Verification record

Fill this in after running the commands locally.

- `npm install`:
- `npm run lint`:
- `npm run build`:
- Local browser test:
- Vercel deployment URL:
