const Content = ({children, stateSidebar}) => {

  return (
    <div className={`content ${stateSidebar ? 'md:pl-20 lg:pl-24' : 'md:pl-[20rem] lg:pl-[21rem]'}`}>
      {children}
    </div>
  );
}

export default Content;