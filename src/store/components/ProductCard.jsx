import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  maxWidth: 345,
});

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <StyledCard onClick={goToProductPage}>
      <CardMedia
        component="img"
        height="250"
        image={product.url||''}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

