import React, {useState} from 'react';
import {MENU} from "../../constants";
import Link from "next/link";
import {useRouter} from "next/router";

const SubNav = ({open, items}) => {
  const router = useRouter();
  return (
    <ul className={`${!open && 'hidden'} sidebar-subnav`}>
      {items?.map((item, index) => (
        <li key={index} className={router.pathname == item.link ? 'active' : ''}>
          <Link passHref href={item.link}>
            <a href={item.link}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                  clipRule="evenodd"
                />
              </svg>
              {item.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const ArrowDropdown = ({open, stateSidebar}) => {
    return (
      <div className={`${stateSidebar && 'hidden'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={open ? 'hidden' : 'sidebar-dropdown right-2'}
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={open ? 'sidebar-dropdown right-2' : 'hidden'}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    )
  }
;

const Item = ({item, stateSidebar}) => {
  const [active, setActive] = useState(false)
  return (
    <li>
      <a onClick={() => setActive(!active)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-4" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
        </svg>
        <span className={stateSidebar ? 'hidden' : ''}>{item.title}</span>
        {item.subNav && <ArrowDropdown stateSidebar={stateSidebar} open={active}/>}
        {stateSidebar ? '' : <SubNav items={item.subNav} open={active}/>}
      </a>
    </li>
  )
};

const Sidebar = ({stateSidebar}) => {
  return (
    <aside className={`main-sidebar ${stateSidebar ? 'main-sidebar-open w-0 md:w-16' : 'main-sidebar-open'}`}>
      <div>
        <ul className='sidebar-menu tree' data-widget='tree'>
          {MENU.staff_agent.map((item, index) => (
            <Item key={index} item={item} stateSidebar={stateSidebar}/>
          ))}
        </ul>
        <div className={stateSidebar ? 'hidden' : 'sidebar-copyright'}>
          <div>
            <div><strong>Ứng dụng được phát triển bởi</strong></div>
            <div><a href="https://edoctor.io">eDoctor</a> © 2021</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;