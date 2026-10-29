"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { getPosterUrl } from "@/lib/tmdb";

function MovieCard({ movie }) {
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Year unknown";

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <Link className="card-link" href={`/movie/${movie.id}`} aria-label={`View ${movie.title} details`}>
          {posterUrl ? (
            <Image
              className="poster"
              src={posterUrl}
              alt={`Poster for ${movie.title}`}
              width={500}
              height={750}
              sizes="(max-width: 440px) 45vw, (max-width: 760px) 30vw, (max-width: 1050px) 22vw, 18vw"
            />
          ) : (
            <div className="poster-fallback" aria-label="Poster unavailable">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.5" />
                <path d="m4 17 5-5 3 3 3-4 5 6" />
              </svg>
            </div>
          )}
        </Link>
        <span className="rating-pill">
          <svg viewBox="0 0 24 24" stroke="none"><path d="m12 2 3 6.5 7 .9-5.1 4.8 1.3 6.9L12 17.7l-6.2 3.4 1.3-6.9L2 9.4l7-.9L12 2Z" /></svg>
          {Number(movie.vote_average || 0).toFixed(1)}
        </span>
        <FavoriteButton movie={movie} compact />
      </div>
      <Link className="card-link" href={`/movie/${movie.id}`}>
        <h3 className="movie-title">{movie.title}</h3>
      </Link>
      <div className="movie-meta">
        <span>{year}</span>
        <span>Movie</span>
      </div>
    </article>
  );
}

export default function MovieGrid({ movies }) {
  const [searchText, setSearchText] = useState("");

  const filteredMovies = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return movies;
    return movies.filter((movie) => movie.title?.toLowerCase().includes(query));
  }, [movies, searchText]);

  return (
    <>
      <div className="section-heading">
        <label className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search popular movies..."
            aria-label="Search popular movies"
          />
        </label>
      </div>

      {filteredMovies.length ? (
        <div className="movie-grid">
          {filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      ) : (
        <div className="empty-state" role="status">
          No movies match “{searchText}”. Try another title.
        </div>
      )}
    </>
  );
}
