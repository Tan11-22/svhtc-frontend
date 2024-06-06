import React, {useState} from 'react'
import './QuenMatKhau.css'
import close from '../../assets/close.png'
import ReCAPTCHA from 'react-google-recaptcha';
import {resetPass} from '../../services/loginService'
//6Ld_jtgpAAAAANYrzQ0jH9-0O3AiMsEqNCvGBxdx
function QuenMatKhau({open, onClose}) {
    const [data,setData] = useState({})
    const [capVal, setCapVal] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const result = await resetPass(data);
                if (result.code == 200) {
                    onClose();
                }
            } catch (error) {
            }
          };
        
        fetchData();
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({...values, [name]: value}))
      }
    if(!open) return null;
  return (
    <div className='overlay'>
        <div className='modal-container'>
            <form onSubmit={handleSubmit}>
                <div className='modal-close'>
                        <img src={close} onClick={onClose}></img>
                </div>
                <p className='modal-title'>Đặt lại mật khẩu</p>
                <div className="form-input">
                    <div className="form-control">
                        <p>Tên đăng nhập</p>
                        <input type='text'
                        placeholder='Tên đăng nhập'
                        name='username'
                        value={data.username||""}
                        onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-control">
                        <p>Địa chỉ email nhận mật khẩu</p>
                        <input type='text'
                        placeholder='Email'
                        name='email'
                        value={data.email||""}
                        onChange={handleChange}>
                        </input>
                    </div>
                    
                </div>
                <div className='form_group_recaptcha'>
                    <ReCAPTCHA
                    sitekey='6Ld_jtgpAAAAANYrzQ0jH9-0O3AiMsEqNCvGBxdx'
                    onChange={(val) => setCapVal(val) }>
                    </ReCAPTCHA>
                </div>
                <button disabled={!capVal}
                id="btn-send-to-email">Gửi mật khẩu đến email</button>
            </form>
        </div>
     
    </div>
  )
}

export default QuenMatKhau;
