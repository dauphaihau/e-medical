import {useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

import {MENU} from "@constants";

const SubMenu = ({open, items}) => {
  const router = useRouter();
  return (
    <ul className={`${!open ? 'hidden' : ''} sidebar-submenu`}>
      {items?.map((item) => (
        <li key={item.title} className={router.pathname == item.link ? 'submenu-active' : ''}>
          <Link passHref href={item.link}>
            <a>
              <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>
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
    <div className={`${stateSidebar && 'md:hidden'}`}>
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

const Item = ({item, stateSidebar}) => {
  const [active, setActive] = useState(false)
  const router = useRouter();
  return (
    <li className={router.pathname == item.link ? 'submenu-active' : ''}>
      <Link href={item.link ? item.link : '#'}>
        <div onClick={() => setActive(!active)}>
          <i className={"text-gray-400 " + item.icon}><span className="path1"></span><span className="path2"></span></i>
          <a>
            <span className={stateSidebar ? 'md:hidden' : ''}>{item.title}</span>
          </a>
          {item.subNav && <ArrowDropdown stateSidebar={stateSidebar} open={active}/>}
          {stateSidebar ? <SubMenu items={item.subNav} open={active}/> : <SubMenu items={item.subNav} open={active}/>}
        </div>
      </Link>
    </li>
  )
};

const Sidebar = ({stateSidebar}) => {
  return (
    <aside className={`sidebar ${stateSidebar ? 'sidebar-open w-75 md:w-16' : 'sidebar-open w-0 md:w-75 '}`}>
      <div>
        <ul className='sidebar-menu' data-widget='tree'>
          {MENU.staff_agent.map(item => (
            <Item key={item.id} item={item} stateSidebar={stateSidebar}/>
          ))}
        </ul>
        <div className={stateSidebar ? 'sidebar-copyright md:hidden' : 'sidebar-copyright hidden md:block'}>
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