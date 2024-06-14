import React, { useEffect, useState } from 'react';
import '../Form036/Cart/Cart.css'
import '../Form036/Table/Table.css'
import userIcon from '../../assets/user.png';
import { getDSSVHocPhi,getDanhSachNienKhoa} from '../API036/apiThongTin.js';
import NavbarMenu from '../NavBarMenu/NavBarMenu.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../../components/Footer/Footer';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
import { useNavigate } from 'react-router-dom';
function XemHocPhi() {
    const navigate = useNavigate();
    const [nienKhoaList, setNienKhoaList] = useState([]);
    const [selectedNienKhoa, setSelectedNienKhoa] = useState('');
    const [selectedHocKi, setSelectedHocKi] = useState('');
    const [hpList, setHocPhiList] = useState([]);
    useEffect(() => {
        if(localStorage.getItem('role') === "SINHVIEN") {
            navigate("/")
        }
        const fetchNienKhoaList = async () => {
            try {
                const data = await getDanhSachNienKhoa();
                const trimmedData = data.map(nienkhoa => nienkhoa.trim());
                setNienKhoaList(trimmedData);
                if (trimmedData.length > 0) {
                    setSelectedNienKhoa(trimmedData[0]);
                }
            } catch (error) {
                console.error('Error fetching the list of NienKhoa:', error);
            }
        };

        fetchNienKhoaList();
    }, []);
    useEffect(() => {
        const fetchHPList = async () => {
            try {
                const data = await getDSSVHocPhi(selectedNienKhoa, selectedHocKi);
                setHocPhiList(data);
            } catch (error) {
                console.error('Error fetching the list of hoc phi:', error);
            }
        };

        fetchHPList();
    }, [selectedNienKhoa, selectedHocKi]);
    const handleNienKhoaChange = (e) => {
        const selectedValue = e.target.value.trim();
        setSelectedNienKhoa(selectedValue);
    };

    const handleHocKiChange = (e) => {
        const selectedValue = e.target.value.trim();
        setSelectedHocKi(selectedValue);
    };
  
    useEffect(() => {
        if ( selectedNienKhoa && !selectedHocKi) {
            setSelectedHocKi('1');
        }
    }, [selectedNienKhoa, selectedHocKi]);
    
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
                    <label htmlFor="nienkhoa" className="label">Niên khóa:</label>
                            <select className="cart-1-select" name="items" onChange={handleNienKhoaChange} value={selectedNienKhoa}>
                                <option value="" disabled>Chọn 1 Niên Khóa</option>
                                {nienKhoaList.length === 0 ? (
                                    <option value="" disabled>Loading NienKhoaList...</option>
                                ) : (
                                    nienKhoaList.map((nk) => (
                                        <option key={nk} value={nk}>{nk}</option>
                                    ))
                                )}
                            </select>
                            <label htmlFor="hocki" className="label">Học kì:</label>
                            <select className="cart-1-select" name="items" onChange={handleHocKiChange} value={selectedHocKi}>
                                <option value="" disabled>Chọn 1 Học Kỳ</option>
                                <option value="1">Học kì 1</option>
                                <option value="2">Học kì 2</option>

                            </select>
                    </div>
                    <div className="cart-1-right">
                    </div>
                </div>
               
                <div className="table-container-036">
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
