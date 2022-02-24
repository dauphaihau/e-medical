import React, {useEffect} from 'react';
import {useMainContext} from "../context/main-context";

const TitleContent = ({children, title}) => {
  const {isSidebarOpen} = useMainContext();

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])

  return (
    <div className={`content-title ${isSidebarOpen ? 'md:pl-20 lg:pl-24' : 'md:pl-[20rem] lg:pl-[21rem]'}`}>
      <h2 className='text-5xl'>{title}</h2>
      {children}
    </div>
  );
}

export default TitleContent;