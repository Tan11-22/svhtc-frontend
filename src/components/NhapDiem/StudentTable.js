import './StudentTable.css'
import edit from '../Logo/edit.png'
import fail from '../Logo/fail.png';
import pass from '../Logo/pass.png';
import { useState } from 'react';
import Popup from './Popup';
const StudentTable = ({ data, nienKhoa, hocKi, monHoc, maGv, updateStudentData }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const togglePopup = (item) => {
        setCurrentItem(item);
        setPopupOpen(!isPopupOpen);
    };
    return (
        <div className="grade-table-container">
            <table className="grade-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Điểm CC</th>
                        <th>Điểm GK</th>
                        <th>Điểm CK</th>
                        <th>Điểm TK</th>
                        <th>Kết quả</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.MASV}</td>
                            <td>{item.HO}</td>
                            <td>{item.TEN}</td>
                            <td>{item.DIEMCC}</td>
                            <td>{item.DIEMGK}</td>
                            <td>{item.DIEMCK}</td>
                            <td>{item.DIEMTK}</td>
                            <td><img src={item.KETQUA ? pass : fail} alt='fail' className='img-fp' /></td>
                            <td>
                                <img src={edit} alt='fail' className='img-detail' onClick={() => togglePopup(item)} />
                                {currentItem && <Popup isOpen={isPopupOpen} handleClose={() => setPopupOpen(false)}
                                    data={currentItem} nienKhoa={nienKhoa} hocKi={hocKi} monHoc={monHoc} maGv={maGv} updateStudentData={updateStudentData} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;