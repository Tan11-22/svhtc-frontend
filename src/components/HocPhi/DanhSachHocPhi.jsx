import React, { useEffect, useState } from 'react';
import '../Form036/Cart/Cart.css'
import '../Form036/Table/Table.css'
import userIcon from '../../assets/user.png';
import { getHocPhiSV} from '../API036/apiThongTin.js';
import NavbarMenu from '../NavBarMenu/NavBarMenu.jsx';
import Header from '../Header/Header.jsx';
function DanhSachHocPhi() {
    const menuItems = [
        { name: "Trang chủ", link: "/" },
        { name: "Sinh viên", link: "/sinh-vien" },
        { name: "Giảng viên", link: "/giang-vien" },
        { name: "Phòng giáo vụ", link: "/phong-giao-vu" },
        { name: "Đăng kí môn học", link: "/dang-ki" },
        { name: "Lớp tín chỉ", link: "/lop-tin-chi" },
        { name: "Học phí", link: "/hoc-phi" }
      ];
      const rightMenu = [
        { link: "#", icon: userIcon, alt: "iconthongtincanhan" },
        { link: "#", icon: userIcon, alt: "iconthongtincanhan" }
      ];
    const [hpList, setHocPhiList] = useState([]);
    useEffect(() => {
        const fetchHPList = async () => {
            try {
                const data = await getHocPhiSV(localStorage.getItem("username"));
                setHocPhiList(data);
            } catch (error) {
                console.error('Error fetching the list of hoc phi:', error);
            }
        };

        fetchHPList();
    }, []);
    const totalHocPhiChuaGiam = hpList.reduce((total, hp) => total + hp.sotien, 0);
    const totalDaThu = hpList.reduce((total, hp) => total + hp.dathu, 0);
    const totalConNo = hpList.reduce((total, hp) => total + hp.conno, 0);
  return (
    <div>
          <Header></Header>
          <NavbarMenu menuItems={menuItems} rightMenu={rightMenu} />
      <div>
      <div className='cartFull-036'>
        <div className="cartBackground-036">
            <div className="titlepage"><p> Danh sách học phí</p></div>
                <div className='cart-1-036'>
                </div>  
               
                <div class="table-container-036">
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Niên Khóa</th>
                    <th>Học kì</th>
                    <th>Học phí chưa giảm</th>
                    <th>Miễn giảm</th>
                    <th>Phải thu</th>
                    <th>Đã thu</th>
                    <th>Còn nợ</th>
              
                    </tr>
                </thead>
                <tbody>
                {hpList.map((hp, index) => (
                                    <tr key={hp.masv}>
                                        <td>{index + 1}</td>
                                        <td>{`Năm học ${hp.nienkhoa}`}</td>
                                        <td>{`Học kì ${hp.hocki}`}</td>
                                        <td>{hp.sotien}</td>
                                        <td>0</td>
                                        <td>{hp.sotien}</td>
                                        <td>{hp.dathu}</td>
                                        <td>{hp.conno}</td>
                                        
                                    </tr>
                                ))}
                    <tr className='trTongCong'>
                        <td className='thTong' colSpan={3}>
                            TỔNG CỘNG:
                        </td>
                        <td>{totalHocPhiChuaGiam}</td>
                        <td>0</td>
                        <td>{totalHocPhiChuaGiam}</td>
                        <td>{totalDaThu}</td>
                        <td>{totalConNo}</td>
                    </tr>
                </tbody>
               
                
               </table>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DanhSachHocPhi
