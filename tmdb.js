const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function getToken() {
  return process.env.TMDB_API_READ_ACCESS_TOKEN;
}

async function tmdbFetch(path) {
  const token = getToken();

  if (!token || token === "replace_with_your_tmdb_read_access_token") {
    return {
      data: null,
      error: "TMDB API token is missing.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Avoid showing private token or raw provider details to site visitors.
      console.error(`TMDB request failed with status ${response.status}.`);
      return {
        data: null,
        error: `TMDB returned status ${response.status}. Check the token and try again.`,
      };
    }

    return { data: await response.json(), error: null };
  } catch (error) {
    console.error("TMDB request could not be completed:", error);
    return {
      data: null,
      error: "Could not connect to TMDB. Check your internet connection and try again.",
    };
  }
}

export async function getPopularMovies() {
  const result = await tmdbFetch("/movie/popular?language=en-US&page=1");

  return {
    movies: result.data?.results ?? [],
    error: result.error,
  };
}

export async function getMovieById(id) {
  // IDs from the URL are validated before making an upstream request.
  if (!/^\d+$/.test(String(id))) {
    return { movie: null, error: "Invalid movie ID." };
  }

  const result = await tmdbFetch(`/movie/${id}?language=en-US`);

  return {
    movie: result.data,
    error: result.error,
  };
}

export function getPosterUrl(path, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
