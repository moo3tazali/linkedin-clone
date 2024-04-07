import { createContext, useContext, useState } from "react";

const RenderContext = createContext({});

export const RenderProvider = ({ children }) => {
  const [render, setRender] = useState(false);

  function callRender() {
    setRender((state) => !state);
  }

  return (
    <RenderContext.Provider value={{ callRender, render }}>
      {children}
    </RenderContext.Provider>
  );
};

export const useRender = () => {
  return useContext(RenderContext);
};
