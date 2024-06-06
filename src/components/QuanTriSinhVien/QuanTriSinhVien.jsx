import React, { useEffect, useState } from 'react';
import iconPtit from '../../assets/Logo_PTIT_University.png'
import '../Form036/Cart/Cart.css'
import '../Form036/Table/Table.css'
import '../Form036/Form036/Modal/Modal.css'
import { handleOpenDialog, handleCloseDialog, previewImage ,useForm,formatDate } from '../Form036/Modal/Modal.js';
import { getDanhSachLop ,getStudentsByClassId,addNewStudent,updateStudent,DeleteStudent,fetchStudentImage} from '../API036/apiThongTin.js';
function QuanTriSinhVien() {
    const [lopList, setLopList] = useState([]);
    const [selectedLop, setSelectedLop] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [selectedSV, setSelectedSV] = useState(null);
    const [avatarAdd, setAvatarAdd] = useState(null);
    const [studentImages, setStudentImages] = useState([]); 
    const initialFormValues = {
        masv: '',
        ho: '',
        ten: '',
        ngaysinh: '',
        phai: '',
        diachi: '',
        malop: '',
        danghihoc:'',
        sdt: '',
        hinhanh: '',
        email: '',
      };
    const { values, handleChange, setFormValues, resetForm } = useForm(initialFormValues);
    useEffect(() => {
        
        const fetchLopList = async () => {
            try {
                const data = await getDanhSachLop();
                console.log('Fetched Lop List:', data); // Debug log
                const trimmedData = data.map(lop => lop.trim());
                setLopList(trimmedData);
                if (trimmedData.length > 0) {
                    setSelectedLop(trimmedData[0]); // Set default selected class
                }
            } catch (error) {
                console.error('Error fetching the list of Lop:', error);
            }
        };

        fetchLopList();
    }, []);

    useEffect(() => {
        if (selectedLop) {
            const fetchStudents = async () => {
                try {
                    const data = await getStudentsByClassId(selectedLop);
                    console.log('Fetched Students:', data); // Debug log
                    setStudentList(data);
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            };

            fetchStudents();
        }
    }, [selectedLop]);

    const handleLopChange = (e) => {
        const selectedValue = e.target.value.trim();
        console.log('Selected Lop:', selectedValue); // Debug log
        setSelectedLop(selectedValue);
    };
    const handleEditButtonClick = async(sv) => {
        setSelectedSV(sv);
        setFormValues({
            masv: sv.masv,
            ho: sv.ho,
            ten: sv.ten,
            ngaysinh: sv.ngaysinh,
            phai: sv.phai,
            diachi: sv.diachi,
            malop: sv.malop,
            danghihoc: sv.danghihoc,
            sdt: sv.sdt,
            hinhanh: sv.hinhanh,
            email: sv.email,
        });
          if(String(sv.hinhanh))
            {
              try {
                const imageUrl = await fetchStudentImage(String(sv.hinhanh));
    
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
    
        handleOpenDialog('SVDialog');
      };
      const handleDeleteButtonClick = (sv) => {
        setSelectedSV(sv);
        setFormValues({
            masv: sv.masv,
            ho: sv.ho,
            ten: sv.ten,
            ngaysinh: sv.ngaysinh,
            phai: sv.phai,
            diachi: sv.diachi,
            malop: sv.malop,
            danghihoc:sv.danghihoc,
            sdt: sv.sdt,
            hinhanh: sv.hinhanh,
            email: sv.email,
        });
        handleOpenDialog('deleteDialog');
      }
      const handleAddButtonClick = () => {
        setSelectedSV(null);
        resetForm(); // Đặt lại giá trị form về trạng thái ban đầu
        setFormValues({
            masv: '',
            ho: '',
            ten: '',
            ngaysinh: '',
            phai: '',
            diachi: '',
            malop: selectedLop,
            danghihoc:false,
            sdt: '',
            hinhanh: '',
            email: '',
        });
        setAvatarAdd(null);
        handleOpenDialog('SVDialog');
      };
    
      const handleSaveButtonClick = async () => {
        try {
          // Cập nhật values.hinhanh bằng values.magv trước khi gọi API
          values.hinhanh = values.masv;
          if (selectedSV){
            const response = await updateStudent(values, avatarAdd);
          console.log('Successfully updated sinhvien:', response);
          }
          else{
            const response = await addNewStudent(values, avatarAdd);
            console.log('Successfully added sinhvien:', response);
          }
          
      
          const updatedList = await getStudentsByClassId(selectedLop);
          setStudentList(updatedList);
          handleCloseDialog('SVDialog');
        } catch (error) {
          console.error('Error saving sinhvien:', error);
        }
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatarAdd(file);
        previewImage(event, 'SVImage');
      };
      const  AcceptDeleteButtonClick = async () => {
        try {
            
                const dataToSave = String(values.masv);
                await DeleteStudent(dataToSave); // Gọi API cập nhật           
                resetForm();
                handleCloseDialog('deleteDialog');
                const updatedList = studentList.filter(sv => sv.masv !== String(values.masv));
                setStudentList(updatedList);
                alert("Xóa Sinh viên thành công! ")
                
        } catch (error) {
            alert("Xóa Sinh viên thất bại! ")
            return;
        }
    };
    useEffect(() => {
      const fetchAndSetImages = async () => {
          const images = await Promise.all(studentList.map(async (student) => {
              try {
                  const image = await fetchStudentImage(student.hinhanh);
                  return { studentId: student.masv, image };
              } catch (error) {
                  console.error('Error fetching student image:', error);
                  return { studentId: student.masv, image: null };
              }
          }));
          setStudentImages(images);
      };

      fetchAndSetImages();
  }, [studentList]);

  return (
    <div>
      <div className='cartFull-036'>
        <div className="cartBackground-036">
            <div className="titlepage"><p>Danh Sách Sinh Viên</p></div>
                <div className="cart-1-036">
                    <div className="cart-1-left">
                     <label htmlFor="malop">Lớp</label>
                            <select className="cart-1-select" id='malop' name="malop" onChange={handleLopChange} value={selectedLop}>
                            <option value="" disabled>Chọn 1 Lớp</option>
                            {lopList.length === 0 ? (
                                <option value="" disabled>Loading classes...</option>
                            ) : (
                                lopList.map((lop) => (
                                    <option key={lop} value={lop}>{lop}</option>
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
                    <th>Mã sinh viên</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th></th>
                    <th></th> 
                    </tr>
                </thead>
                <tbody>
                        {studentList.map((student, index) => (
                           <tr key={student.masv.trim()}>
                           <td>{index + 1}</td>
                           <td>
                                {student.hinhanh ? (
                                <img src={URL.createObjectURL(new Blob([studentImages.find(img => img.studentId === student.masv)?.image]))} alt={`Ảnh sinh viên`} />
                                ) : (
                                      <img src={iconPtit} alt={`Ảnh sinh viên`} />
                                    )}
                            </td>
                           <td>{student.masv.trim()}</td>
                           <td>{`${student.ho} ${student.ten}`}</td>
                           <td>{formatDate(student.ngaysinh)}</td>
                           <td>{student.phai ? 'Nam' : 'Nữ'}</td>
                           <td>{student.email}</td>
                           <td>{student.diachi}</td>
                           <td>{student.sdt}</td>
                           <td><a id="openUpdateDialogButton" onClick={() => handleEditButtonClick(student)}>Sửa</a></td>
                            <td><a id="openDeleteDialogButton" onClick={() => handleDeleteButtonClick(student)}>Xóa</a></td>
                       </tr>
                   ))}
                    </tbody>
        
                </table>
            </div>

        
            <div id="SVDialog" className="modal-036">
                <div className="modal-content-036">
                    <span className="close" id="closeAddDialogButton" onClick={() => handleCloseDialog('SVDialog')}>&times;</span>
                    <h3>{selectedSV ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'}</h3>

                    <form id="studentForm">
                    <div className="modal-column-left">

                          <div className="form-group">
                          <label htmlFor="malop">Mã lớp</label>
                          <input type="text" className="form-control" value={values.malop} id="malop" name='malop' readOnly />
                        </div>
                        <div className="form-group">
                        <label htmlFor="masv">Mã sinh viên</label>
                        <input type="text" className="form-control" id="masv" name="masv"placeholder="Nhập mã sinh viên" required="required" value={values.masv} onChange={handleChange}readOnly={!!selectedSV}></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="hoSv">Họ</label>
                        <input type="text" className="form-control" id="ho" name="ho" placeholder="Nhập họ" required="required"value={values.ho} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="tenSv">Tên</label>
                        <input type="text" className="form-control" id="ten" name="ten" placeholder="Nhập tên" required="required" value={values.ten} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="phai">Giới tính</label>
                        <select className="form-control" id="phai" name='phai' onChange={handleChange} value={values.phai}>
                            <option value="false">Nam</option>
                            <option value="true">Nữ</option>
                        </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="ngaysinh">Ngày sinh</label>
                        <input type="date" className="form-control" id="ngaysinh" name ="ngaysinh" required="required" value={values.ngaysinh} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="modal-column-right">

                    <div className="form-group">
                    <label htmlFor="avatarAdd">Ảnh sinh viên</label>
                    <div className="image-upload">
                    <img id="SVImage" src={avatarAdd ? URL.createObjectURL(new Blob([avatarAdd])) : iconPtit} alt="SVImage" />

                      <input
                        type="file"
                        hidden
                        className="form-control-file"
                        id="avatarAdd"
                        accept="image/*"
                        onChange={handleFileChange} // Gọi hàm xử lý sự kiện khi input thay đổi
                      />
                      <label htmlFor="avatarAdd" id="avatarButton">Chọn ảnh</label>
                    </div>
                  </div>
                        <div className="form-group">
                        <label htmlFor="diachi">Địa chỉ</label>
                        <input type="text" className="form-control" id="diachi" name="diachi" placeholder="Nhập địa chỉ" required="required" value={values.diachi} onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="sdt">Số điện thoại</label>
                        <input type="tel" className="form-control" id="sdt" name="sdt" placeholder="Nhập số điện thoại" required="required" value={values.sdt} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div class="form-group">
                        { selectedSV && (
                           <>
                          <label htmlFor="email">Email</label>
                            <input
                             type="email"
                             className="form-control"
                             id="email"
                             name="email"
                             value={values.email} 
                             onChange={handleChange}
                             placeholder="Nhập email" 
                              required
                                />
                            </>
                        )}
                      </div>
                    </form>
                    <button type="button" className="SaveButton" id="saveLTC" onClick={handleSaveButtonClick}>Lưu</button>
                </div>
                </div>
                
                <div id="deleteDialog" className="modal-036">
                <div className="modal-content-036">
                <span className="close" id="closeDialogButton" onClick={() => handleCloseDialog('deleteDialog')}>&times;</span>
                <h3>Xóa sinh viên</h3>
                <input type="text" className="form-control" id="XoaSV" value={`Bạn có muốn xóa sinh viên mã ${values.masv.trim()} - ${values.ho} ${values.ten} không?`} readOnly />
                <button type="button" className="SaveButton" id="deleteGVButton" onClick={AcceptDeleteButtonClick}>Đồng ý</button>
                </div>
            </div>
             
        </div>
        
      </div>
    </div>
  )
}

export default QuanTriSinhVien
