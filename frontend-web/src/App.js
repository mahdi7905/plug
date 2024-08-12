import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./routes/home/Home";
import Auth from "./routes/auth/Auth";
import Favorites from "./routes/favorites/Favorites";
import Cart from "./routes/cart/Cart";
import Orders from "./routes/orders/Orders";
import RequireAuth from "./components/RequireAuth";
import Admin from "./routes/admin/Admin";
import { AuthContext } from "./context/authContext";
import CreateOrder from "./routes/createOrder/CreateOrder";
import Checkout from "./routes/checkout/Checkout";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <main className="App">
      <Navbar />
      <section className="contentArea">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
          <Route
            path="/create-order"
            element={
              <RequireAuth>
                <CreateOrder />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              user && user?.role === "admin" ? (
                <Admin />
              ) : user && user?.role === "consumer" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Routes>
      </section>
    </main>
  );
}

export default App;
