import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return [...action.payload];
    case "NEW_ORDER_ITEM":
      return [...state, action.payload];
    case "ORDER_CHECKOUT":
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    default:
      return state;
  }
};

const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const { data } = await axios.get("http://localhost:7000/api/orders/");
      dispatch({ type: "SET_ORDER", payload: data });
    };
    if (user) {
      fetchOrderItems();
    }
  }, [user]);
  return (
    <OrderContext.Provider value={{ orders: state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
