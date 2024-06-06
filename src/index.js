
import './index.css';


import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import HocPhi from './components/HocPhi/HocPhi';
import HomePage from './components/TrangChu/HomePage';
import Return from './components/HocPhi/ReturnPayment/Return';
import XemDiem from './components/XemDiem/XemDiem';
import ThongTinCaNhan from './components/ThongTinCaNhan/ThongTinCaNhan';
import NhapDiem from './components/NhapDiem/NhapDiem';
// import reportWebVitals from './reportWebVitals';
import MonHoc from './pages/MonHoc/MonHoc';
import Lop from './pages/Lop/Lop';
import DangKyLTC from './pages/DangKyLTC/DangKyLTC';

export default function SVHTC() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
        <Route index element={<HomePage />} />
          <Route path="hoc-phi" element={<HocPhi />} />
          <Route path="xem-diem" element={<XemDiem />} />
          <Route path="return-payment" element={<Return />} />
          <Route path="thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
          <Route path="nhap-diem" element={<NhapDiem />} />
          <Route path="login" element={<Login/>} />
          <Route path="mon-hoc" element={<MonHoc/>} />
          <Route path="lop-hoc" element={<Lop/>} />
          <Route path="dang-ky-lop" element={<DangKyLTC/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SVHTC />);
