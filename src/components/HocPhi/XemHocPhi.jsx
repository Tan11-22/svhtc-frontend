import React from 'react'
import '../Form036/Cart/Cart.css'
import '../Form036/Table/Table.css'
function XemHocPhi() {
  return (
    <div>
      <div>
      <div className='cartFull'>
        <div className="cartBackground">
            <div className="titlepage"><p>Xem Học Phí</p></div>
                <div className="cart-1">
                    <div className="cart-1-left">
        
                        <select className="cart-1-select" name="hocKy">
                            <option value="all">Tổng hợp học phí tất cả các kỳ</option>
                            <option value="22-23H1">Học kỳ 1 năm học 2022 - 2023</option>
                            <option value="22-23H2">Học kỳ 2 năm học 2022 - 2023</option>
                        </select>
                    </div>
                    <div className="cart-1-right">
                    <button>In</button>

                
                        <button>Xuất Excel</button>
                    </div>
                </div>
               
                <div class="table-container">
                <label>Thu học phí</label>
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Niên Khóa Học Kỳ</th>
                    <th>Học phí chưa giảm</th>
                    <th>Miễn giảm</th>
                    <th>Phải thu</th>
                    <th>Đã thu</th>
                    <th>Còn nợ</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Học kỳ 1 năm học 2022 - 2023</td>
                    <td>10,450,000</td>
                    <td>0</td>
                    <td>10,450,000</td>
                    <td>10,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Học kỳ 2 năm học 2022 - 2023</td>
                    <td>12,450,000</td>
                    <td>0</td>
                    <td>12,450,000</td>
                    <td>12,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr>
                        <td className='tdTong'colSpan={2}>
                            Tổng
                        </td>
                        <td>22,900,000</td>
                        <td>0</td>
                        <td>22,900,000</td>
                        <td>22,900,000</td>
                        <td>0</td>
                    </tr>
                </tbody>
                
                </table>
                <label>Thu học phí học lại</label>
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Niên Khóa Học Kỳ</th>
                    <th>Học phí chưa giảm</th>
                    <th>Miễn giảm</th>
                    <th>Phải thu</th>
                    <th>Đã thu</th>
                    <th>Còn nợ</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Học kỳ 1 năm học 2022 - 2023</td>
                    <td>10,450,000</td>
                    <td>0</td>
                    <td>10,450,000</td>
                    <td>10,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Học kỳ 2 năm học 2022 - 2023</td>
                    <td>12,450,000</td>
                    <td>0</td>
                    <td>12,450,000</td>
                    <td>12,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr>
                        <td className='tdTong'colSpan={2}>
                            Tổng
                        </td>
                        <td>22,900,000</td>
                        <td>0</td>
                        <td>22,900,000</td>
                        <td>22,900,000</td>
                        <td>0</td>
                    </tr>
                    <tr className='trTongCong'>
                        <td className='tdTong' colSpan={2}>
                            TỔNG CỘNG
                        </td>
                        <td>45,800,000</td>
                        <td>0</td>
                        <td>45,800,000</td>
                        <td>45,800,000</td>
                        <td>0</td>
                    </tr>
                </tbody>
                
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default XemHocPhi
