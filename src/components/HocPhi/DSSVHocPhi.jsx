import React, { useEffect, useState } from 'react';
import '../Form036/Cart/Cart.css'
import '../Form036/Table/Table.css'
import userIcon from '../../assets/user.png';
import { getDSSVHocPhi} from '../API036/apiThongTin.js';
import NavbarMenu from '../NavBarMenu/NavBarMenu.jsx';
import Header from '../Header/Header.jsx';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
function XemHocPhi() {
    const [hpList, setHocPhiList] = useState([]);
    useEffect(() => {
        const fetchHPList = async () => {
            try {
                const data = await getDSSVHocPhi();
                setHocPhiList(data);
            } catch (error) {
                console.error('Error fetching the list of hoc phi:', error);
            }
        };

        fetchHPList();
    }, []);
  return (
    <div>
        <Header></Header>
        <NavbarMenu menuItems={menuItemsGV} />
      <div>
      <div className='cartFull-036'>
        <div className="cartBackground-036">
            <div className="titlepage"><p>Danh Sách Sinh Viên Học Phí</p></div>
                <div className="cart-1-036">
                    <div className="cart-1-left">
{/*         
                        <select className="cart-1-select" name="hocKy">
                            <option value="all">Tổng hợp học phí tất cả các kỳ</option>
                            <option value="22-23H1">Học kỳ 1 năm học 2022 - 2023</option>
                            <option value="22-23H2">Học kỳ 2 năm học 2022 - 2023</option>
                        </select> */}
                    </div>
                    <div className="cart-1-right">
                    </div>
                </div>
               
                <div class="table-container-036">
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Mã sinh viên</th>
                    <th>Họ tên</th>
                    <th>Niên khóa</th>
                    <th>Học kì</th>
                    <th>Số tiền</th>
                    <th>Ngày đóng</th>

                    </tr>
                </thead>
              <tbody>
               
                {hpList.map((hp, index) => (
                                    <tr key={hp.masv}>
                                        <td>{index + 1}</td>
                                        <td>{hp.masv}</td>
                                        <td>{hp.hoten}</td>
                                        <td>{`Năm học ${hp.nienkhoa}`}</td>
                                        <td>{`Học kì ${hp.hocki}`}</td>
                                        <td>{hp.sotien}</td>
                                        <td>{hp.dadong}</td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default XemHocPhi
