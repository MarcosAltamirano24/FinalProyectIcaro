import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 3,
        marginTop: 8,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Mi Ecommerce. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
