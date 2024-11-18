import { Product } from "../models/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "stock", "category", "image"],
    });
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "image",
        "category",
      ],
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock, image, category } = req.body;
  try {
    if (!name || !price || !image || !category) {
      return res
        .status(400)
        .json({
          error:
            "Los campos nombre, precio, imagen y categoría son obligatorios",
        });
    }
    if (stock < 0) {
      return res.status(400).json({ error: "El stock no puede ser negativo" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res
      .status(500)
      .json({ error: "Error al crear el producto", details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, image, category } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (!name || !price || !image) {
      return res
        .status(400)
        .json({
          error:
            "El nombre, precio e imagen son requeridos para la actualización",
        });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: "El stock no puede ser negativo" });
    }

    await product.update({ name, description, price, stock, image, category });
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res
      .status(400)
      .json({
        error: "Error al actualizar el producto",
        details: error.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res
      .status(400)
      .json({ error: "Error al eliminar el producto", details: error.message });
  }
};
