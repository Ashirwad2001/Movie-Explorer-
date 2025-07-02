import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from '@mui/material';
import { Home, Favorite, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/slices/themeSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const favoriteCount = useSelector((state: RootState) => state.favorites.favoriteIds.length);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🎬 Movie Explorer
          </Typography>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              mx: 1,
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <Home />
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/favorites')}
            sx={{ 
              mx: 1,
              position: 'relative',
              backgroundColor: location.pathname === '/favorites' ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <Favorite />
            {favoriteCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                {favoriteCount}
              </Box>
            )}
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={handleThemeToggle}
            sx={{ 
              mx: 1,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;