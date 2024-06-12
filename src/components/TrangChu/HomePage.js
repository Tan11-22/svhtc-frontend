import Header from '../Header/Header';
import './HomePage.css'
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import { useEffect, useState } from 'react';
import  {menuItemsSV, menuItemsGV}  from '../../components/NavBarMenu/menu';

export default function HomePage() {
   const [menuItems, setMenuItem] = useState([]);
   useEffect(() => {
    
    const role = localStorage.getItem("role")
    if(role === "GIANGVIEN"){
        setMenuItem(menuItemsGV)
    } else if(role === "SINHVIEN") {setMenuItem(menuItemsSV)} else setMenuItem([]);
   }, [])
    return (
        <div className="content-wrapper">
            <Header/>
            <NavBarMenu menuItems={menuItems}/>
            <div class='content-1'>
                <div class="ad-img-wrapper">
                    <img class='responsive-img' src="https://portal.ptit.edu.vn/wp-content/uploads/2021/11/banner-web-triet-ly-giao-d%E1%BB%A5c.jpg" alt="Slide 2" />
                    <img src="https://portal.ptit.edu.vn/wp-content/uploads/2022/08/baner_tuyendung.jpg" class="ad-img" alt='portal' style={{ paddingTop: '10px' }} />
                </div>
            </div>
            <div className='content-2'>
                <div className="bottom-content">
                    <div className="map-wrapper">
                        <iframe className="map" title="Google Map" alt='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.52007250284!2d106.78447601524122!3d10.84799226083387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCQ1ZUIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1677998605485!5m2!1svi!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='map-wrapper'>
                        <img className="map" src="https://portal.ptit.edu.vn/wp-content/uploads/2022/06/VNPT1.png" alt='portal' />
                    </div>
                </div>

                <div className="logo-meaning-wrapper01">
                    <div className="logo-meaning01">
                        <h2 className="logo-meaning-title01">Ý NGHĨA LOGO HỌC VIỆN</h2>
                        <img className="logo-meaning-img01" src="https://portal.ptit.edu.vn/wp-content/uploads/2016/06/ptitlogo72.gif" alt='portal' />
                    </div>
                    <div className="text-meaning01">
                        <h3 className="text-meaning-title01">Hình khối của logo</h3>
                        <p className="text-meaning-content01">Logo của Học viện thể hiện hình ảnh cô đọng nhất về Học viện. Khối Logo của Học viện bao gồm hình tròn và hình vuông. Theo quan niệm Á Đông, hình tròn tượng trưng cho sự sinh tồn vĩnh cửu của tự nhiên, nói lên sự đầy đủ, thịnh vượng và phát triển. Cũng theo ý nghĩa triết học Phương Đông, logo Học viện thể hiện mối quan hệ cơ bản: Thiên (tròn) – Địa (vuông) – Nhân (Học viện); trong đó Học viện là trung tâm. Cấu trúc logo mở thể hiện Học viện gắn liền với thực tiễn, với xã hội và luôn phát triển không ngừng.</p>
                        <p className="text-meaning-content01">Ba vòng tròn quyện vào nhau và chuyển hóa sang nhau thể hiện 3 gắn kết: Đào tạo – Nghiên cứu – Sản xuất Kinh doanh.</p>
                        <p className="text-meaning-content01">Hình ảnh quyển sách mở rộng và mô hình cấu trúc nguyên tử: biểu tượng 2 hoạt động chính của Học viện là đào tạo và nghiên cứu</p>
                        <p className="text-meaning-content01">Chữ PTIT (tên viết tắt tiếng Anh của Học viện – Posts & Telecoms Institute of Technology) đồng thời là Bưu chính (P), Viễn thông (T) và Công nghệ thông tin (IT) – 3 lĩnh vực nghiên cứu và đào tạo của Học viện</p>
                        <h3 className="text-meaning-title01">Màu sắc logo</h3>
                        <p className="text-meaning-content01">Logo Học viện lấy màu đỏ làm chủ đạo và ngôi sao vàng biểu trưng cho cờ Tổ quốc Việt Nam.</p>
                    </div>
                </div>


                <div className="more-info01">
                    <h3 className="info-title01">HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</h3>
                    <div className="info-wrapper01">
                        <ul className="info-option01">
                            <li className="info-item01">
                                <p className="info-text">Trụ sở chính:</p>
                                <p className="info-text">122 Hoàng Quốc Việt, Q.Cầu Giấy, Hà Nội.</p>
                            </li>
                            <li className="info-item01">
                                <p className="info-text">Cơ sở đào tạo tại Hà Nội:</p>
                                <p className="info-text">Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội</p>
                            </li>
                        </ul>
                        <ul className="info-option01">
                            <li className="info-item01">
                                <p className="info-text">Học viện cơ sở tại TP. Hồ Chí Minh:</p>
                                <p className="info-text">11 Nguyễn Đình Chiểu, P. Đa Kao, Q.1 TP Hồ Chí Minh</p>
                            </li>
                            <li className="info-item01">
                                <p className="info-text">Cơ sở đào tạo tại TP Hồ Chí Minh:</p>
                                <p className="info-text">Đường Man Thiện, P. Hiệp Phú, Q.9 TP Hồ Chí Minh</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}