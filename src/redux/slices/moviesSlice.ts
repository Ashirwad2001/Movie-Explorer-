import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieState } from '../../types/movie';
import { mockMovies } from '../../data/mockMovies';

const initialState: MovieState = {
  movies: mockMovies,
  filteredMovies: mockMovies,
  searchQuery: '',
  selectedGenre: '',
  sortBy: 'title',
  sortOrder: 'asc',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      filterAndSortMovies(state);
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
      filterAndSortMovies(state);
    },
    setSortBy: (state, action: PayloadAction<'title' | 'releaseDate' | 'rating'>) => {
      state.sortBy = action.payload;
      filterAndSortMovies(state);
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
      filterAndSortMovies(state);
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedGenre = '';
      state.sortBy = 'title';
      state.sortOrder = 'asc';
      filterAndSortMovies(state);
    },
  },
});

const filterAndSortMovies = (state: MovieState) => {
  let filtered = state.movies;

  // Apply search filter
  if (state.searchQuery) {
    filtered = filtered.filter(movie =>
      movie.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  // Apply genre filter
  if (state.selectedGenre) {
    filtered = filtered.filter(movie =>
      movie.genres.includes(state.selectedGenre)
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let comparison = 0;
    
    switch (state.sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'releaseDate':
        comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        break;
      case 'rating':
        comparison = (a.rating || 0) - (b.rating || 0);
        break;
    }

    return state.sortOrder === 'asc' ? comparison : -comparison;
  });

  state.filteredMovies = filtered;
};

export const {
  setSearchQuery,
  setSelectedGenre,
  setSortBy,
  setSortOrder,
  resetFilters,
} = moviesSlice.actions;

export default moviesSlice.reducer;