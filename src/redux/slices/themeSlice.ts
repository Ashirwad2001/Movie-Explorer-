import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '../../types/movie';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

const THEME_KEY = 'movieExplorer_theme';

const initialState: ThemeState = {
  mode: loadFromLocalStorage(THEME_KEY, 'light'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      saveToLocalStorage(THEME_KEY, state.mode);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      saveToLocalStorage(THEME_KEY, state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;