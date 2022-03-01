import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "cookie-cutter";
import accountService from "../services/account";

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

  useEffect(() => {
    if(Cookie.get('accessToken')){
      async function verifyAuth() {
        try{
          const { request, ...response } = await accountService.me();
          if(response.data){
            setUser(response.data);
          }
          else{
            setUser({});
          }
        }
        catch(e){
          setUser({});
        }
      }
      verifyAuth();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
