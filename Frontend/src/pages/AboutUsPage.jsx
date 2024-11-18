import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sobre Nosotros
      </Typography>
      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Bienvenido a Mi Ecommerce, tu tienda en línea de confianza. Nuestro
            objetivo es ofrecerte productos de calidad a precios competitivos,
            con una experiencia de compra simple y rápida.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nos esforzamos por mantener un catálogo actualizado y un servicio al
            cliente de excelencia. Gracias por elegirnos como tu tienda de
            preferencia.
          </Typography>
          <Typography variant="body1">
            ¡Esperamos que encuentres todo lo que buscas en nuestra tienda!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutUsPage;
