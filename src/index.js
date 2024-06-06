import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HocPhi from './components/HocPhi/HocPhi';
import HomePage from './components/TrangChu/HomePage';
import Return from './components/HocPhi/ReturnPayment/Return';
import XemDiem from './components/XemDiem/XemDiem';
import ThongTinCaNhan from './components/ThongTinCaNhan/ThongTinCaNhan';
import NhapDiem from './components/NhapDiem/NhapDiem';


export default function SVHTC() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="hoc-phi" element={<HocPhi />} />
          <Route path="xem-diem" element={<XemDiem />} />
          <Route path="return-payment" element={<Return />} />
          <Route path="thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
          <Route path="nhap-diem" element={<NhapDiem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SVHTC />);