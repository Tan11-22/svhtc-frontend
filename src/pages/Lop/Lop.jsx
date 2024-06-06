import React from 'react'
import "../MonHoc/MonHoc.css"
import Header from '../../components/Header/Header'
import NavbarMenu from '../../components/NavBarMenu/NavBarMenu';
import CardLeft from '../../components/CardLeft/CardLeft';
import DanhSachLop from '../../components/DanhSach/DanhSachLop';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
import Footer from '../../components/Footer/Footer';
function Lop() {
    const data = [
        { name: 'Môn học', image: "mon-hoc",act:0 },
        { name: 'Lớp học', image: "lop-hoc", act:1 },
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
                <DanhSachLop/>
            </div>
          </div>
          <Footer/>
        </div>
      )
}

export default Lop
