import {createContext, useContext, useState, useEffect} from "react";
import Router from "next/router";
import Cookie from "cookie-cutter";

import {accountService} from '@services';
import {schoolService} from "../services";

const defaultValues = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [school, setSchool] = useState()
  const schoolId = user.schoolWorking?.schoolId

  useEffect(() => {
    if (Cookie.get('accessToken')) {
      async function verifyAuth() {
        const userRes = await accountService.me();
        if (userRes) {
          console.log('user-res', userRes)
          setUser(userRes);
          if (userRes.role !== 'admin') {
            const res = await schoolService.detail(userRes.schoolWorking.schoolId);
            setSchool(res)
          }
        } else {
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
    <AuthContext.Provider value={{user, setUser, school, schoolId}}>
      {children}
    </AuthContext.Provider>
  );
}
