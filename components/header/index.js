import {useMainContext} from "../../context/main-context";
import logo from "../../assets/images/logo.svg";
import onlyLogo from "../../assets/images/onlylogo.png";

import Image from 'next/image'

const Header = () => {
  const {isSidebarOpen, openSidebar} = useMainContext();
  return (
    <div className="main-header fixed flex">
      {isSidebarOpen ? (
          <div className='logo-mini'>
            <Image src={onlyLogo} alt="logomini"/>
          </div>
        )
        : (<div className={isSidebarOpen ? ' md:logo-box w-[4.34rem]' : 'hidden md:block logo-box'}>
            <a className='logo'>
              <Image src={logo} alt="logo3"/>
            </a>
          </div>
        )
      }
      <div className={isSidebarOpen ? 'ml-0  navbar' : 'ml-0 navbar'}>
        <div className='navbar-left'>
          <a
            href='#'
            className='btn-hamburger'
            onClick={() => openSidebar(!isSidebarOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <form className='navbar-search-form'>
            <div>
              <input type="text" placeholder="Search anything..."/>
              <div>
                <i className="icon-Search">
                  <span className="path1"/>
                  <span className="path2"/>
                </i>
              </div>
            </div>
          </form>
        </div>
        <div className='navbar-right'>
          <div>
            <p>Tran Vo Cong Hau</p>
            <p>CBQL</p>
          </div>
          <img src="https://i.pravatar.cc/300"/>
        </div>
      </div>
    </div>
  );
}

export default Header;