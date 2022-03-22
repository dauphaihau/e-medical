import { createContext, useContext, useState, useEffect } from "react";
import Router from "next/router";
import Cookie from "cookie-cutter";

import { accountService } from '@services';

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
        const userRes = await accountService.me();
        console.log(userRes);
        if(userRes){
          setUser(userRes);
        }
        else{
          setUser({});
          Cookie.set("accessToken", "", {
            path: "/",
            expires: new Date(0),
          });
          Router.reload();
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
