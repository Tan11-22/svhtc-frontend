import './ThongTinCaNhan.css'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import NavbarMenu from '../NavBarMenu/NavBarMenu';
import { menuItemsSV } from '../../components/NavBarMenu/menu';
import { useNavigate } from 'react-router-dom';
export default function ThongTinCaNhan() {
    const navigate = useNavigate();
    console.log("abccccc");
    const [informationStudent, setInformationStudent] = useState();
    const [srcImg, setSrcImg] = useState();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        if(localStorage.getItem('role') === "GIANGVIEN") {
            navigate("/")
        }
        fetch(`api/thong-tin/sinh-vien/thong-tin-ca-nhan?ma-sv=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setInformationStudent(data);
                    // console.log(data.HINHANH);
                    fetch(`api/thong-tin/sinh-vien/get-img?name=${data.HINHANH}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }).then(res => {
                        if (res.status === 200) {
                            res.blob().then(blob => {
                                // Tạo URL từ blob
                                const imgUrl = URL.createObjectURL(blob);
                                setSrcImg(imgUrl);
                                console.log(imgUrl);
                            })
                        }
                    }).catch(error => {
                        console.error('Lỗi khi gọi API:', error);
                    });
                })
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });


    }, [token, username])
    console.log("Check role ",localStorage.getItem('role'))

    return (
        <div>
            <div className="content-wrapper">
                <Header />
                <NavbarMenu menuItems={menuItemsSV} />
                <div className="student-info-container">
                    <div className="student-info">
                        <div className='info'>
                            <h2>Thông tin sinh viên</h2>
                            <div className="info-row">
                                <div className="info-label">Mã SV</div>
                                <div className="info-value">{informationStudent ? informationStudent.MASV : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Họ và tên</div>
                                <div className="info-value">{informationStudent ? informationStudent.HOTEN : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Ngày sinh</div>
                                <div className="info-value">{informationStudent ? informationStudent.NGAYSINH : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Giới tính</div>
                                <div className="info-value">{informationStudent ? (informationStudent.PHAI ? "Nữ" : "Nam") : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Điện thoại</div>
                                <div className="info-value">{informationStudent ? informationStudent.SDT : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Email</div>
                                <div className="info-value">{informationStudent ? informationStudent.EMAIL : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Hiện diện</div>
                                <div className="info-value">{informationStudent ? (informationStudent.DANGHIHOC ? "Đã nghỉ" : "Đang học") : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Hộ khẩu</div>
                                <div className="info-value">{informationStudent ? informationStudent.DIACHI : ''}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Đối tượng</div>
                                <div className="info-value"></div>
                            </div>
                        </div>
                        <div className="student-image-container">
                            <img src={srcImg} alt="Ảnh sinh viên" className="student-image" />
                        </div>
                    </div>
                    <div className="course-info">
                        <h2>Thông tin khóa học</h2>
                        <div className="info-row">
                            <div className="info-label">Lớp</div>
                            <div className="info-value">{informationStudent ? informationStudent.MALOP : ''}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Ngành</div>
                            <div className="info-value">{informationStudent ? informationStudent.TENNGANH : ''}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Khoa</div>
                            <div className="info-value">{informationStudent ? informationStudent.TENKHOA : ''}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Bậc hệ đào tạo</div>
                            <div className="info-value">{informationStudent ? informationStudent.TENHE : ''}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Niên khóa</div>
                            <div className="info-value">{informationStudent ? informationStudent.KHOAHOC : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
