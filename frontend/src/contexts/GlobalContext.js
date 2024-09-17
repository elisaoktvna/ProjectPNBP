import { createContext, useContext, useState } from "react";

// Membuat Context
const Context = createContext();

// Custom hook untuk menggunakan context
export const useGlobalContext = () => useContext(Context);

// Provider untuk membungkus komponen
export const GlobalContextProvider = ({ children }) => {
  const [reload, setReload] = useState(false);

  return (
    <Context.Provider value={{ reload, setReload }}>
      {children}
    </Context.Provider>
  );
};
