"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cine-stream-favorites";

function readFavorites() {
  // Access browser storage only after the component mounts.
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function FavoriteButton({ movie, compact = false }) {
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setReady(true);
  }, []);

  const isFavorite = favorites.some((item) => item.id === movie.id);

  function toggleFavorite() {
    const nextFavorites = isFavorite
      ? favorites.filter((item) => item.id !== movie.id)
      : [
          ...favorites,
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
        ];

    setFavorites(nextFavorites);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites));
    } catch {
      // The button still works for this session if storage is unavailable.
    }
  }

  return (
    <button
      className={`${compact ? "favorite-button" : "secondary-button"} ${isFavorite ? "is-favorite" : ""}`}
      type="button"
      onClick={toggleFavorite}
      aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
      aria-pressed={isFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      data-ready={ready}
    >
      <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      </svg>
      {compact ? null : isFavorite ? "Saved to favorites" : "Add to favorites"}
    </button>
  );
}
