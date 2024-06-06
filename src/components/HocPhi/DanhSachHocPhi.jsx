import React from 'react'
import '../Cart/Cart.css'
import '../Table/Table.css'
function DanhSachHocPhi() {
  return (
    <div>
      <div>
      <div className='cartFull-036'>
        <div className="cartBackground-036">
            <div className="titlepage"><p> Danh sách học phí</p></div>
                <div className='cart-1-036'>
                <div className="cart-1-right">
                       
                    </div>
                    <div className="cart-1-right">

                        <button>Xuất Excel</button>
                    </div>
                    </div>
               
                <div class="table-container-036">
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Niên Khóa</th>
                    <th>Học kì</th>
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
                    <td>Năm học 2022 - 2023</td>
                    <td>Học kì 1 </td>
                    <td>10,450,000</td>
                    <td>0</td>
                    <td>10,450,000</td>
                    <td>10,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Năm học 2022 - 2023</td>
                    <td>Học kì 2 </td>
                    <td>12,450,000</td>
                    <td>0</td>
                    <td>12,450,000</td>
                    <td>12,450,000</td>
                    <td>0</td>
                    </tr>
                    <tr className='trTongCong'>
                        <td className='thTong' colSpan={3}>
                            TỔNG CỘNG:
                        </td>
                        <td>22,900,000</td>
                        <td>0</td>
                        <td>22,900,000</td>
                        <td>22,900,000</td>
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

export default DanhSachHocPhi
