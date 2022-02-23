import React, {createContext, useContext, useReducer} from "react";

const reducer = (state, action) => {
  if (action.type === 'SET_SIDEBAR') {
    return {...state, isSidebarOpen: action.payload}
  }
};

const initialState = {
  isSidebarOpen: false,
};

const MainContext = createContext();

export const MainProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = (payload) => {
    dispatch({type: "SET_SIDEBAR", payload})
  };

  return (
    <MainContext.Provider value={{...state, openSidebar}}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => {
  return useContext(MainContext)
}