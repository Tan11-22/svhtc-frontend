import logo from '../Logo/ptit.png'
export default function XemDiem (){
    return (
        <div className="content-wrapper">
            <div className="content">
                <div className='logo-container'>
                    <img className='responsive-logo' src={logo} alt="Logo" />
                </div>
                <div className="horizontal-line">
                    <h3 className='header-name'>Học viện công nghệ Bưu chính viễn thông - Cơ sở tại Thành Phố Hồ Chí Minh</h3>
                    <button className="login-button">Đăng nhập</button>
                </div>
            </div>
        </div>
    );
}