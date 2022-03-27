import {createContext, useContext, useState, useEffect} from "react";
import Router from "next/router";
import Cookie from "cookie-cutter";

import {accountService} from '@services';
import {schoolService} from "../services";
import _ from "lodash";

const defaultValues = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (Cookie.get('accessToken')) {
      async function verifyAuth() {
        const userRes = await accountService.me();
        if (userRes) {
          if(!_.isEmpty(userRes.schoolWorking)){
            if(!_.isArray(userRes.schoolWorking)) userRes.schoolWorking = [userRes.schoolWorking]
          
            if (userRes.schoolWorking[0] && userRes.schoolWorking[0].schoolId) {
              const school = await schoolService.detail(userRes.schoolWorking[0].schoolId);
              userRes.schoolWorking[0].schoolName = school.status && school.data ? school.data.schoolname : '';
            }
          }
          else{
            userRes.schoolWorking = []
          }
          setUser(userRes);
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
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
