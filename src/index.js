import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import {
  AllProductsPage,
  loader as allProductsPageLoader,
} from "./pages/AllProductsPage/AllProductsPage";
import {
  ProductDescPage,
  loader as productDescPageLoader,
} from "./pages/ProductDescPage/ProductDescPage";
import { CartPage, loader as cartPageLoader } from "./pages/CartPage/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <div>
        <h1>Error</h1>
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/products");
        },
      },
      {
        path: "products",
        element: <AllProductsPage />,
        loader: allProductsPageLoader,
      },
      {
        path: "products/:productId",
        element: <ProductDescPage />,
        loader: productDescPageLoader,
      },
      { path: "cart", element: <CartPage />, loader: cartPageLoader },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
