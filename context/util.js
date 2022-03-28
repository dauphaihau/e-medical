import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";

const defaultValues = {
  stateSideBar: false,
};

const UtilContext = createContext(defaultValues);

export function useUtil() {
  return useContext(UtilContext);
}

export function UtilProvider({children}) {
  const [stateSideBar, setStateSideBar] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia('(max-width: 414px)').matches) {
      setStateSideBar(false)
    }
  },[router.pathname])

  return (
    <UtilContext.Provider value={{stateSideBar, setStateSideBar}}>
      {children}
    </UtilContext.Provider>
  );
}
