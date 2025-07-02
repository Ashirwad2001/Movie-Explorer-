import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Rating,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import { Favorite, FavoriteBorder, ArrowBack, CalendarToday, Schedule } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const movie = useSelector((state: RootState) => 
    state.movies.movies.find(m => m.id === id)
  );
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isFavorite = movie ? favoriteIds.includes(movie.id) : false;

  if (!movie) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Movie not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    );
  }

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(movie.id));
  };

  const releaseYear = new Date(movie.releaseDate).getFullYear();
  const releaseDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={movie.posterUrl}
              alt={movie.title}
              sx={{
                width: '100%',
                height: { xs: 400, md: 600 },
                objectFit: 'cover',
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {movie.title}
                </Typography>
                <IconButton
                  onClick={handleFavoriteClick}
                  color={isFavorite ? 'error' : 'default'}
                  size="large"
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {isFavorite ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="body1">
                    {releaseDate} ({releaseYear})
                  </Typography>
                </Box>
                
                {movie.runtime && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule fontSize="small" />
                    <Typography variant="body1">
                      {movie.runtime} minutes
                    </Typography>
                  </Box>
                )}
              </Box>

              {movie.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Rating
                    value={movie.rating / 2}
                    precision={0.1}
                    size="large"
                    readOnly
                  />
                  <Typography variant="h6" color="primary">
                    {movie.rating}/10
                  </Typography>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Genres
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      color="primary"
                      variant="filled"
                      sx={{ fontWeight: 'medium' }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Overview
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                  }}
                >
                  {movie.overview}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MovieDetailsPage;