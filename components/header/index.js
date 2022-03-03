import {useEffect, useRef, useState} from "react";
import Image from 'next/image'
import Link from 'next/link'

import logo from "../../assets/images/logo.svg";
import onlyLogo from "../../assets/images/onlylogo.png";
import Button from "../button";

const navigation = [
  {name: 'Trang cá nhân', href: '/'},
  {name: 'Cài đặt', href: '/'},
  {name: 'Đăng xuất', href: '/'},
]

function useOuterClick(callback) {
  const innerRef = useRef();
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef;
}


const Header = ({stateSidebar, setStateSidebar}) => {
  const [dropdown, setDropdown] = useState(false)
  const innerRef = useOuterClick(() => {
    setDropdown(false)
  });

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
          <Button className='ml-4 rounded-[11px]'>Thêm mới</Button>
        </div>
        <div className='navbar-right'>
          <div className='navbar-right__info' ref={innerRef} onClick={() => setDropdown(!dropdown)}>
            <div>
              <p>Tran Vo Cong Hau</p>
              <p>CBQL</p>
            </div>
            <img src="https://i.pravatar.cc/300" alt='avatar'/>
          </div>
          {/*Dropdown profile*/}
          <div className={`navbar-right__profile ${dropdown ? 'block' : 'hidden'}`}>
            <div>
              <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                {navigation.map(item => (
                  <Link href={item.href} key={item.name}>
                    <a>{item.name}</a>
                  </Link>
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