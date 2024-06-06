import React, { useState } from 'react';
import './GradeTable.css';
import fail from '../Logo/fail.png';
import pass from '../Logo/pass.png';
import detail from '../Logo/detail.png';
import Popup from './Popup';
const GradeTable = ({ data, summary }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    console.log("abc");

    const togglePopup = (item) => {
        setCurrentItem(item);
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="grade-table-container">
            <h2>Học kì: {data[0].HOCKI} - Năm học: {data[0].NIENKHOA}</h2>
            <table className="grade-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã học phần</th>
                        <th>Tên học phần</th>
                        <th>Số tín chỉ</th>
                        <th>Điểm Thi</th>
                        <th>Điểm TK(10)</th>
                        <th>Điểm TK(4)</th>
                        <th>Điểm TK(C)</th>
                        <th>Kết quả</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.MAMH}</td>
                            <td>{item.TENMH}</td>
                            <td>{item.SOTINCHI}</td>
                            <td>{item.DIEMCK}</td>
                            <td>{item.DIEMTK10}</td>
                            <td>{item.DIEMTK4}</td>
                            <td>{item.DIEMTKC}</td>
                            <td><img src={item.KETQUA ? pass : fail} alt='fail' className='img-fp' /></td>
                            <td>
                                <img src={detail} alt='fail' className='img-detail' onClick={() => togglePopup(item)} />
                                {currentItem && <Popup isOpen={isPopupOpen} handleClose={() => setPopupOpen(false)} data={currentItem} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="summary" >
                <div className="summary-column">
                    <p>- Điểm trung bình học kỳ hệ 4: {summary?.[3]}</p>
                    <p>- Điểm trung bình học kỳ hệ 10: {summary?.[2]}</p>
                </div>
                <div className="summary-column">
                    <p>- Tổng số tín chỉ đăng kí: {summary?.[1]}</p>
                    <p>- Số tín chỉ đạt: {summary?.[0]}</p>
                    <p>- Số tín không chỉ đạt: {summary?.[1] - summary?.[0]}</p>
                </div>
            </div>

        </div>
    );
};

export default GradeTable;