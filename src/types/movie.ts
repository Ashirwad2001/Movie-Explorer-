export interface Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: string;
  genres: string[];
  posterUrl: string;
  runtime?: number;
  rating?: number;
}

export interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  searchQuery: string;
  selectedGenre: string;
  sortBy: 'title' | 'releaseDate' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface FavoritesState {
  favoriteIds: string[];
}

export interface ThemeState {
  mode: 'light' | 'dark';
}