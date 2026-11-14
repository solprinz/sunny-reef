import { db } from "../data/data.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80";

export const getAllProducts = async (categoryId) => {
  const snapshot = await getDocs(productsCollection);
  const products = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (categoryId) {
    return products.filter((p) => p.categoryId === Number(categoryId));
  }
  return products;
};

export const getProductById = async (id) => {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (!productDoc.exists()) return null;
  return { id: productDoc.id, ...productDoc.data() };
};

export const createProduct = async ({
  name,
  price,
  categoryId,
  stock,
  image,
}) => {
  const newProduct = {
    name,
    price: Number(price),
    categoryId: Number(categoryId),
    stock: Number(stock),
    image: image || DEFAULT_IMAGE,
  };
  const created = await addDoc(productsCollection, newProduct);
  return { id: created.id, ...newProduct };
};

export const updateProduct = async (id, data) => {
  const product = await getProductById(id);
  if (!product) return null;

  const fields = { ...data };
  for (const key of ["price", "categoryId", "stock"]) {
    if (fields[key] !== undefined) fields[key] = Number(fields[key]);
  }

  await updateDoc(doc(productsCollection, id), fields);
  return { ...product, ...fields };
};

export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) return null;

  await deleteDoc(doc(productsCollection, id));
  return product;
};
