import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Paper, Grid, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams } from 'react-router-dom';
import { useCart } from '../context';
import { API } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const ProductPage = () => {
    const { handleAddToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const { product_id } = useParams();
    const navigate = useNavigate();
    let [product, useProduct] = useState({
        url: '',
        name: '',
        price: 0,
        description: '',
        stock: 0
    });
    const incrementQuantity = () => {
        if(quantity < product.stock)
        setQuantity(prevQuantity => prevQuantity + 1);
      };
    
    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const onAddToCart = () => {
        handleAddToCart({
            product_id: product.id,
            quantity
        });
        setQuantity(1);
    };

    useEffect(() => {
        API.get.productInfo({
            productId: product_id
        }).then((response) => {
            useProduct(response['product_info']);
        });
    },[]);

    return (
        <Grid container spacing={2} padding={'40px'}>
            <Grid item xs={12} md={6}>
            <img src={product.url} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" justifyContent="space-between">
            <Box>
                <Typography variant="h4" gutterBottom>
                {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                Price: ${product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton onClick={decrementQuantity}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                <IconButton onClick={incrementQuantity}>
                  <AddIcon />
                </IconButton>
              </Box>
                <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                        onAddToCart(product);
                        navigate('/checkout')
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
            
            </Grid>
        </Grid>
    );
}