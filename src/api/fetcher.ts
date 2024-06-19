import { Product } from "../models/models";

export async function fetchAllProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const products = await response.json();
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return products.products;
}

export async function fetchProductById(id: number) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await response.json();
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return Product.fromJson(product);
}
