import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return [...action.payload];
    case "NEW_CART_ITEM":
      return [...state, action.payload];
    case "REMOVE_CART":
      return [...state.filter((item) => item._id !== action.payload)];
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { data } = await axios.get("http://localhost:7000/api/cart/");
      dispatch({ type: "SET_CART", payload: data });
    };
    if (user) {
      fetchCartItems();
    }
  }, [user]);
  return (
    <CartContext.Provider value={{ cartItems: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
