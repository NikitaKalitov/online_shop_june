export async function fetchAllProducts() {
  let response = await fetch('https://dummyjson.com/products');
  let products = await response.json();
  return products.products;
}