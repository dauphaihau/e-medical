import {useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

import {MENU} from "../../constants";
import {useAuth} from "../../context/auth";

const handleActive = (pathName, item) => {
  if (pathName === item.link) return 'active';
  if (pathName === item.features?.id) return 'active';
  if (pathName === item.features?.add) return 'active';
  if (pathName === item.features?.declareMedical) return 'active';
  if (pathName === item.features?.vaccine) return 'active';
  return ''
}

const SubMenu = ({open, items, stateSidebar}) => {

  if (!items) return null;
  const router = useRouter();
  items.map((item) => {
    if ([item.link, item.link + "/them", item.link + "/[id]"].includes(router.pathname)) open = true;
  })

  return (
    <ul className={`${!open ? 'hidden' : ''} ${!stateSidebar && 'hidden'} sidebar-submenu`}>
      {items?.map((item, idz) => (
        <Link passHref href={item.link} key={idz}>
          <li key={item.title} className={handleActive(router.pathname, item)}>
            <a>
              <i className="icon-Commit pr-[20px] pl-[10px] relative top-[-2px]">
                <span className="path1"/>
                <span className="path2"/>
              </i>
              {item.title}
            </a>
          </li>
        </Link>
      ))}
    </ul>
  );
}

const ArrowDropdown = ({open, items}) => {
  const router = useRouter();
  items.map((item) => {
    if ([item.link, item.link + "/them", item.link + "/[id]"].includes(router.pathname)) open = true;
  })
  return (
    <div className='pt-[5px]'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={open ? 'hidden' : 'sidebar-dropdown'}
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={open ? 'sidebar-dropdown' : 'hidden'}
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  )
}

const Item = ({item, stateSidebar}) => {
  const [active, setActive] = useState(false)
  const router = useRouter();

  const handleActive = (item) => router.pathname == item.link ? 'active' : '';

  const renderSubMenu = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return (
        !stateSidebar
          ? <><SubMenu items={item.subNav} open={active} stateSidebar={!stateSidebar}/></>
          : <><SubMenu items={item.subNav} open={active} stateSidebar={stateSidebar}/></>
      )
    } else {
      return (
        // mobile
        stateSidebar && <>
          <SubMenu items={item.subNav} open={active} stateSidebar={stateSidebar}/>
        </>
      )
    }
  }

  return (
    <li className={`${handleActive(item)}`}>
      <Link href={item.link ? item.link : ''}>
        <div onClick={() => setActive(!active)}>
          <div className='flex items-center'>
            <i className={`text-gray-400 mr-[1.6rem] ${item.icon} ${handleActive(item)}`}>
              <span className="path1"/>
              <span className="path2"/>
            </i>
            <a className='w-[13rem] md:w-[12rem]' >
              <span className={`${handleActive(item)} `}>{item.title}</span>
            </a>
            {item.subNav && <ArrowDropdown open={active} items={item.subNav} stateSidebar={stateSidebar}/>}
          </div>
          {renderSubMenu()}
        </div>
      </Link>
    </li>
  )
};

const Sidebar = ({stateSidebar}) => {

  const {user} = useAuth();

  return (
    <aside className={`sidebar ${stateSidebar ? 'sidebar-open w-75 md:w-[3.76rem]' : 'sidebar-open'} `}>
      <ul className='sidebar-menu'>
        {user && MENU[user?.role].map((item, idz) => (
          <Item key={idz} item={item} stateSidebar={stateSidebar}/>
        ))}
      </ul>
      <div className={stateSidebar ? 'sidebar-copyright md:hidden' : 'sidebar-copyright hidden md:block'}>
        <div>
          <div><strong>Ứng dụng được phát triển bởi</strong></div>
          <div><a href="https://edoctor.io">eDoctor</a> © 2021</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;