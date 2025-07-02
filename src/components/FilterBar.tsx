import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Typography,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setSelectedGenre,
  setSortBy,
  setSortOrder,
  resetFilters,
} from '../redux/slices/moviesSlice';
import { getAllGenres } from '../data/mockMovies';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const {
    selectedGenre,
    sortBy,
    sortOrder,
    searchQuery,
    filteredMovies,
    movies,
  } = useSelector((state: RootState) => state.movies);

  const genres = getAllGenres();
  const hasActiveFilters = searchQuery || selectedGenre;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            label="Genre"
            onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => dispatch(setSortOrder(e.target.value as any))}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<Clear />}
            onClick={() => dispatch(resetFilters())}
            sx={{ borderRadius: 2 }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredMovies.length} of {movies.length} movies
        </Typography>
        
        {searchQuery && (
          <Chip
            label={`Search: "${searchQuery}"`}
            size="small"
            onDelete={() => dispatch(setSearchQuery(''))}
            color="primary"
            variant="outlined"
          />
        )}
        
        {selectedGenre && (
          <Chip
            label={`Genre: ${selectedGenre}`}
            size="small"
            onDelete={() => dispatch(setSelectedGenre(''))}
            color="secondary"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
};

export default FilterBar;