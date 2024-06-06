import React, {useState} from "react";
import logo from "../../assets/logo.png";
import login from "../../assets/login.png";
import "./login.css";
import QuenMatKhau from "../../components/QuenMatKhau/QuenMatKhau";
import {dangNhap} from '../../services/loginService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // console.log("asdasfas");
    const [openQuenMatKhau, setOpenQuenMatKhau] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ({...values, [name]: value}))
      }
      const handleSubmitForm = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                const result2 = await dangNhap(user);
                setError(false);
                navigate("/")
            } catch (error) {
                setError(true)
            }
          };
        
        fetchData();
      }
      
    return (
        <div>
            <div className="background-theme" >
                <div className="card">
                    
                        <div className="brand">
                            <img src={logo}></img>
                            <p>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>
                            <p>cơ sở tại TH.HCM</p>
                            <ul>
                                <li>Số điện thoại: 028 3730 6600.</li>
                                <li>Địa chỉ: 97 Đ. Man Thiện, Hiệp Phú, Thủ Đức, Thành phố Hồ Chí Minh 70000.</li>
                            </ul>
                        </div>
                        <div className="loginFrom">
                            <form onSubmit={handleSubmitForm}>
                            <div className="card-1">
                                <p id="title-dang-nhap">ĐĂNG NHẬP</p>
                                <div className="form-input">
                                    <div className="form-control">
                                        <p>Tên đăng nhập</p>
                                        <input
                                        name="username"
                                        value={user.username||""}
                                        onChange={handleChange}></input></div>
                                    <div className="form-control">
                                        <p>Mật khẩu</p>
                                        <input type="password"
                                        name="password"
                                        value={user.password||""}
                                        onChange={handleChange}></input>
                                        </div>
                                    <div id="quen-mat-khau">
                                        <a href="#" onClick={()=> setOpenQuenMatKhau(true)}>* Quên mật khẩu</a>
                                    </div>

                                    <div id="error">
                                        {error? <p>Tài khoản hoặc mật khẩu không chính xác</p>:null}
                                    </div>
                                    <div className="btn-submit">
                                        <button type="submit">
                                            <img src={login}></img></button>
                                    </div>
                                    
                                </div>
                                </div>
                                </form>
                        </div>
                </div>
                <QuenMatKhau open={openQuenMatKhau} onClose={()=>setOpenQuenMatKhau(false)}/>
            </div>

        </div>

    );
}



