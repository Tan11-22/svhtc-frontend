import React, {useState , useEffect} from 'react'
import close from '../../assets/close.png'
import {themLopHoc,getDanhSachHe,getDanhSachKhoa} from '../../services/lopService';


function FormUpdateLop({open, onClose ,data, refresh}) {
    const [danhSachKhoa, setDanhSachKhoa] = useState ([])
    const [khoa,setKhoa] = useState("")
    const [danhSachHe, setDanhSachHe] = useState ([])
    const [he,setHe] = useState(0)
    const [lop,setLop] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLop(values => ({...values, [name]: value}))
      }
      useEffect(
        () => {
            if(data !== undefined) {
                
                const khoaHocArray = data.khoaHoc ? data.khoaHoc.split("-") : [];
                const khoaHoc1 = khoaHocArray[0] || ""; // Default to empty string if undefined
                const khoaHoc2 = khoaHocArray[1] || ""; // Default to empty string if undefined
        
                setLop({
                    maLop: data.maLop,
                    tenLop: data.tenLop,
                    khoaHoc1: khoaHoc1,
                    khoaHoc2: khoaHoc2,
                });
            }
        }, [open]
      )
const handleSubmitForm = (event) => {
    event.preventDefault();

    // setLop(values => ({...values, 'maKhoa': khoa, 'idHe':he}))
    console.log(lop)
    const fetchData = async () => {
        try {
            const response = await themLopHoc(lop)
            console.log(response.status)
        } catch (error) {
            
        }
    }
    fetchData()
    refresh()
    handleClose()
   
}

const handleClose = () => {
    onClose();
    setLop({});
  }
  const handleChangeKhoa = (event) => {
    setKhoa(event.target.value);
    setLop(values => ({...values, 'maKhoa': khoa}))
  };

  const handleChangeHe = (event) => {
    setHe(event.target.value);
    setLop(values => ({...values, 'idHe':he}))
  };
  useEffect (
    () => {
        const fetchData = async () => {
            try {
                const response = await getDanhSachKhoa()
                const response1 = await getDanhSachHe()
                setDanhSachKhoa(response.data)
                setDanhSachHe(response1.data)
            } catch (error) {
                
            }
        }
        fetchData()
    }, []
  )
  useEffect (
    () => {
        if(danhSachHe.length > 0){
            setHe(danhSachHe[0].ID_HE)
            setLop(values => ({...values, 'idHe':he}))
        }
    }, [danhSachHe]
  )
  useEffect (
    () => {
        if( danhSachKhoa.length > 0) {
            setKhoa(danhSachKhoa[0].makhoa)
            setLop(values => ({...values, 'maKhoa': khoa}))
        }
       
    }, [danhSachKhoa]
  )
  if (!open) return null
  return (
    <div>
        <div className='overlay'>
        <div className='modal-container'>
            <form onSubmit={handleSubmitForm}>
                <div className='modal-close'>
                        <img src={close} onClick={handleClose}></img>
                </div>
                <p className='modal-title'>Thay đổi lớp học</p>
                <div className="form-input">
                    <div className="form-control">
                        <p>Mã lớp học</p>
                        <input type='text'
                        placeholder='Mã lớp học'
                        name='maLop'
                        value={lop.maLop}
                        onChange={handleChange}
                        readOnly
                        />
                    </div> 
                    <div className="form-control">
                        <p>Tên lớp học</p>
                        <input type='text'
                        placeholder='Tên lớp học'
                        name='tenLop'
                        value={lop.tenLop}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Năm bắt đầu</p>
                        <input type='number'
                        min={0}
                        placeholder='Năm bắt đầu'
                        name='khoaHoc1'
                        value={lop.khoaHoc1}
                        onChange={handleChange}
                        />
                    </div> 
                    <div className="form-control">
                        <p>Năm kết thúc</p>
                        <input type='number'
                        min={0}
                        placeholder='Năm kết thúc'
                        name='khoaHoc2'
                        value={lop.khoaHoc2}
                        onChange={handleChange}
                        />
                    </div> 

                    <div className="form-control">
                        <p>Khoa</p>
                        <select value={khoa} onChange={handleChangeKhoa}>
                            {
                                danhSachKhoa.map(
                                    (val,key) => {
                                        return(
                                            <option key={key} value={val.makhoa}>{val.makhoa} - {val.tenkhoa}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div> 

                    <div className="form-control">
                        <p>Hệ</p>
                        <select value={he} onChange={handleChangeHe}>
                            {
                                danhSachHe.map(
                                    (val,key) => {
                                        return(
                                            <option key={key} value={val.ID_HE}>{val.ID_HE} - {val.TEN_HE}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div> 
                    
                    
                </div>
                <button className="btn-them" type='submit'>
                  Thêm
                </button>
            </form>
        </div>
     
    </div>
    </div>
  )
}

export default FormUpdateLop
