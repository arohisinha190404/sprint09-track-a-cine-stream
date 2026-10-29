import MovieGrid from "@/components/MovieGrid";
import { getPopularMovies } from "@/lib/tmdb";

export const revalidate = 3600;

export default async function HomePage() {
  // This is a Server Component: TMDB is fetched before the page reaches the browser.
  const result = await getPopularMovies();

  return (
    <div className="page-container">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <span className="eyebrow">Your next story starts here</span>
          <h1 id="hero-title">Movies worth staying in for.</h1>
          <p>
            Find your next favorite film, revisit the classics, and keep the
            stories you love close. Your personal cinema starts here.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#popular">
              Explore popular movies <span aria-hidden="true">→</span>
            </a>
            <a className="secondary-button" href="#popular">
              Browse collection
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit">
            <div className="hero-film">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="popular" aria-labelledby="popular-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Picked for your next movie night</span>
            <h2 id="popular-heading">Popular right now</h2>
            <p>Trending stories audiences are watching.</p>
          </div>
        </div>

        {result.error ? (
          <div className="notice" role="status">
            <strong>Movie data is not available yet.</strong>
            <p className="error-detail">
              {result.error} Add your TMDB read access token to <code>.env.local</code>,
              then restart the development server. The rest of the app can still
              be explored once the token is configured.
            </p>
          </div>
        ) : (
          <MovieGrid movies={result.movies} />
        )}
      </section>
    </div>
  );
}
