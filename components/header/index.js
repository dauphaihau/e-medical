import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Image from 'next/image'
import Link from 'next/link'

import logo from "../../assets/images/logo.svg";
import onlyLogo from "../../assets/images/onlylogo.png";
import Button from "../button";
import {useAuth} from "../../context/auth";

const removeSession = (sKey, sPath, sDomain) => {
  document.cookie = encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
  window.location.reload();
}

const navigation = [
  {name: 'Trang cá nhân', href: '/'},
  {name: 'Cài đặt', href: '/'},
  {name: 'Đăng xuất', href: '/dang-nhap', logout: () => removeSession('accessToken')},
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

function renderButtonAddNew(pathname) {
  let addLink = '/to-chuc/truong/them';
  if (pathname.includes('to-chuc/truong')) {
    addLink = '/to-chuc/truong/them';
  }
  if (pathname.includes('to-chuc/nien-khoa')) {
    addLink = '/to-chuc/nien-khoa/them';
  }
  if (pathname.includes('to-chuc/khoi')) {
    addLink = '/to-chuc/khoi/them';
  }
  if (pathname.includes('to-chuc/lop')) {
    addLink = '/to-chuc/lop/them';
  }
  if (pathname.includes('hoc-sinh')) {
    addLink = '/hoc-sinh/them';
  }
  if (pathname.includes('phu-huynh')) {
    addLink = '/phu-huynh/them';
  }
  if (pathname.includes('giao-vien')) {
    addLink = '/nhan-su/giao-vien/them';
  }
  if (pathname.includes('nhan-vien')) {
    addLink = '/nhan-su/nhan-vien/them';
  }

  return (
    <Link href={addLink}>
      <a><Button className='ml-4 rounded-[11px] hidden lg:block'>Thêm mới</Button></a>
    </Link>
  );
};

const handleRole = (role) => {
  const labelRoles = {
    parent: 'Phụ huynh',
    teacher: 'Giáo viên',
    student: 'Học sinh',
    staff: 'Nhân viên',
    admin: 'Quản trị viên',
  };
  return labelRoles[role] ? labelRoles[role]: '';
};

const Header = ({stateSidebar, setStateSidebar}) => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false)
  const {user} = useAuth();
  const innerRef = useOuterClick(() => {
    setDropdown(false)
  });
  let addLink = '';
  if (router.pathname.includes('to-chuc/truong')) {
    addLink = '/to-chuc/truong/them';
  }

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
          {renderButtonAddNew(router.pathname)}
        </div>
        <div className='navbar-right'>
          <div className='navbar-right__info' ref={innerRef} onClick={() => setDropdown(!dropdown)}>
            <div>
              <p>{user?.fullName}</p>
              <p>{handleRole(user?.role)}</p>
            </div>
            <img src="https://i.pravatar.cc/300" alt='avatar'/>
          </div>
          {/*Dropdown profile*/}
          <div className={`navbar-right__profile ${dropdown ? 'block' : 'hidden'}`}>
            <div>
              <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                {navigation.map(item => {
                    if (item.logout) {
                      return <Link href={item.href} key={item.name}>
                        <a onClick={() => item.logout()}>{item.name}</a>
                      </Link>
                    }
                    return (
                      <Link href={item.href} key={item.name}>
                        <a>{item.name}</a>
                      </Link>
                    )
                  }
                )}
              </div>
            </div>
          </div>
          {/*end Dropdown profile*/}
        </div>
      </div>
    </div>
  );
}

export default Header;