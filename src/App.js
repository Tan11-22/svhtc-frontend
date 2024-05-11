import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import NavBarMenu from './components/NavBarMenu/NavBarMenu.jsx' ;

function App() {
  const menuItems = [
    { name: "Trang chủ", link: "#" },
    { name: "Sinh viên", link: "#" },
    { name: "Giảng viên", link: "#" },
    { name: "Phòng giáo vụ", link: "#" },
    { name: "Đăng kí môn học", link: "#" },
    { name: "Học phí", link: "#" }
  ];
  return (
    
    <div >
      <Header></Header>
      <NavBarMenu menuItems={menuItems}></NavBarMenu>
    </div>
  );
}

export default App;
