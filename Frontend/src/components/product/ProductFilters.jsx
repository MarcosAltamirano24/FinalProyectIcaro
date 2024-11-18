import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
} from "@mui/material";

const ProductFilters = ({
  categories,
  onCategoryChange,
  onPriceChange,
  selectedCategory,
  priceRange,
  onSearchChange,
  searchQuery,
  onSortChange,
  sortOrder,
  onResetFilters,
}) => {
  return (
    <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Filtrar Productos
      </Typography>

      {/* Filtrar por categoría */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="category-label">Categoría</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          label="Categoría"
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1">Rango de Precios</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => onPriceChange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Typography variant="body2">
          ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>

      <TextField
        label="Buscar Producto"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="sort-label">Ordenar Por</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          label="Ordenar Por"
        >
          <MenuItem value="">Sin Orden</MenuItem>
          <MenuItem value="asc">Precio: Menor a Mayor</MenuItem>
          <MenuItem value="desc">Precio: Mayor a Menor</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={onResetFilters}
        sx={{ marginTop: 2 }}
      >
        Resetear Filtros
      </Button>
    </Box>
  );
};

export default ProductFilters;
