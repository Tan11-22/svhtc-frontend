import { useEffect, useState } from 'react';
import './Return.css';
import { useNavigate } from 'react-router-dom';
export default function Return() {
    const navigate = useNavigate();
    // State để lưu trữ giá trị từ URL
    const [urlParams, setUrlParams] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(localStorage.getItem('role') === "GIANGVIEN") {
            navigate("/")
        }
        // Lấy URL hiện tại khi component được render lần đầu tiên
        const params = new URLSearchParams(window.location.search);
        setUrlParams(params);
    }, []); // Chỉ chạy một lần khi component được render lần đầu tiên
    // Nếu urlParams chưa được thiết lập, không render gì cả
    if (!urlParams) {
        return;
    }

    // Lấy giá trị của từng tham số từ URL
    const vnp_Amount = urlParams.get('vnp_Amount');
    const vnp_BankCode = urlParams.get('vnp_BankCode');
    const vnp_CardType = urlParams.get('vnp_CardType');
    const vnp_OrderInfo = urlParams.get('vnp_OrderInfo');
    const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
    const vnp_TxnRef = urlParams.get('vnp_TxnRef');
    const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
    
    if (vnp_ResponseCode === "00" && urlParams) {
        const hocKi = vnp_OrderInfo.substring(28, 29);
        const namHoc = vnp_OrderInfo.substring(40, vnp_OrderInfo.length - 1);
        const maSV = vnp_TxnRef.substring(8);
        console.log(maSV);
        console.log(hocKi);
        console.log(namHoc);
        // call api update status hocphi
        fetch(`/api/thanh-toan/cap-nhat-trang-thai-hoc-phi`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "maSV": maSV,
                "nienKhoa": namHoc,
                "hocKi": hocKi
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Xử lý phản hồi ở đây nếu cần
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const amount = parseInt(vnp_Amount) / 100;

    // Định dạng số tiền thành chuỗi có định dạng tiền tệ VND
    const formattedAmount = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    const handelClickTrangChu = () => {
        window.location.href = "/";
    }
    console.log("render");
    
    return (
        <div>
            <div className='content-return-title'>
                <h1>VNPAY RETURN</h1>
            </div>
            <div className='content-return-content'>
                <h3>Thành tiền: {formattedAmount}</h3>
                <h3>Nội dung thanh toán: {vnp_OrderInfo}</h3>
                <h3>Ngân hàng giao dịch: {vnp_BankCode}</h3>
                <h3>Mã giao dịch: {vnp_TransactionNo}</h3>
                <h3>Loại giao dịch: {vnp_CardType}</h3>
                <h3>Trạng thái giao dịch: {vnp_ResponseCode === "00" ? "Thành công" : "Thất bại"}</h3>
                <button className='btn-return-trang-chu' onClick={handelClickTrangChu}>Trang chủ</button>
            </div>
        </div>
    );
}
