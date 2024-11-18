import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Pagination,
} from "@mui/material";
import ProductFilters from "../components/product/ProductFilters";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    const [minPrice, maxPrice] = priceRange;
    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, searchQuery, sortOrder, products]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setSearchQuery("");
    setSortOrder("");
    setCurrentPage(1);
    setFilteredProducts(products);
  };
  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {selectedCategory
          ? `Productos en la categoría: ${selectedCategory}`
          : "Todos los Productos"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProductFilters
            categories={categories}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            onSortChange={setSortOrder}
            sortOrder={sortOrder}
            onResetFilters={resetFilters}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <React.Fragment key={product.id}>
                <Card sx={{ display: "flex", marginBottom: 2 }}>
                  <CardMedia
                    component="img"
                    image={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    sx={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography
                      variant="h3"
                      color="success"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(product.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No se encontraron productos para los filtros seleccionados.
            </Typography>
          )}
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
