import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const NextArrow = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      zIndex: 1,
      color: 'black',
      backgroundColor: '#ffffff',
      minWidth: '40px',
      height: '40px',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }}
  >
    <ArrowForwardIosIcon />
  </Button>
);

const PrevArrow = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      zIndex: 1,
      color: 'black',
      backgroundColor: '#ffffff',
      minWidth: '40px',
      height: '40px',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }}
  >
    <ArrowBackIosIcon />
  </Button>
);

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Productos Destacados
      </Typography>
      {error ? (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <Box key={product.id} sx={{ padding: 1 }}>
              <Card sx={{ maxWidth: 250, margin: 'auto', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  image={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name || 'Producto'}
                  sx={{ height: 200, objectFit: 'contain', padding: 2 }}
                />
                <CardContent>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {product.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    component={Link}
                    to={`/products/${product.id}`}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default FeaturedProductsSection;
