import './NhapDiem.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import StudentTable from './StudentTable';
import { menuItemsGV } from '../../components/NavBarMenu/menu';
import NavbarMenu from '../NavBarMenu/NavBarMenu';
import { useNavigate } from 'react-router-dom';
export default function NhapDiem() {
    const navigate = useNavigate();
    const [dataLtcTheoGv, setDataLtcTheoGv] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedGroup, setSelectedGroup] = useState();
    const [listDiemSinhVienLtc, setListDiemSinhVienLtc] = useState([]);

    // State cho các danh sách lọc
    const [filteredHocKiList, setFilteredHocKiList] = useState([]);
    const [filteredMonHocList, setFilteredMonHocList] = useState([]);
    const [filteredNhomList, setFilteredNhomList] = useState([]);

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        if(localStorage.getItem('role') === "SINHVIEN") {
            navigate("/")
        }
    
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
                    setSelectedGroup(data[0].NHOM);
                    console.log(data);
                })
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
    }, [username, token]);

    // Lọc danh sách năm học
    const nienKhoaList = [...new Set(dataLtcTheoGv.map(item => item.NIENKHOA))];

    // Cập nhật danh sách học kỳ khi selectedYear thay đổi
    useEffect(() => {
        if (selectedYear) {
            const hocKiList = [...new Set(dataLtcTheoGv.filter(item => item.NIENKHOA === selectedYear).map(item => item.HOCKI))];
            setFilteredHocKiList(hocKiList);
            if (!hocKiList.includes(selectedSemester)) {
                setSelectedSemester(hocKiList[0]);
            }
        }
    }, [selectedYear]);

    // Cập nhật danh sách môn học khi selectedYear hoặc selectedSemester thay đổi
    useEffect(() => {
        if (selectedYear && selectedSemester) {
            const monHocList = [...new Map(
                dataLtcTheoGv
                    .filter(item => item.NIENKHOA === selectedYear && item.HOCKI === selectedSemester)
                    .map(item => [item.MAMH, item])
            ).values()];
            setFilteredMonHocList(monHocList);
            if (!monHocList.find(item => item.MAMH === selectedSubject)) {
                setSelectedSubject(monHocList[0]?.MAMH || '');
            }
        }
    }, [selectedYear, selectedSemester]);

    // Cập nhật danh sách nhóm khi selectedYear, selectedSemester hoặc selectedSubject thay đổi
    useEffect(() => {
        if (selectedYear && selectedSemester && selectedSubject) {
            const nhomList = [...new Map(
                dataLtcTheoGv
                    .filter(item => item.NIENKHOA === selectedYear && item.HOCKI === selectedSemester && item.MAMH === selectedSubject)
                    .map(item => [item.NHOM, item])
            ).values()];
            setFilteredNhomList(nhomList);
            if (!nhomList.find(item => item.NHOM === selectedGroup)) {
                setSelectedGroup(nhomList[0]?.NHOM || 0);
            }
        }
    }, [selectedYear, selectedSemester, selectedSubject]);

    const handelCLickTaiDanhSachSinhVien = () => {
        let maLtcSelected = '';
        for (let i = 0; i < dataLtcTheoGv.length; i++) {
            if (dataLtcTheoGv[i].NIENKHOA === selectedYear && dataLtcTheoGv[i].HOCKI === selectedSemester 
                && dataLtcTheoGv[i].MAMH === selectedSubject && parseInt(dataLtcTheoGv[i].NHOM) === parseInt(selectedGroup) ) {
                maLtcSelected = dataLtcTheoGv[i].MALTC;
                break;
            }
        }
        console.log("maltc" + maLtcSelected);
        fetch(`api/thong-tin/giang-vien/danh-sach-sinh-vien-ltc?ma-ltc=${maLtcSelected}&nien-khoa=${selectedYear}&hoc-ki=${selectedSemester}&ma-mh=${selectedSubject}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setListDiemSinhVienLtc(data);
                    console.log(data);
                })
            } else if (res.status === 204) {
                setListDiemSinhVienLtc([]);
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
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
            <NavbarMenu menuItems={menuItemsGV} />
            <div className="container-wrapper-nhapdiem">
                <div className='container-nhapdiem'>
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="school-year">Năm học: </label>
                        <select className='select-nhapdiem'
                            id="school-year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {nienKhoaList.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="semester">Học kì: </label>
                        <select
                            className='select-nhapdiem'
                            id="semester"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
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
                    <div className='div-nhapdiem'>
                        <label className='label-nhapdiem' htmlFor="group">Nhóm: </label>
                        <select
                            className='select-nhapdiem'
                            id="group"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
                        >
                            {filteredNhomList.map((group, index) => (
                                <option key={index} value={group.NHOM}>{group.NHOM}</option>
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
