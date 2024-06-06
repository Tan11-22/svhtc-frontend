import React from 'react'
import userIcon from '../../assets/user.png';
import './NavBarMenu.css';
function NavbarMenu({ menuItems }) {
  return (
    <div>
        <div className="nav-bar-menu ">
    <nav>
      <div className="left-nav-menu"></div>
        <div className="center-nav-menu">
            <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
            </ul>
          </div>
          <div className="right-nav-menu">
            <ul>

            <li><a href="#"><img src={userIcon} alt="iconthongtincanhan"></img></a></li>
         
            {/* <li><a href="#"><img src={userIcon} alt="iconthongtincanhan"></img></a></li> */}
            
            </ul>
          </div>

    </nav>
  </div>
    </div>
  )
}

export default NavbarMenu
