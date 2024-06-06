import React from 'react'
import logofoot from "../../assets/logofoot.png"
import "./Footer.css"
function Footer() {
  return (
    <div className='footer-62'>
      <div className='footer-card-62-bb'>
        <div className='footer-card-62'>
          <div className='footer-info'>
            <img src={logofoot}/>
            <ul>
              <li>

                <p>Cơ sở Quận 1: 11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>
              </li>
              <li>

                <p>Cơ sở Thủ Đức: 97 Man Thiện, Phường Hiệp Phú, Thủ Đức, TP. Hồ Chí Minh</p>
              </li>

              <li>

                <p>Hotline: (028) 39.105.510</p>
              </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer
