import React from 'react'
import logoPtit from '../../assets/Logo_PTIT_University.png'
import './Header.css'
function Header() {
  return (
    <div>
      <div className="container-header">
        <div>
            <img className="image-header" src={logoPtit} alt="logo-ptit"></img>
        </div>
        <div className="text-container-header">
            <p className="first-line-header">Học viện Công Nghệ Bưu chính Viễn thông - cơ sở tại TP. Hồ Chí Minh</p>
            <p className="second-line-header">Posts and Telecommunications Institute of Technology</p>
        </div>
        </div>
    </div>

    
  )
}

export default Header