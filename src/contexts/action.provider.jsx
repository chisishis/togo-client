import React, { createContext, useState, useContext } from "react";

const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const post = useActionProvider();
  return (
    <ActionContext.Provider value={post}>{children}</ActionContext.Provider>
  );
};

export const useAction = () => {
  return useContext(ActionContext);
};

const useActionProvider = () => {
  const [action, setAction] = useState(null);

  return {
    action, 
    setAction
  };
};
