"use client";
import Context from './Context';

const Provider = ({ children }) => {
  // Provide a minimal context to avoid errors in consumers, but no custom cursor logic.
  const context = {};
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export default Provider;