import * as categoryModel from "../models/categories.model.js";

export const fetchAllCategoriesService = () => categoryModel.getAllCategories();
export const fetchCategoryByIdService = (id) =>
  categoryModel.getCategoryById(id);
