import React, {useState} from 'react'

import "./Form.css"
import close from '../../assets/close.png'
import {doiMatKhau} from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
function FormDoiMatKhau({open, onClose}) {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({...values, [name]: value}))
      }
    const handleSubmitForm = (event) => {
        event.preventDefault();
        // console.log(data)
        if(data.newpassword !== data.newpassword2) {
            alert("Nhập lại mật khẩu mới không chính xác!")
            return
        }
        const username = localStorage.getItem("username")
        setData(values => ({...values, "username": username}))
        const fetchData = async () => {
            try {
              const result2 = await doiMatKhau(data);
              console.log(data)
              console.log("kết quả thêm môn học", result2);
              if (result2.code == 200) {
                    localStorage.removeItem("username")
                    localStorage.removeItem("role")
                    navigate("/login")
                    handleClose()
                } else {
                    alert("Mật khẩu cũ không chính xác!")
                }
                    
            
            } catch (error) {
            }
          };
        
        fetchData();
      }
      const handleClose = () => {
        onClose();
        setData({});
      }
    if (!open) return null
  return (
    <div>
            <div className='overlay'>
        <div className='modal-container'>
            <form onSubmit={handleSubmitForm}>
                <div className='modal-close'>
                        <img src={close} onClick={handleClose}></img>
                </div>
                <p className='modal-title'>Thay đổi mật khẩu</p>
                <div className="form-input">
                    <div className="form-control">
                        <p>Mật khẩu cũ</p>
                        <input type='password'
                        placeholder='Mật khẩu cũ'
                        name='password'
                        value={data.password||""}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Mật khẩu mới</p>
                        <input type='password'
                        placeholder='Mật khẩu mới'
                        name='newpassword'
                        value={data.newpassword||""}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <p>Nhập lại mật khẩu mới</p>
                        <input type='password'
                        placeholder='Nhập lại mật khẩu mới'
                        name='newpassword2'
                        value={data.newpassword2||""}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="btn-them" type='submit'>
                  Thay đổi
                </button>
            </form>
        </div>
     
    </div>
    </div>
  )
}

export default FormDoiMatKhau
