import {useUtil} from "../../context/util";

const Content = ({children}) => {

  const {stateSideBar} = useUtil();

  return (
    <div className={`content ${stateSideBar ? 'md:pl-20 lg:pl-24' : 'md:pl-[18rem] lg:pl-[18.5rem]'}`}>
      {children}
    </div>
  );
}

export default Content;