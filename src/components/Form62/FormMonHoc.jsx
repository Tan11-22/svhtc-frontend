import React, {useState} from 'react'
import "./Form.css"
import close from '../../assets/close.png'
import {themMonHoc} from '../../services/monHocService';
function FormMonHoc({open, onClose}) {
    const [monHoc, setMonHoc] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMonHoc(values => ({...values, [name]: value}))
      }
    const handleSubmitForm = (event) => {
        event.preventDefault();
        // console.log("Mon hoc: ", monHoc)
        const fetchData = async () => {
            try {
              const result2 = await themMonHoc(monHoc);
              console.log("kết quả thêm môn học", result2);
            } catch (error) {
            }
          };
        
        fetchData();
        handleClose();
      }
      const handleClose = () => {
        onClose();
        setMonHoc({});
      }
    if (!open) return null
  return (
    <div className='overlay'>
        <div className='modal-container'>
            <form onSubmit={handleSubmitForm}>
                <div className='modal-close'>
                        <img src={close} onClick={handleClose}></img>
                </div>
                <p className='modal-title'>Thêm môn học mới</p>
                <div className="form-input">
                    <div className="form-control">
                        <p>Mã môn học</p>
                        <input type='text'
                        placeholder='Mã môn học'
                        name='maMH'
                        value={monHoc.maMH||""}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Tên môn học</p>
                        <input type='text'
                        placeholder='Tên môn học'
                        name='tenMH'
                        value={monHoc.tenMH||""}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Số tiết lí thuyết</p>
                        <input type='number'
                        min={0}
                        placeholder='Số tiết lí thuyết'
                        name='soTietLT'
                        value={monHoc.soTietLT||""}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Số tiết thực hành</p>
                        <input type='number'
                        min={0}
                        placeholder='Số tiết thực hành'
                        name='soTietTH'
                        value={monHoc.soTietTH||""}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Số tín chỉ</p>
                        <input type='number'
                        min={1}
                        placeholder='Số tín chỉ'
                        name='soTinChi'
                        value={monHoc.soTinChi||""}
                        onChange={handleChange}
                        />
                    </div> 
                </div>
                <button className="btn-them" type='submit'>
                  Thêm
                </button>
            </form>
        </div>
     
    </div>
  )
}

export default FormMonHoc
