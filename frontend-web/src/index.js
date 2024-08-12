import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/authContext";
import ProductContextProvider from "./context/productContext";
import CartContextProvider from "./context/cartContext";
import FavoriteContextProvider from "./context/favoriteContext";
import OrderContextProvider from "./context/orderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <FavoriteContextProvider>
              <OrderContextProvider>
                <App />
              </OrderContextProvider>
            </FavoriteContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
