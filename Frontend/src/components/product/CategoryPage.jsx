import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <div>
      <h1>Productos en Categoría: {category}</h1>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <img src={product.image} alt={product.name} width="150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
