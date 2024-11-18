import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Celulares", description: "Encuentra los últimos dispositivos" },
    { name: "Accesorios", description: "Cargadores, auriculares y más" },
    { name: "Fundas", description: "Imprescindibles para tu celu" },
  ];

  return (
    <Grid container spacing={3} style={{ marginTop: "20px" }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={4} key={category.name}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => navigate(`/category/${category.name}`)}
          >
            <Typography variant="h6">{category.name}</Typography>
            <Typography variant="body2">{category.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySection;
