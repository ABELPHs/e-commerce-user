import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';
import { useAuth, useCart } from '../../store/context';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '60ch' },
  },
}));

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#092635', 
});

export const Navbar = ({ cartItems, onSearch }) => {
  const [timer, setTimer] = useState(null);
  const { cart } = useCart();
  const { authData, logout } = useAuth();
  let items = 0;
  cart.forEach((element) => {
    items = items + element.quantity;
  });
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      if (onSearch) {
        navigate('/');
        onSearch(event.target.value);
      }
    }, 500));
  };
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);
  const navigateToLogin = () => {
    navigate('/login');
  }
  const navigateToHome = () => {
    onSearch('');
    navigate('/');
  }
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} onClick={navigateToHome}>
          Ecommerce
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
          />
        </Search>
        <div hidden={authData != null}>
          <Button variant="outlined" color="inherit" sx={{ mr: 2 }} onClick={navigateToLogin}>
            Sign Up
          </Button>
        </div>
        <div hidden={authData == null}>
          <Button variant="outlined" color="inherit" sx={{ mr: 2 }} onClick={logout}>
            Sign Out
          </Button>
        </div>
        <Badge badgeContent={items} color="info">
          <img src="/src/assets/logo.png" alt="" width={25} onClick={()=>{
            navigate('/checkout');
          }} />
        </Badge>
      </Toolbar>
    </CustomAppBar>
  );
}

