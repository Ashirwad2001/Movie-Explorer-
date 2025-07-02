import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types/movie';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const FAVORITES_KEY = 'movieExplorer_favorites';

const initialState: FavoritesState = {
  favoriteIds: loadFromLocalStorage(FAVORITES_KEY, []),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      const index = state.favoriteIds.indexOf(movieId);
      
      if (index > -1) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(movieId);
      }
      
      saveToLocalStorage(FAVORITES_KEY, state.favoriteIds);
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      saveToLocalStorage(FAVORITES_KEY, []);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;