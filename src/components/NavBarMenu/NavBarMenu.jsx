import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import login1 from '../../assets/login1.png';
import logout from '../../assets/logout.png';
import account from '../../assets/account.png';
import { useNavigate } from 'react-router-dom';
import './NavBarMenu.css';

function NavbarMenu({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const user = localStorage.getItem("username")
  const role = localStorage.getItem("role")
  console.log(role)
  const handleClick = (link) => {
    setActiveItem(link);
  };
  const handleClickLog = () =>{
    if(user) {
      localStorage.removeItem("username")
      localStorage.removeItem("role")
    } 
    navigate("/login")
  }
 
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
            <li >
                <Link to={"/thong-tin-ca-nhan"}>
                    <img className={(role === "SINHVIEN") ?"icon-right":"icon-right an"} src={account} />
                </Link>
            </li>
                    
            <li >
                <img className="icon-right" src={user?logout:login1} onClick={handleClickLog} />
              </li>
                
                     
                
                
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarMenu;
