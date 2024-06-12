import { useEffect, useRef, useState } from 'react';
import logo from '../Logo/logoptithcm.png'
import './HocPhi.css'
export default function HocPhi() {
    // console.log("abc");
    const [maSv, setMaSv] = useState('');
    const [maXacNhan, setMaXacNhan] = useState('');
    const [fillMaSv, setFillMaSv] = useState(true);
    const [fillMaXN, setFillMaXN] = useState(true);
    const [contentHocPhi, setContentHocPhi] = useState(true);

    const [captchaText, setCaptchaText] = useState('');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor
            (Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,

                // Randomize Y position slightly 
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };


    function createPayment(nienKhoa, hocKi, Amount, maSV) {
        fetch(`api/thanh-toan/payment/create-payment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nienKhoa": nienKhoa,
                "hocKi": hocKi,
                "amount": Amount,
                "maSV": maSV
            })
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    console.log(data.url);
                    // window.location.href = data.url;
                })
            }
        }).catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
    }
    const handlePayment = () => {
        // Cập nhật trạng thái fillMaSv và fillMaXN
        setFillMaSv(maSv !== '');
        setFillMaXN(maXacNhan !== '');

        // Kiểm tra nếu mã xác nhận khớp với code
        if (maXacNhan === captchaText) {
            // alert('Success'); 
            console.log("ok");
            callAPIThongTinHocPhi();
        } else {
            // alert('Incorrect'); 
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            initializeCaptcha(ctx);
            console.log("fail");
            console.log(ctx);
            setContentHocPhi(true);
        }
    }
    const callAPIThongTinHocPhi = () => {


        fetch(`api/thanh-toan/thong-tin-hoc-phi?ma-sv=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        console.log(data[0].masv); // data from api
                        console.log(data[0].hocki); // data from api
                        console.log(data[0].nienkhoa); // data from api
                        console.log(data[0].sotien); // data from api
                        setContentHocPhi(true);
                        // call api create payment
                        createPayment(data[0].nienkhoa, data[0].hocki, data[0].sotien, data[0].masv);
                    }).catch(error => {
                        console.error('Lỗi khi lấy dữ liệu JSON:', error);
                    });
                } else if (res.status === 204) { // no data
                    console.log("no content");
                    setContentHocPhi(false);
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    initializeCaptcha(ctx);
                    // generateCode();
                } else if (res.status === 503) {
                    setContentHocPhi(false);
                }
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }


    return (
        <div className="content-wrapper-hocphi">
            <div className="content-hocphi">
                <img className="responsive-logo-hocphi" src={logo} alt='logo' />
                <h3 className="title-pay01">CỔNG THANH TOÁN HỌC PHÍ VÀ CÁC KHOẢN THU KHÁC PTITHCM - VNPAY</h3>
                <h3 className='title-information01'>Thông tin sinh viên</h3>
                <h3 className='title-sinhvien01'>Mã sinh viên (*)</h3>
                <input className='input-masv01' type='text' defaultValue={maSv} onChange={e => setMaSv(e.target.value)} />
                <h3 className='title-sinhvien01'>Mã xác nhận (*)</h3>
                <input className='input-masv01' type='text' defaultValue={maXacNhan} onChange={e => setMaXacNhan(e.target.value)} />
                <div>
                    <canvas ref={canvasRef} width={200} height={50}></canvas>
                </div>
                <div className='parent-btn-thanhtoan01'>
                    <button className='btn-thanhtoan01' onClick={handlePayment}>Thanh toán</button>
                </div>
                {!fillMaSv && <h3 className='notificationMa01'>Vui lòng nhập mã sinh viên</h3>}
                {!fillMaXN && fillMaSv && <h3 className='notificationMa01'>Vui lòng nhập mã xác nhận</h3>}
                {!contentHocPhi && fillMaSv && fillMaXN && <h3 className='notificationMa01'>Không có thông tin</h3>}
                <div className='footer-information01'>
                    <p className="h6 text-info01">Cơ sở Quận 1: 11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>
                    <p className="h6 text-info01">Cơ sở Quận 9: Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                    <p className="h6 text-info01">Email: hvbcvthcm@ptithcm.edu.vn</p>
                    <p className="h6 text-info01">Điện thoại: (028) 38.295.258</p>
                    <p className="h6 text-info01">Fax: (028) 39.105.51</p>
                </div>
            </div>
        </div>
    );
}