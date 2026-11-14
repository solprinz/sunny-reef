import {
  fetchAllProductsService,
  fetchProductByIdService,
  createProductService,
  deleteProductService,
  updateProductService,
} from "../services/products.service.js";

import { fetchCategoryByIdService } from "../services/categories.service.js";

const badRequest = (res, message) =>
  res.status(400).json({ status: "error", message });

const isNumber = (value) =>
  value !== "" && value !== null && !isNaN(Number(value));

export const getAllProducts = async (req, res) => {
  const products = await fetchAllProductsService(req.query.categoryId);
  res.status(200).json({ status: "success", data: products });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await fetchProductByIdService(id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró el producto con el ID ${id}`,
    });
  }

  res.status(200).json({ status: "success", data: product });
};

export const createProduct = async (req, res) => {
  const { name, price, categoryId, stock, image } = req.body || {};

  if (
    !name ||
    price === undefined ||
    categoryId === undefined ||
    stock === undefined
  ) {
    return badRequest(
      res,
      "Faltan datos obligatorios: name, price, categoryId y stock.",
    );
  }
  if (!isNumber(price) || !isNumber(stock)) {
    return badRequest(res, "price y stock deben ser números.");
  }
  if (!(await fetchCategoryByIdService(categoryId))) {
    return badRequest(res, "La categoría indicada no existe.");
  }

  const newProduct = await createProductService({
    name,
    price,
    categoryId,
    stock,
    image,
  });

  res.status(201).json({ status: "success", data: newProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteProductService(id);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró el producto con ID ${id}`,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Producto eliminado correctamente",
    data: deleted,
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // Solo se aceptan estos campos
  const allowed = ["name", "price", "categoryId", "stock", "image"];
  const data = {};
  for (const key of allowed) {
    if (req.body?.[key] !== undefined && req.body[key] !== "") {
      data[key] = req.body[key];
    }
  }

  if (Object.keys(data).length === 0) {
    return badRequest(res, "No se enviaron campos para actualizar.");
  }
  if (
    (data.price !== undefined && !isNumber(data.price)) ||
    (data.stock !== undefined && !isNumber(data.stock))
  ) {
    return badRequest(res, "price y stock deben ser números.");
  }
  if (
    data.categoryId !== undefined &&
    !(await fetchCategoryByIdService(data.categoryId))
  ) {
    return badRequest(res, "La categoría indicada no existe.");
  }

  const updated = await updateProductService(id, data);

  if (!updated) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró el producto con ID ${id}`,
    });
  }

  res.status(200).json({ status: "success", data: updated });
};
