import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./services/CartContext";
import { UserProvider } from "./services/UserContext";
import { ProductsProvider } from "./services/ProductContext";
import { CategoriesProvider } from "./services/CategoriesContext";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <CategoriesProvider>
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </Router>
  </React.StrictMode>
);
