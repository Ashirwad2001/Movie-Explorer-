import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie.id));
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.posterUrl}
        alt={movie.title}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {movie.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {releaseYear} • {movie.runtime ? `${movie.runtime} min` : 'Runtime N/A'}
        </Typography>
        
        {movie.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={movie.rating / 2}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.rating}/10
            </Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
          {movie.genres.slice(0, 2).map((genre) => (
            <Chip
              key={genre}
              label={genre}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
          {movie.genres.length > 2 && (
            <Chip
              label={`+${movie.genres.length - 2}`}
              size="small"
              variant="outlined"
              color="secondary"
            />
          )}
        </Box>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <IconButton
          onClick={handleFavoriteClick}
          color={isFavorite ? 'error' : 'default'}
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        
        <IconButton
          onClick={handleDetailsClick}
          color="primary"
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Info />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;