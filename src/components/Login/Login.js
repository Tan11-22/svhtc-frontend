import React from "react";
import logo from "../assets/logo.png";
import enter from "../assets/enter.png";
import "../styles/login.css";

export default function Login() {

    return (
        <div className="background-theme">
            <div className="card">
                
                    <div className="brand">
                        <img src={logo}></img>
                        <h4>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</h4>
                        <h5>cơ sở tại TH.HCM</h5>
                    </div>
                    <div className="loginFrom">
                        <div className="card-1">
                            <h3>Đăng nhập</h3>
                        <div><input className="form-control"></input></div>
                        <div><input className="form-control"></input></div>
                        <div><button className="btn-submit"><img src={enter}></img></button></div>
                        </div>
                    </div>
            </div>
        </div>
    );
}



