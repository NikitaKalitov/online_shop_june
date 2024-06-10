export async function fetchAllProducts() {
  let response = await fetch("https://dummyjson.com/products");
  let products = await response.json();
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return products.products;
}
