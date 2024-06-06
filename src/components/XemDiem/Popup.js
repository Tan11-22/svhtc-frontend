import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, handleClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>{data.TENMH}</h3>
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
              <td>{data.DIEMCC}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Điểm giữa kì</td>
              <td>30</td>
              <td>{data.DIEMGK}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Điểm thi</td>
              <td>60</td>
              <td>{data.DIEMCK}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Popup;