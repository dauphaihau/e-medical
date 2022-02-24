import logo from "../../assets/images/logo.svg";
import onlyLogo from "../../assets/images/onlylogo.png";

import Image from 'next/image'

const Header = ({stateSidebar, setStateSidebar}) => {
  return (
    <div className="main-header fixed flex">
      {stateSidebar ? (
          <div className='logo-mini'>
            <Image src={onlyLogo} alt="logomini"/>
          </div>
        )
        : (<div className={stateSidebar ? ' md:logo-box w-[4.34rem]' : 'hidden md:block logo-box'}>
            <a className='logo'>
              <Image src={logo} alt="logo3"/>
            </a>
          </div>
        )
      }
      <div className={stateSidebar ? 'ml-0  navbar' : 'ml-0 navbar'}>
        <div className='navbar-left'>
          <button
            className='btn-hamburger'
            onClick={() => setStateSidebar(!stateSidebar)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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