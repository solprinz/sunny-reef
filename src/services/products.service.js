import * as productModel from "../models/products.model.js";

export const fetchAllProductsService = (categoryId) =>
  productModel.getAllProducts(categoryId);
export const fetchProductByIdService = (id) => productModel.getProductById(id);
export const createProductService = (data) => productModel.createProduct(data);
export const updateProductService = (id, data) =>
  productModel.updateProduct(id, data);
export const deleteProductService = (id) => productModel.deleteProduct(id);
