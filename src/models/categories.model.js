import { readFile } from "fs/promises";

const dataURL = new URL("../data/categories.json", import.meta.url);

const readCategories = async () => {
  const categoriesJSON = await readFile(dataURL, "utf-8");
  const data = JSON.parse(categoriesJSON);
  return data;
};

export const getAllCategories = async () => {
  const { categories } = await readCategories();
  return categories;
};

export const getCategoryById = async (id) => {
  const { categories } = await readCategories();
  return categories.find((c) => c.id === parseInt(id)) || null;
};
