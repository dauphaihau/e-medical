import { createContext, useContext, useState } from "react";

const defaultValues = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
