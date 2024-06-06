import React,{useState, useEffect} from 'react'
import "./MonHoc.css"
import Header from '../../components/Header/Header'
import DanhSachMonHoc from '../../components/DanhSach/DanhSachMonHoc';

import CardLeft from '../../components/CardLeft/CardLeft';

function MonHoc() {
  // console.log(localStorage.getItem("token"))
  const data = [
    { name: 'Môn học', image: "mon-hoc",act:1 },
    { name: 'Lớp học', image: "lop-hoc", act:0 },
    // Thêm các đối tượng khác tại đây
  ];
  return (
    <div>
      <Header/>
      <div className='card-body'>
        <div className='card-left'>
          <CardLeft title1={"Phòng giáo vụ"} menu={data}/>
        </div>
        <div className='card-right'>       
            <DanhSachMonHoc/>
        </div>
      </div>
    </div>
  )
}

export default MonHoc