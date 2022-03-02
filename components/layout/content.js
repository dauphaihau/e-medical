const Content = ({children, stateSidebar}) => {

  return (
    <div className={`content ${stateSidebar ? 'md:pl-20 lg:pl-24' : 'md:pl-[18rem] lg:pl-[18rem]'}`}>
      {children}
    </div>
  );
}

export default Content;