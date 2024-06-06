import React, { useEffect, useState } from 'react';
import iconPtit from '../../assets/Logo_PTIT_University.png';
import { getDanhSachKhoa, getDanhSachGiangVien, addGiangVien,updateGiangVien,DeleteGiangVien ,fetchImage} from '../API036/apiGiangVien.js';
import '../Form036/Cart/Cart.css';
import '../Form036/Table/Table.css';
import userIcon from '../../assets/user.png';
import '../Form036/Modal/Modal.css';
import Header from '../Header/Header.jsx';
import NavBarMenu from '../NavBarMenu/NavBarMenu.jsx'
import { handleOpenDialog, handleCloseDialog, previewImage ,useForm } from '../Form036/Modal/Modal.js';
import Footer from '../../components/Footer/Footer';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
function QuanTriGiangVien() {
  
  const [khoaList, setKhoaList] = useState([]);
  const [selectedKhoa, setSelectedKhoa] = useState('');
  const [GVList, setGVList] = useState([]);
  const [selectedGV, setSelectedGV] = useState(null);
  const [avatarAdd, setAvatarAdd] = useState(null);
  const [GVImages, setGVImages] = useState([]); 
  const initialFormValues = {
    makhoa: '',
    magv: '',
    ho: '',
    ten: '',
    hocham: '',
    hocvi: '',
    chuyenmon: '',
    hinhanh: '',
    sdt: '',
    email: '',
  };

  const { values, handleChange, setFormValues, resetForm } = useForm(initialFormValues);

  useEffect(() => {
    const fetchKhoaList = async () => {
      try {
        const data = await getDanhSachKhoa();
        const trimmedData = data.map(khoa => khoa.trim());
        setKhoaList(trimmedData);
        if (trimmedData.length > 0) {
          setSelectedKhoa(trimmedData[0]);
        }
      } catch (error) {
        console.error('Error fetching the list of Khoa:', error);
      }
    };

    fetchKhoaList();
  }, []);

  const handleKhoaChange = (e) => {
    const selectedValue = e.target.value.trim();
    setSelectedKhoa(selectedValue);
  };

  useEffect(() => {
    if (selectedKhoa) {
      const fetchGVs = async () => {
        try {
          const data = await getDanhSachGiangVien(selectedKhoa);
          setGVList(data);
        } catch (error) {
          console.error('Error fetching giangviens:', error);
        }
      };

      fetchGVs();
    }
  }, [selectedKhoa]);

  const handleEditButtonClick = async(gv) => {
    setSelectedGV(gv);
    setFormValues({
      makhoa: gv.makhoa,
      magv: gv.magv,
      ho: gv.ho,
      ten: gv.ten,
      hocham: gv.hocham,
      hocvi: gv.hocvi,
      chuyenmon: gv.chuyenmon,
      hinhanh: gv.hinhanh,
      sdt: gv.sdt,
      email: gv.email,
    });
      if(String(gv.hinhanh))
        {
          try {
            const imageUrl = await fetchImage(String(gv.hinhanh));

            setAvatarAdd(imageUrl);
          } catch (error) {
            console.error('Error fetching student image:', error);
            setAvatarAdd(null); // Sử dụng URL tĩnh cho ảnh mặc định
          }
        }
      else
      {
        setAvatarAdd(null); // Sử dụng URL tĩnh cho ảnh mặc định
      }

    handleOpenDialog('GVDialog');
  };
  
  
  const handleDeleteButtonClick = (gv) => {
    setSelectedGV(gv);
    setFormValues({
      makhoa: gv.makhoa,
      magv: gv.magv,
      ho: gv.ho,
      ten: gv.ten,
      hocham: gv.hocham,
      hocvi: gv.hocvi,
      chuyenmon: gv.chuyenmon,
      hinhanh: gv.hinhanh,
      sdt: gv.sdt,
      email: gv.email,
    });
    handleOpenDialog('deleteDialog');
  }
  const handleAddButtonClick = () => {
    setSelectedGV(null);
    resetForm(); // Đặt lại giá trị form về trạng thái ban đầu
    setFormValues({
      makhoa: selectedKhoa,
      magv: '',
      ho: '',
      ten: '',
      hocham: 'Không',
      hocvi: 'Cử nhân',
      chuyenmon: '',
      hinhanh: '',
      sdt: '',
      email: '',
    });
    setAvatarAdd(null);
    handleOpenDialog('GVDialog');
  };

  const handleSaveButtonClick = async () => {
    try {
      // Cập nhật values.hinhanh bằng values.magv trước khi gọi API
      values.hinhanh = values.magv;
      if (selectedGV){
        const response = await updateGiangVien(values, avatarAdd);
      console.log('Successfully updated giangvien:', response);
      }
      else{
        const response = await addGiangVien(values, avatarAdd);
        console.log('Successfully added giangvien:', response);
      }
      
  
      const updatedGVList = await getDanhSachGiangVien(selectedKhoa);
      setGVList(updatedGVList);
      handleCloseDialog('GVDialog');
    } catch (error) {
      console.error('Error saving giangvien:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatarAdd(file);
    previewImage(event, 'GVImage');
  };
  const  AcceptDeleteButtonClick = async () => {
    try {
        
            const dataToSave = String(values.magv.trim());
            await DeleteGiangVien(dataToSave); // Gọi API cập nhật           
            resetForm();
            handleCloseDialog('deleteDialog');
            const updatedList = GVList.filter(gv => gv.magv !== String(values.magv));
            setGVList(updatedList);
            alert("Xóa Giảng viên thành công! ")
            
    } catch (error) {
        alert("Xóa Giảng viên thất bại! ")
        return;
    }
};
useEffect(() => {
  const fetchAndSetImages = async () => {
      const images = await Promise.all(GVList.map(async (gv) => {
          try {
              const image = await fetchImage(gv.hinhanh);
              return { GiangVienID: gv.magv, image };
          } catch (error) {
              console.error('Error fetching giangvien image:', error);
              return { GiangVienID: gv.magv, image: null };
          }
      }));
      setGVImages(images);
  };

  fetchAndSetImages();
}, [GVList]);

  return (
  
    <div>
      <Header/>
      <NavBarMenu menuItems={menuItemsGV}/>
      <div className='cartFull-036'>
        <div className="cartBackground-036">
          <div className="titlepage"><p>Danh Sách Giảng Viên</p></div>
          <div className="cart-1-036">
            <div className="cart-1-left">
              <label htmlFor="khoa" className="label">Khoa:</label>
              <select className="cart-1-select" name="items" onChange={handleKhoaChange} value={selectedKhoa}>
                <option value="" disabled>Chọn 1 Khoa</option>
                {khoaList.length === 0 ? (
                  <option value="" disabled>Loading KhoaList...</option>
                ) : (
                  khoaList.map((khoa) => (
                    <option key={khoa} value={khoa}>{khoa}</option>
                  ))
                )}
              </select>
            </div>
            <div className="cart-1-right">
              <button id="openAddDialogButton" onClick={handleAddButtonClick}>Thêm mới</button>
            </div>
          </div>
          <div className="table-container-036">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Mã giảng viên</th>
                  <th>Họ và tên</th>
                  <th>Học vị</th>
                  <th>Học hàm</th>
                  <th>Chuyên môn</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {GVList.map((gv, index) => (
                  <tr key={gv.magv}>
                    <td>{index + 1}</td>
                    <td>
                         {gv.hinhanh ? (
                          <img src={URL.createObjectURL(new Blob([GVImages.find(img => img.GiangVienID === gv.magv)?.image]))} alt={`Ảnh giảng viên`} />
                          ) : (
                          <img src={iconPtit} alt={`Ảnh giảng viên`}  />
                          )}
                    </td>
                    <td>{gv.magv.trim()}</td>
                    <td>{`${gv.ho} ${gv.ten}`}</td>
                    <td>{gv.hocvi}</td>
                    <td>{gv.hocham}</td>
                    <td>{gv.chuyenmon}</td>
                    <td>{gv.sdt}</td>
                    <td>{gv.email}</td>
                    <td><a id="openUpdateDialogButton" onClick={() => handleEditButtonClick(gv)}>Sửa</a></td>
                    <td><a id="openDeleteDialogButton" onClick={() => handleDeleteButtonClick(gv)}>Xóa</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="GVDialog" className="modal-036">
            <div className="modal-content-036">
              <span className="close" id="closeDialogButton" onClick={() => handleCloseDialog('GVDialog')}>&times;</span>
              <p className='titleModal'>{selectedGV ? 'Chỉnh sửa giảng viên' : 'Thêm giảng viên mới'}</p>
              <form id="studentForm">
                <div className="modal-column-left-036">
                  <div className="form-group">
                    <label htmlFor="KhoaCode">Mã khoa</label>
                    <input type="text" className="form-control-036" value={values.makhoa} id="KhoaCode" readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="magv">Mã giảng viên</label>
                    <input type="text" className="form-control-036" value={values.magv} placeholder='Nhập mã giảng viên' id="magv" name="magv" onChange={handleChange} readOnly={!!selectedGV} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ho">Họ</label>
                    <input type="text" className="form-control-036" value={values.ho} placeholder='Nhập họ giảng viên' id="ho" name="ho" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ten">Tên</label>
                    <input type="text" className="form-control-036" value={values.ten} id="ten" name="ten" placeholder='Nhập tên giảng viên' onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hocvi">Học vị</label>
                    <select name="hocvi" id="hocvi" onChange={handleChange} value={values.hocvi}>
                      <option key={'Cử nhân'} value={'Cử nhân'}>Cử nhân</option>
                      <option key={'Thạc sĩ'} value={'Thạc sĩ'}>Thạc sĩ</option>
                      <option key={'Tiến sĩ'} value={'Tiến sĩ'}>Tiến sĩ</option>
                      <option key={'Tiến sĩ khoa học'} value={'Tiến sĩ khoa học'}>Tiến sĩ khoa học</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="hocham">Học hàm</label>
                    <select name="hocham" id="hocham" onChange={handleChange} value={values.hocham}>
                      <option key={'Không'} value={'Không'}>Không</option>
                      <option key={'Phó giáo sư'} value={'Phó giáo sư'}>Phó giáo sư</option>
                      <option key={'Giáo sư'} value={'Giáo sư'}>Giáo sư</option>
                    </select>
                  </div>
                 
                </div>
                <div className="modal-column-right-036">
                  <div className="form-group">
                    <label htmlFor="avatarAdd">Ảnh giảng viên</label>
                    <div className="image-upload">
                    <img id="GVImage" src={avatarAdd ? URL.createObjectURL(new Blob([avatarAdd])) : iconPtit} alt="GVImage" />

                      <input
                        type="file"
                        hidden
                        className="form-control-036-file"
                        id="avatarAdd"
                        accept="image/*"
                        onChange={handleFileChange} // Gọi hàm xử lý sự kiện khi input thay đổi
                      />
                      <label htmlFor="avatarAdd" id="avatarButton">Chọn ảnh</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="chuyenmon">Chuyên môn</label>
                    <input type="text" className="form-control-036" id="chuyenmon" name="chuyenmon" value={values.chuyenmon} placeholder="Nhập chuyên môn" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sdt">Số điện thoại</label>
                    <input type="tel" className="form-control-036" id="sdt" name="sdt" value={values.sdt} placeholder="Nhập số điện thoại" onChange={handleChange} required />
                  </div>
                 
                  <div className="form-group">
                              { selectedGV && (
                                  <>
                                     <label htmlFor="email">Email</label>
                                      <input
                                        type="email"
                                        className="form-control-036"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        placeholder="Nhập email"
                                        onChange={handleChange}
                                        required
                                      />
                                  </>
                              )}
                              </div>
                </div>
              </form>
              <button type="button" className="SaveButton" id="saveLTC" onClick={handleSaveButtonClick}>Lưu</button>
            </div>
          </div>
          <div id="deleteDialog" className="modal-036">
            <div className="modal-content-036">
              <span className="close" id="closeDialogButton" onClick={() => handleCloseDialog('deleteDialog')}>&times;</span>
              <p className='titleModal'>Xóa giảng viên</p>
              <input type="text" className="form-control-036" id="XoaGV" value={`Bạn có muốn xóa giảng viên mã ${values.magv.trim()} - ${values.ho} ${values.ten} không?`} readOnly />
              <button type="button" className="SaveButton" id="deleteGVButton" onClick={AcceptDeleteButtonClick}>Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default QuanTriGiangVien;
