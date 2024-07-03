import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import {
  AllProductsPage,
  loader as allProductsPageLoader,
} from "./pages/AllProductsPage/AllProductsPage";
import {
  ProductDescPage,
  loader as productDescPageLoader,
} from "./pages/ProductDescPage/ProductDescPage";
import { CartPage, loader as cartPageLoader } from "./pages/CartPage/CartPage";
import {
  LoginPage,
  loader as loginPageLoader,
} from "./pages/LoginPage/LoginPage";
import {
  AuthWarning,
  RequireAuth,
  loader as authLoader,
} from "./hoc/RequireAuth";
import { useAuthStore } from "./stores/authStore";
import { AccountPage } from "./pages/AccountPage/AccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        <h1>Error</h1>
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/login");
        },
      },
      {
        path: "products",
        element: <AllProductsPage />,
        loader: allProductsPageLoader,
      },
      {
        path: "products/auth_warning",
        element: <AuthWarning />,
        loader: authLoader,
      },
      {
        path: "products/:productId",
        element: <ProductDescPage />,
        loader: productDescPageLoader,
      },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
        loader: cartPageLoader,
      },
      {
        path: "cart/auth_warning",
        element: <AuthWarning />,
        loader: authLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: loginPageLoader,
      },
      {
        path: "account",
        element: (
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "logout",
    loader: async () => {
      await useAuthStore.getState().logout();
      return redirect("/login");
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
