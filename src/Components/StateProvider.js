import React, { createContext, useContext, useReducer } from "react";

/* implement React Redux to wrap all data in one state */
export const StateContext = createContext();
//the children is the app data here
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
