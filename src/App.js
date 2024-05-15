import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HocPhi from './components/HocPhi/HocPhi';
import HomePage from './components/TrangChu/HomePage';
import Return from './components/HocPhi/ReturnPayment/Return';
import XemDiem from './components/XemDiem/XemDiem';
import ThongTinCaNhan from './components/ThongTinCaNhan/ThongTinCaNhan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hoc-phi" element={<HocPhi />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/xem-diem" element={<XemDiem />} />
        <Route path="/return-payment" element={<Return />} />
        <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhan/>} />
      </Routes>
    </Router>
  );
}

export default App;
