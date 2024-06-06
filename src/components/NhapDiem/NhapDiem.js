import './NhapDiem.css'
import { useEffect, useState } from 'react';
import Header from '../Header/Header'
import StudentTable from './StudentTable';
export default function NhapDiem() {
    const [dataLtcTheoGv, setDataLtcTheoGv] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [listDiemSinhVienLtc, setListDiemSinhVienLtc] = useState([]);

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetch(`api/thong-tin/giang-vien/danh-sach-ltc?ma-gv=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setDataLtcTheoGv(data);
                    setSelectedYear(data[0].NIENKHOA);
                    setSelectedSemester(data[0].HOCKI);
                    setSelectedSubject(data[0].MAMH);
                })
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
    }, [username, token]) // khi nào mã gv thay đổi thì api đc call lại
    // Lọc ds năm học
    const nienKhoaList = [...new Set(dataLtcTheoGv.map(item => item.NIENKHOA))];


    // Lọc ds học kì dựa trên học kì
    const filteredHocKiList = [...new Set(dataLtcTheoGv.filter(item => item.NIENKHOA === selectedYear).map(item => item.HOCKI))];


    //Lọc ds môn học dựa trên năm học và học kì
    // Lọc danh sách môn học dựa trên năm học và học kỳ, loại bỏ các mục trùng lặp
    const filteredMonHocList = [...new Map(
        dataLtcTheoGv
            .filter(item => item.NIENKHOA === selectedYear && item.HOCKI === selectedSemester)
            .map(item => [item.MAMH, item])
    ).values()];

    const handelCLickTaiDanhSachSinhVien = () => {
        var maLtcSelected = '';
        for (let i = 0; i < dataLtcTheoGv.length; i++) {
            if (dataLtcTheoGv[i].NIENKHOA === selectedYear && dataLtcTheoGv[i].HOCKI === selectedSemester && dataLtcTheoGv[i].MAMH === selectedSubject) {
                console.log(dataLtcTheoGv[i].MALTC);
                maLtcSelected = dataLtcTheoGv[i].MALTC;
                break;
            }
        }

        // call api
        fetch(`api/thong-tin/giang-vien/danh-sach-sinh-vien-ltc?ma-ltc=${maLtcSelected}&nien-khoa=${selectedYear}&hoc-ki=${selectedSemester}&ma-mh=${selectedSubject}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        }).then(res => {
            console.log(res.status);
            if (res.status === 200) {
                res.json().then(data => {
                    setListDiemSinhVienLtc(data);
                    console.log(data);
                })
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
        // console.log(listSinhVienLtc);
    }

    const updateStudentData = (updatedStudent) => {
        setListDiemSinhVienLtc((prevData) =>
            prevData.map((student) =>
                student.MASV === updatedStudent.MASV ? updatedStudent : student
            )
        );
    };


    return (
        <div>
            <Header />
            <div className="container-wrapper-nhapdiem">
                <div className='container-nhapdiem'>
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="school-year">Năm học: </label>
                        <select className='select-nhapdiem'
                            id="school-year"
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                                // Đặt lại học kỳ về giá trị đầu tiên khi thay đổi năm học
                                const firstSemester = dataLtcTheoGv.find(item => item.NIENKHOA === e.target.value).HOCKI;
                                setSelectedSemester(firstSemester);
                                // Đặt lại môn học về giá trị đầu tiên khi thay đổi học kì
                                const firstSubject = dataLtcTheoGv.find(item => (item.NIENKHOA === e.target.value && item.HOCKI === firstSemester)).MAMH;
                                setSelectedSubject(firstSubject);
                            }}
                        >
                            {nienKhoaList.map((year, index) => (
                                <option  key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="semester">Học kì: </label>
                        <select
                            className='select-nhapdiem'
                            id="semester"
                            value={selectedSemester}
                            onChange={(e) => {
                                setSelectedSemester(parseInt(e.target.value));
                            }}
                        >
                            {filteredHocKiList.map((semester, index) => (
                                <option key={index} value={semester}>Học kì {semester}</option>
                            ))}
                        </select>
                    </div>
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="subject">Môn học: </label>
                        <select
                        className='select-nhapdiem'
                            id="subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            {filteredMonHocList.map((subject, index) => (
                                <option key={index} value={subject.MAMH}>{subject.TENMH}</option>
                            ))}
                        </select>
                    </div>
                    <button className='btn-taidssinhvien-nhapdiem' onClick={handelCLickTaiDanhSachSinhVien}>Tải danh sách sinh viên</button>
                </div>
            </div>
            <StudentTable data={listDiemSinhVienLtc} nienKhoa={selectedYear} hocKi={selectedSemester} monHoc={selectedSubject} maGv={username} updateStudentData={updateStudentData} />
        </div>
    );
}