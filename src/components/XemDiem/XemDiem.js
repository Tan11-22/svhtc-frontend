import './XemDiem.css'
import GradeTable from './GradeTable';
import Header from '../Header/Header'
import { useEffect, useState } from 'react';
export default function XemDiem() {
  const [listDiem, setListDiem] = useState([]);
  const [thongKetDiem, setThongKeDiem] = useState([]);
  useEffect(() => {
    fetch(`api/thong-tin/sinh-vien/xem-diem?ma-sv=N15DCCN002`, {
      method: 'GET'
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setListDiem(data);
          // console.log(data);
        })
      } else if(res.status === 204){ // no content
        setListDiem([]);
      }
    }).catch(error => {
      console.error('Lỗi khi gọi API:', error);
    });
  }, [])

  useEffect(() => {
    if (listDiem.length > 0) {
      thongKe(listDiem);
    }
  }, [listDiem]);

  const thongKe = (data) => {
    let listTmp = [];
    for (let j = 0; j < data.length; j++) {
      let stcDatTmp = 0, tongSoTcTmp = 0, diemTk10Tmp = 0, diemTk4Tmp = 0;
      let course = data[j];
      for (let i = 0; i < course.length; i++) {
        const item = course[i];
        tongSoTcTmp += item.SOTINCHI;

        if (item.KETQUA) {
          stcDatTmp += item.SOTINCHI;
        }

        diemTk10Tmp += item.DIEMTK10 || 0;
        diemTk4Tmp += item.DIEMTK4 || 0;
      }
      let thongKeDiemTmp = [];
      thongKeDiemTmp.push(stcDatTmp);
      thongKeDiemTmp.push(tongSoTcTmp);
      thongKeDiemTmp.push(course.length > 0 ? (diemTk10Tmp / course.length).toFixed(2) : 0);
      thongKeDiemTmp.push(course.length > 0 ? (diemTk4Tmp / course.length).toFixed(2) : 0);
      listTmp.push(thongKeDiemTmp);
    }
    setThongKeDiem(listTmp);
  }
  console.log(thongKetDiem);

  return (
    <div className="grade-table-list">
      <Header />
      {listDiem.map((listDiem, index) => (
        <GradeTable
          key={index}
          data={listDiem}
          summary={thongKetDiem[index]}
        />
        
      ))}
    </div>
  );
}