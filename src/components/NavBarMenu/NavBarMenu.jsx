import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavBarMenu.css';

function NavbarMenu({ menuItems, rightMenu }) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleClick = (link) => {
    setActiveItem(link);
  };

  return (
    <div>
      <div className="nav-bar-menu">
        <nav>
          <div className="left-nav-menu"></div>
          <div className="center-nav-menu">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={activeItem === item.link ? 'active' : ''}
                    onClick={() => handleClick(item.link)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-nav-menu">
            <ul>
              {rightMenu.map((item, index) => (
                <li key={index}>
                  <Link to={item.link}>
                    <img src={item.icon} alt={item.alt} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarMenu;
