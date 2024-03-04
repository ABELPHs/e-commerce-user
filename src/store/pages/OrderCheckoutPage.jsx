import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Grid, TextField, Card, CardMedia, CardContent } from '@mui/material';
import { useAuth, useCart } from '../context';
import { API } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const OrderCheckoutPage = () => {
  const { cart, voidCart } = useCart();
  const { authData } = useAuth();
  const [products, useProducts] = useState([]);
  useEffect(()=> {
    loadFunction();
  }, []);
  const navigate = useNavigate();
  const loadFunction = async () => {
    let finalItems = [];
    let items = await Promise.all(cart.map((item)=>API.get.productInfo({
      productId: item.product_id
    })));
    for(let i=0; i<items.length; i++){
      let info = items[i]['product_info'];
      if(info['stock'] > 0){
        finalItems[i] = info;
        finalItems[i]['quantity'] = cart[i]['quantity'];
        if(info['stock'] < finalItems[i]['quantity']){
          finalItems[i]['quantity'] = info['stock'];
        }
      }
    }
    useProducts(finalItems);
  }
  const getTotalPrice = () => {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the order submission here
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const goToLogin = () => {
    navigate('/login');
  }

  const placeOrder = () => {

    API.post.order({
      items: products
    }).then(() => {
      voidCart();
      navigate('/login');
    });

  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, my: 2 }}>
        <Typography variant="h4" gutterBottom>Order Checkout</Typography>
        <Grid container spacing={2}>
          {products.map((item, index) => (
            <Grid item xs={12} key={index}>
            <Card sx={{ display: 'flex', padding:'10px' }}>
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
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Price: ${item.price}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Quantity: {item.quantity}
                </Typography>
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
            <form onSubmit={handleSubmit}>
              <TextField label="Address" fullWidth margin="normal" required />
              <div hidden={authData == null || products.length < 1}>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={placeOrder}>
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
}
