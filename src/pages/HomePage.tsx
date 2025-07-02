import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieList from '../components/MovieList';

const HomePage: React.FC = () => {
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
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Discover Amazing Movies
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <SearchBar />
      </Box>
      
      <FilterBar />
      
      <MovieList />
    </Box>
  );
};

export default HomePage;