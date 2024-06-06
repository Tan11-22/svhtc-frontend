import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import MonHoc from './pages/MonHoc/MonHoc';
import Lop from './pages/Lop/Lop';
import DangKyLTC from './pages/DangKyLTC/DangKyLTC';

export default function SVHTC() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
         
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
root.render(
  <SVHTC/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
