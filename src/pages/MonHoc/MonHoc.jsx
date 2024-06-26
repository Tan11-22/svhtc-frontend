import React,{useState, useEffect} from 'react'
import "./MonHoc.css"
import Header from '../../components/Header/Header'
import DanhSachMonHoc from '../../components/DanhSach/DanhSachMonHoc';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
import CardLeft from '../../components/CardLeft/CardLeft';
import NavbarMenu from '../../components/NavBarMenu/NavBarMenu';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
function MonHoc() {
  const navigate = useNavigate();
  // console.log(localStorage.getItem("token"))
  useEffect(
    ()=>{
      if(localStorage.getItem('role') === "SINHVIEN") {
        navigate("/")
    }
    }, []
  )
  const data = [
    { name: 'Môn học', image: "mon-hoc",act:1 },
    { name: 'Lớp học', image: "lop-hoc", act:0 },
    // Thêm các đối tượng khác tại đây
  ];
  
  return (
    <div>
      <Header/>
      <NavbarMenu menuItems={menuItemsGV}/>
      <div className='card-body'>
        <div className='card-left'>
          <CardLeft title1={"Phòng giáo vụ"} menu={data}/>
        </div>
        <div className='card-right'>       
            <DanhSachMonHoc/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MonHoc
