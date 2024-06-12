import React , {useState, useEffect}from 'react'
import "./Form.css"
import close from '../../assets/close.png'
import { xoaLopHoc } from '../../services/lopService';

function FormDeleteLop({open, onClose, maLop, refresh}) {

    const [thongTin, setThongTin] = useState('');

    useEffect (
        () => {
            if(maLop !== ""){
                setThongTin("Bạn muốn xoá lớp học " + maLop + " ?")
            }
            
        }, [open]
    )
    const handleDelete = () => {
        const fetchData = async () => {
              try {
                const result1 = await xoaLopHoc(maLop.trim());
                console.log("Kết quả xoá môn học", result1)
                if(result1.code == 200) 
                    {
                        refresh();
                        // console.log("Kết quả :", isRefresh)
                        onClose();
                        setThongTin("");
                    }
              } catch (error) {
              }
            };
          
            fetchData(); 
    } 
    const handleClose = () => {
        onClose();
        setThongTin("");
      }
      if(!open) return null
  return (
    <div className='overlay'>
        <div className='modal-container'>
            <div className='modal-close'>
                <img src={close} onClick={handleClose}/>
            </div>
            <p className='modal-title'>Xác nhận xoá</p>
            <div className='khung-thong-tin'>
                <p>{thongTin}</p>
            </div>
            <button className="btn-them" onClick={handleDelete}>
                  Xoá
                </button>
        </div>
      
    </div>
  )
}

export default FormDeleteLop
