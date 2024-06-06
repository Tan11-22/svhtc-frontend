import React from 'react'
import "./CardLeft.css"
import monHoc from '../../assets/monhoc.png'
import lopHoc from '../../assets/lophoc.png'

const images = {
    'mon-hoc': monHoc,
    'lop-hoc': lopHoc,
  };
function CardLeft({title1, menu}) {
    console.log("check menu", menu)
  return (
    <div>
      <p className='title-card'>{title1}</p>
      <ul className='menu'>
        {menu.map((val,index) => (
          <a key={index} href={val.image}>
            <li className={val.act == 1? "menu-li active":"menu-li"}>
                <img src={images[val.image]}/>
                <p>{val.name}</p> 
            </li>
            </a>
        ))}
      </ul>
    </div>
  )
}

export default CardLeft
