import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consulta enviada:", formData);
    alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Contáctanos
      </Typography>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Envíanos un mensaje
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Mensaje"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: "center", paddingX: 4 }}
          >
            Enviar
          </Button>
        </Box>
      </Paper>
      <Grid container spacing={3} sx={{ maxWidth: 600, width: "100%" }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Teléfono:
            </Typography>
            <Typography variant="body1">+123 456 7890</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Correo Electrónico:
            </Typography>
            <Typography variant="body1">contacto@miecommerce.com</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
