import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = ({ isOpen, handleClose, data, nienKhoa, hocKi, monHoc, maGv, updateStudentData }) => {
  const [diemCC, setDiemCC] = useState(data.DIEMCC);
  const [diemGK, setDiemGK] = useState(data.DIEMGK);
  const [diemCK, setDiemCK] = useState(data.DIEMCK);

  useEffect(() => {
    setDiemCC(data.DIEMCC);
    setDiemGK(data.DIEMGK);
    setDiemCK(data.DIEMCK);
  }, [data, isOpen])

  const handleClickLuuDiem = () => {
    console.log("diemcc" + diemCC);
    console.log("diemgk" + diemGK);
    console.log("diemck" + diemCK);
    console.log("nienkhoa" + nienKhoa);
    console.log("hocki" + hocKi);
    console.log("monhoc" + monHoc);
    console.log("gv" + maGv);

    updateStudentData({
      ...data,
      DIEMCC: diemCC,
      DIEMGK: diemGK,
      DIEMCK: diemCK,
      DIEMTK: diemCC * 0.1 + diemGK * 0.3 + diemCK * 0.6,
      KETQUA: (diemCC * 0.1 + diemGK * 0.3 + diemCK * 0.6) > 4
    });
    
    // call api update diem
    fetch(`api/thong-tin/giang-vien/cap-nhat-diem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "MASV": data.MASV,
        "NIENKHOA": nienKhoa,
        "HOCKI": hocKi,
        "MAMH": monHoc,
        "MAGV": maGv,
        "DIEMCC": diemCC,
        "DIEMGK": diemGK,
        "DIEMCK": diemCK
      })
    }).then(res => {
      if (res.status === 200) {
        handleClose();
      }
    }).catch(error => {
      console.error('Lỗi khi gọi API:', error);
    });
  }

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>{data.MASV} - {data.HO + ' ' + data.TEN}</h3>
          <button className="popup-close" onClick={handleClose}>× Đóng</button>
        </div>
        <table className="popup-table">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên thành phần</th>
              <th>Trọng số (%)</th>
              <th>Điểm thành phần</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Điểm chuyên cần</td>
              <td>10</td>
              <td><input className='input-custom' type='number' value={diemCC} onChange={(e) => setDiemCC(e.target.value)} /></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Điểm giữa kì</td>
              <td>30</td>
              <td><input className='input-custom' type='number' value={diemGK} onChange={(e) => setDiemGK(e.target.value)} /></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Điểm thi</td>
              <td>60</td>
              <td><input className='input-custom' type='number' value={diemCK} onChange={(e) => setDiemCK(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button className='btn-updatediem' onClick={handleClickLuuDiem}>Lưu</button>
      </div>
    </div>
  );
};

export default Popup;