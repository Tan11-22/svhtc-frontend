import React, {useState, useEffect} from 'react'
// import "./DangKyLTC.css"
import {getDSLTCDeDK, getDanhSachThongTinLop, getDSLTCDaDK,dangKyLTC, huyDangKyLTC} from "../../services/dangKyLTC"
import Header from '../../components/Header/Header'
import check from "../../assets/check.png";
import uncheck from "../../assets/unchecked.png";
import closeltc from "../../assets/closeltc.png";
import Loading from '../../components/Loading/Loading';
import NavbarMenu from '../../components/NavBarMenu/NavBarMenu';
import  {menuItemsSV}  from '../../components/NavBarMenu/menu';

function DangKyLTC() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [danhSachLop, setDanhSachLop] = useState([])
    const [lop,setLop] = useState("");
    const [danhSachLopDK, setDanhSachLopDK] = useState([])
    const [danhSachLopDaDK, setDanhSachLopDaDK] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(
        () => {
            const fetchData = async () => {
                try {
                  const result = await getDanhSachThongTinLop();
                  setDanhSachLop(result.data)
                  setLoading(false)
                } catch (error) {
                    setLoading(false)
                    setError(error)
                }
              };
            
            fetchData(); 
        },
        []
    )
    useEffect(
        () => {
            if (danhSachLop.length > 0) {
                setLop(danhSachLop[0].MALOP); 
            }
        },
        [danhSachLop]
    )
    
    const handleChange = (event) => {
        setLop(event.target.value);
      };
    const handleChange1 = () => {
        console.log("check lop: ",lop);
      
      };
    useEffect(
        () => {
            const fetchData = async () => {
                const maSV = localStorage.getItem('username');
                // console.log('maSV:', maSV);
                // console.log('lop:', lop);
                try {
                    if(lop!== "" && maSV){
                        const result = await getDSLTCDeDK(lop.trim(),maSV);
                        setDanhSachLopDK(result.data)         
                    }     
                } catch (error) {
                    console.log(error)
                }
              };
            
            fetchData(); 
        },
        [lop,refresh]
    )
    useEffect (
        () => {
            const fetchData = async () => {
                const maSV = localStorage.getItem('username');

                try {
                    if(maSV){
                        const result = await getDSLTCDaDK(maSV);
                        setDanhSachLopDaDK(result.data)         
                    }     
                } catch (error) {
                    console.log(error)
                }
              };
            
            fetchData(); 
        },
        [refresh]
    )   
    const thaoTacDangKy = (maLTC,soSVToiDa) => {
        console.log("check1")
        const fetchData = async () => {
            const maSV = localStorage.getItem('username');
            try {
                if(maSV){
                    const result = await dangKyLTC(maLTC,maSV,soSVToiDa); 
                    if(result.code === 200){
                        setRefresh(!refresh)
                    }    
                }     
            } catch (error) {
                console.log(error)
            }
          };
        
        fetchData(); 
    }
    const thaoTacHuyDangKy = (maLTC) => {
        console.log("check2")
        const fetchData = async () => {
            const maSV = localStorage.getItem('username');
            try {
                if(maSV){
                    const result = await huyDangKyLTC(maLTC,maSV);
                    if(result.code=== 200){
                        setRefresh(!refresh)
                    }     
                }     
            } catch (error) {
                console.log(error)
            }
          };
        
        fetchData(); 
    }
    if (loading) return <Loading/>;
    if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
        <Header/>
        <NavbarMenu menuItems={menuItemsSV}/>
        <div className='card-body'>
            <div className='card-ltc-62'>
                <div className='loc-input'>
                    <div className='custom-select'>
                        <p>Chọn lớp</p>
                        <select value={lop} onChange={handleChange}>
                            {
                                danhSachLop.map(
                                    (val,key) => {
                                        return(
                                            <option key={key} value={val.MALOP}>{val.MALOP} - {val.TENLOP}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='card-dsltc-62'>
                    <div className='title-dsltc-62'>
                        <p >Danh sách môn học mở cho đăng ký</p> 
                    </div>
                <table>
                    <thead>
                    <tr>
                      <th className='col-2'>Đăng ký</th>
                      <th className='col-2'>Mã MH</th>
                      <th className='col-3'>Tên môn học</th>
                      <th className='col-2'>Nhóm</th>
                      <th className='col-2'>Số tín chỉ</th>
                      <th className='col-2'>Tối đa</th>
                      <th className='col-2'>Còn lại</th>
                      <th className='col-2'>Giảng viên</th>
                      <th className='col-2'>Lớp</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            danhSachLopDK.map(
                                (val,key) => {
                                    return (
                                        <tr key={key} className={val.active?"select-row-62":""}>
                                            <th className='col-2'>
                                                <img 
                                                onClick={()=>thaoTacHuyDangKy(val.maLTC)}
                                                src={check} className={val.active?"":"img-display-none"}/>
                                                <img 
                                                onClick={()=>thaoTacDangKy(val.maLTC,val.soSVToiDa)}
                                                src={uncheck} className={val.active?"img-display-none":""}/>
                                            </th>
                                            <th className='col-2'>{val.maMH}</th>
                                            <th className='col-3'>{val.tenMH}</th>
                                            <th className='col-2'>{val.nhom}</th>
                                            <th className='col-2'>{val.soTC}</th>
                                            <th className='col-2'>{val.soSVToiDa}</th>
                                            <th className='col-2'>{val.conLai}</th>
                                            <th className='col-2'>{val.maGV}</th>
                                            <th className='col-2'>{val.maLop}</th>
                                        </tr>
                                    )                         
                                }
                            )
                        }
                    </tbody>
                  </table>
                </div>

                <div className='card-dsltc-62'>
                    <div className='title-dsltc-62'>
                        <p >Danh sách môn học đã đăng ký</p> 
                    </div>
                <table>
                    <thead>
                    <tr>
                      <th className='col-2'>Huỷ</th>
                      <th className='col-2'>Mã MH</th>
                      <th className='col-3'>Tên môn học</th>
                      <th className='col-2'>Nhóm</th>
                      <th className='col-2'>Số tín chỉ</th>
                      <th className='col-2'>Giảng viên</th>
                      <th className='col-2'>Lớp</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            danhSachLopDaDK.map(
                                (val,key) => {
                                    return (
                                        <tr key={key}>
                                            <th className='col-2'>
                                            <img 
                                            onClick={()=>thaoTacHuyDangKy(val.maLTC)}
                                            src={closeltc}
                                             />
                                            </th>
                                            <th className='col-2'>{val.maMH}</th>
                                            <th className='col-3'>{val.tenMH}</th>
                                            <th className='col-2'>{val.nhom}</th>
                                            <th className='col-2'>{val.soTC}</th>
                                            <th className='col-2'>{val.maGV}</th>
                                            <th className='col-2'>{val.maLop}</th>
                                        </tr>
                                    )                         
                                }
                            )
                        }
                    </tbody>
                  </table>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default DangKyLTC
