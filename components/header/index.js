import logo from "../../assets/images/logo.svg";
import onlyLogo from "../../assets/images/onlylogo.png";

import Image from 'next/image'
import {useState} from "react";


const navigation = [
  {name: 'Trang cá nhân', href: '/', current: false},
  {name: 'Cài đặt', href: '/', current: false},
  {name: 'Đăng xuất', href: '/', current: false},
]

const Header = ({stateSidebar, setStateSidebar}) => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className="header">
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
            <div>
              <p>Tran Vo Cong Hau</p>
              <p>CBQL</p>
            </div>
            <img src="https://i.pravatar.cc/300" alt='avatar' onClick={() => setDropdown(!dropdown)}/>
          </div>
          {/*<div className={`navbar-right-profile ${dropdown ? 'block' : 'hidden'}`}>*/}
          {/*  <ul>*/}
          {/*    <li><a href="#home">Home</a></li>*/}
          {/*    <li><a href="#about">About</a></li>*/}
          {/*    <li><a href="#contact">Contact</a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          <div className="ml-3 relative z-[9999999]">
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
              <div
                className="py-1 rounded-md bg-white shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                {navigation.map((item, index) => (
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >{item.name}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;