"use client"
import React, { createContext, useContext, useReducer } from "react";

// Define initial state and reducer
const initialState = {
  user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    // Add other cases as needed
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Add any additional functions or state modifications here

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for using the context
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
