import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBarMenu from './components/NavBarMenu/NavBarMenu.jsx' ;
import QuanTriSinhVien from './components/QuanTriSinhVien/QuanTriSinhVien.jsx';
import XemHocPhi from './components/HocPhi/XemHocPhi.jsx';
import DanhSachHocPhi from './components/HocPhi/DanhSachHocPhi.jsx';
import LopTinChi from './components/LopTinChi/LopTinChi.jsx';
import QuanTriGiangVien from './components/QuanTriGiangVien/QuanTriGiangVien.jsx';
function App() {
  const menuItems = [
    { name: "Trang chủ", link: "#" },
    { name: "Sinh viên", link: "#" },
    { name: "Giảng viên", link: "#" },
    { name: "Phòng giáo vụ", link: "#" },
    { name: "Đăng kí môn học", link: "#" },
    { name: "Lớp tín chỉ", link: "#" },
    { name: "Học phí", link: "#" }
  ];
  return (
    
    <div >
      <Header></Header>
      <NavBarMenu menuItems={menuItems}></NavBarMenu>
      {/* <DanhSachHocPhi></DanhSachHocPhi> */}
        <QuanTriSinhVien></QuanTriSinhVien>
       {/* <LopTinChi></LopTinChi>
       <QuanTriGiangVien></QuanTriGiangVien> */}
    </div>
  );
}

export default App;
