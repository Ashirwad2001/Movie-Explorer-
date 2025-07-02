import React from 'react';
import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { Favorite, Clear } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearFavorites } from '../redux/slices/favoritesSlice';
import MovieCard from '../components/MovieCard';

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const movies = useSelector((state: RootState) => state.movies.movies);
  
  const favoriteMovies = movies.filter(movie => favoriteIds.includes(movie.id));

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  if (favoriteMovies.length === 0) {
    return (
      <Box>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            background: 'linear-gradient(45deg, #e91e63, #f06292)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Favorite Movies
        </Typography>
        
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(240, 98, 146, 0.05))',
          }}
        >
          <Favorite sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No favorite movies yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring and add movies to your favorites list!
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #e91e63, #f06292)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Favorite Movies
        </Typography>
        
        <Button
          variant="outlined"
          color="error"
          startIcon={<Clear />}
          onClick={handleClearFavorites}
          sx={{ borderRadius: 2 }}
        >
          Clear All Favorites
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You have {favoriteMovies.length} favorite movie{favoriteMovies.length !== 1 ? 's' : ''}
      </Typography>

      <Grid container spacing={3}>
        {favoriteMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesPage;