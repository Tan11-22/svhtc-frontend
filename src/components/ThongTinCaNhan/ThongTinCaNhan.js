import './ThongTinCaNhan.css'
import Header from '../Header/Header'

export default function ThongTinCaNhan() {
    return (
        <div>
            <div className="content-wrapper">
                <Header />
                <div className="student-info-container">
                    <div className='content-1'>
                        <div className="student-info">
                            <h2>Thông tin sinh viên</h2>
                            <div className="info-row">
                                <div className="info-label">Mã SV</div>
                                <div className="info-value">N20DCCN073</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Họ và tên</div>
                                <div className="info-value">Phạm Đức Thắng</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Ngày sinh</div>
                                <div className="info-value">25/06/2002</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Giới tính</div>
                                <div className="info-value">Nam</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Điện thoại</div>
                                <div className="info-value">0975625496</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Số CMND/CCCD</div>
                                <div className="info-value">037020010947</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Email</div>
                                <div className="info-value">n20dccn073@student.ptithcm.edu.vn</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Nơi sinh</div>
                                <div className="info-value">Ninh Bình</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Dân tộc</div>
                                <div className="info-value">Kinh</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Tôn giáo</div>
                                <div className="info-value">Không</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Hiện diện</div>
                                <div className="info-value">Đang học</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Hộ khẩu</div>
                                <div className="info-value">Xã Khánh Hồng, Huyện Yên Khánh, Tỉnh Ninh Bình</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Đối tượng</div>
                                <div className="info-value"></div>
                            </div>
                        </div>
                    </div>
                    <div className="course-info">
                        <h2>Thông tin khóa học</h2>
                        <div className="info-row">
                            <div className="info-label">Lớp</div>
                            <div className="info-value">D20CQCNPM01-N</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Ngành</div>
                            <div className="info-value">Công nghệ phần mềm</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Chuyên ngành</div>
                            <div className="info-value">Công nghệ thông tin</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Khoa</div>
                            <div className="info-value">Công Nghệ Thông Tin 2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
