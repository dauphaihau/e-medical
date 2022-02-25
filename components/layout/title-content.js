import {useEffect} from 'react';

const TitleContent = ({children, title, stateSidebar}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={`content-title ${stateSidebar ? 'md:pl-20 lg:pl-24' : 'md:pl-[20rem] lg:pl-[21rem]'}`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default TitleContent;