import {
  fetchAllCategoriesService,
  fetchCategoryByIdService,
} from "../services/categories.service.js";

export const getAllCategories = async (req, res) => {
  const categories = await fetchAllCategoriesService();
  res.status(200).json({ status: "success", data: categories });
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await fetchCategoryByIdService(id);

  if (!category) {
    return res.status(404).json({
      status: "error",
      message: `No se encontró la categoría con el ID ${id}`,
    });
  }

  res.status(200).json({ status: "success", data: category });
};
