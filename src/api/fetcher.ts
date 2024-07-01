import { Product, UserClass } from "../models/models";

export class API {
  static fetchAllProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const products = await response.json();
    return products.products;
  };

  static fetchProductById = async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();
    return Product.fromJson(product);
  };

  static authLogin = async (username: string, password: string) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const json = await response.json();
    const user = UserClass.fromJson(json);
    const token: string = json.token;
    const refreshToken: string = json.refreshToken;
    console.log(json);
    return { user, token, refreshToken };
  };
}
