import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const FavoriteContext = createContext();

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAV":
      return [...action.payload];
    case "NEW_FAV":
      return [...state, action.payload];
    case "REMOVE_FAV":
      return [...state.filter((item) => item._id !== action.payload)];
    default:
      return state;
  }
};

const FavoriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoritetItems = async () => {
      const { data } = await axios.get("http://localhost:7000/api/favorite/");
      dispatch({ type: "SET_FAV", payload: data });
    };
    if (user) {
      fetchFavoritetItems();
    }
  }, [user]);
  return (
    <FavoriteContext.Provider value={{ favoriteItems: state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
