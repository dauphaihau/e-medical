import {useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

import {MENU} from "../../constants";

const SubMenu = ({open, items}) => {

  if (!items) return null;
  const router = useRouter();
  items.map((item) => {
    if ([item.link, item.link + "/them", item.link + "/[id]"].includes(router.pathname)) open = true;
  })
  return (
    <ul className={`${!open ? 'hidden' : ''} sidebar-submenu`}>
      {items?.map((item) => (
        <Link passHref href={item.link}>
          <li key={item.title} className={router.pathname === item.link ? 'active' : ''}>
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

const ArrowDropdown = ({open, stateSidebar}) => {
  return (
    <div className={`${stateSidebar && 'md:hidden'}`}>
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

  return (
    <li className={handleActive(item)}>
      <Link href={item.link ? item.link : '#'}>
        <div onClick={() => setActive(!active)}>
          <i className={`text-gray-400 ${item.icon} ${handleActive(item)}`}>
            <span className="path1"/>
            <span className="path2"/>
          </i>
          <a>
            <span className={`${stateSidebar ? 'md:hidden' : ''} ${handleActive(item)}`}>{item.title}</span>
          </a>
          {!stateSidebar && <>
              {item.subNav && <ArrowDropdown open={active}/>}
              <SubMenu items={item.subNav} open={active}/>
            </>
          }
        </div>
      </Link>
    </li>
  )
};

const Sidebar = ({stateSidebar}) => {
  return (
    <aside className={`sidebar ${stateSidebar ? 'sidebar-open w-75 md:w-16' : 'sidebar-open'}`}>
      <ul className='sidebar-menu'>
        {MENU.staff_agent.map((item, idz) => (
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
