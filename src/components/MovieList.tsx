import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MovieCard from './MovieCard';

const MovieList: React.FC = () => {
  const filteredMovies = useSelector((state: RootState) => state.movies.filteredMovies);

  if (filteredMovies.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No movies found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your search criteria or filters
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredMovies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;