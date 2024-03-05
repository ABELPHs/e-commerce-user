import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Grid, TextField, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { useAuth, useCart } from '../context';
import { API } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export const OrderCheckoutPage = () => {
  const { cart, voidCart, setCart } = useCart();
  const { authData } = useAuth();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadFunction();
  }, []);

  const loadFunction = async () => {
    let finalItems = [];
    let items = await Promise.all(cart.map((item) => API.get.productInfo({
      productId: item.product_id
    })));
    for (let i = 0; i < items.length; i++) {
      let info = items[i]['product_info'];
      if (info['stock'] > 0) {
        finalItems[i] = info;
        finalItems[i]['quantity'] = cart[i]['quantity'];
        finalItems[i]['product_id'] = cart[i]['product_id'];
        finalItems[i]['product_info'] = cart[i]['product_info'];
        if (info['stock'] < finalItems[i]['quantity']) {
          finalItems[i]['quantity'] = info['stock'];
        }
      }
    }
    setCart(finalItems);
    setProducts(finalItems)
  };

  const getTotalPrice = () => {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const placeOrder = () => {
    API.post.order({
      items: [...products],
      address
    }).then((response) => {
      navigate('/');
      voidCart();
    });
  };

  const increaseQuantity = (index) => {
    let newProducts = [...products];
    if(newProducts[index].quantity < newProducts[index].stock) {
      newProducts[index].quantity += 1;
      setProducts(newProducts);
      setCart(newProducts);
    }
  };

  const decreaseQuantity = (index) => {
    let newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      setProducts(newProducts);
      setCart(newProducts);
    }
  };

  const handleRemoveItem = (index) => {
    let newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setCart(newProducts);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <Typography variant="h4" gutterBottom>Order Checkout</Typography>
        <Grid container spacing={2}>
          {products.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ display: 'flex', padding: '10px' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.url}
                  alt={item.name}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => decreaseQuantity(index)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => increaseQuantity(index)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Subtotal: ${calculateSubtotal(item.price, item.quantity)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <form>
              <TextField label="Address" fullWidth margin="normal" required value={address}
            onChange={(e) => setAddress(e.target.value)}/>
              <div hidden={authData == null || products.length < 1}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={placeOrder}>
                  Place Order
                </Button>
              </div>
              <div hidden={authData != null}>
                <Button onClick={goToLogin} variant="contained" color="primary" sx={{ mt: 2 }}>
                  Sign up
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
