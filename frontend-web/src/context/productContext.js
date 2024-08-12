import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return [...action.payload];
    case "NEW_PRODUCT":
      return [...state, action.payload];
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:7000/api/products/");
      dispatch({ type: "SET_PRODUCT", payload: data });
    };
    if (user) {
      fetchProducts();
    }
  }, [user]);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
