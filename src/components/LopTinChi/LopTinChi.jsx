import React, { useEffect, useState } from 'react';
import { ktLTC,getDanhSachKhoa, getDanhSachNienKhoa, getDanhSachGiangVien, getDanhSachLTC, getDanhSachMonHoc, getDanhSachLop, addLTC, updateLTC,deleteLTC} from '../API036/apiLopTinChi.js'; 
import '../Form036/Cart/Cart.css';
import '../Form036/Table/Table.css';
import userIcon from '../../assets/user.png';
import '../Form036/Modal/Modal.css';
import Header from '../Header/Header.jsx';
import NavBarMenu from '../NavBarMenu/NavBarMenu.jsx'
import { handleOpenDialog, handleCloseDialog, useForm } from './modalLTC.js';
import Footer from '../../components/Footer/Footer';
import  {menuItemsGV}  from '../../components/NavBarMenu/menu';
import { useNavigate } from 'react-router-dom';
function LopTinChi() {
    const navigate = useNavigate();
    const [khoaList, setKhoaList] = useState([]);
    const [selectedKhoa, setSelectedKhoa] = useState('');
    const [nienKhoaList, setNienKhoaList] = useState([]);
    const [selectedNienKhoa, setSelectedNienKhoa] = useState('');
    const [selectedHocKi, setSelectedHocKi] = useState('');
    const [LTCList, setLTCList] = useState([]);
    const [GVList, setGVList] = useState([]);
    const [MHList, setMHList] = useState([]);
    const [LopList, setLopList] = useState([]);
    const [selectedLTC, setSelectedLTC] = useState(null);

    const initialFormValues = {
        maltc:'',
        makhoa: '',
        nienkhoa: '',
        hocki: '',
        nhom: '',
        sosvtt: '',
        sosvtd: '',
        malop: '',
        donglop: false,
        mamh: '',
        magv: '',
        tenmh: '',
        tengiangvien: '',
    };

    const { values, handleChange, setFormValues, resetForm } = useForm(initialFormValues);

    useEffect(() => {
        if(localStorage.getItem('role') === "SINHVIEN") {
            navigate("/")
        }
        const fetchMonHocList = async () => {
            try {
                const data = await getDanhSachMonHoc();
                setMHList(data);
            } catch (error) {
                console.error('Error fetching the list of MonHoc:', error);
            }
        };

        fetchMonHocList();
    }, []);

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

    useEffect(() => {
        const fetchNienKhoaList = async () => {
            try {
                const data = await getDanhSachNienKhoa();
                const trimmedData = data.map(nienkhoa => nienkhoa.trim());
                setNienKhoaList(trimmedData);
                if (trimmedData.length > 0) {
                    setSelectedNienKhoa(trimmedData[0]);
                }
            } catch (error) {
                console.error('Error fetching the list of NienKhoa:', error);
            }
        };

        fetchNienKhoaList();
    }, []);

    const handleKhoaChange = (e) => {
        const selectedValue = e.target.value.trim();
        setSelectedKhoa(selectedValue);
    };

    const handleNienKhoaChange = (e) => {
        const selectedValue = e.target.value.trim();
        setSelectedNienKhoa(selectedValue);
    };

    const handleHocKiChange = (e) => {
        const selectedValue = e.target.value.trim();
        setSelectedHocKi(selectedValue);
    };

    useEffect(() => {
        if (selectedKhoa) {
            const fetchLops = async () => {
                try {
                    const data = await getDanhSachLop(selectedKhoa);
                    setLopList(data);
                } catch (error) {
                    console.error('Error fetching lops:', error);
                }
            };

            fetchLops();
        }
    }, [selectedKhoa]);

    useEffect(() => {
        if (selectedKhoa) {
            const fetchGVs = async () => {
                try {
                    const data = await getDanhSachGiangVien(selectedKhoa);
                    setGVList(data);
                } catch (error) {
                    console.error('Error fetching gvs:', error);
                }
            };

            fetchGVs();
        }
    }, [selectedKhoa]);

    useEffect(() => {
        if (selectedKhoa && selectedNienKhoa && selectedHocKi) {
            const fetchLTCs = async () => {
                try {
                    const data = await getDanhSachLTC(selectedKhoa, selectedNienKhoa, selectedHocKi);
                    setLTCList(data);
                } catch (error) {
                    console.error('Error fetching ltcs:', error);
                }
            };

            fetchLTCs();
        }
    }, [selectedKhoa, selectedNienKhoa, selectedHocKi]);

    useEffect(() => {
        if (selectedKhoa && selectedNienKhoa && !selectedHocKi) {
            setSelectedHocKi('1');
        }
    }, [selectedKhoa, selectedNienKhoa, selectedHocKi]);

    const handleEditButtonClick = (ltc) => {
        setSelectedLTC(ltc);
        setFormValues({
            maltc: ltc.maltc,
            makhoa: selectedKhoa,
            nienkhoa: selectedNienKhoa,
            hocki: selectedHocKi,
            mamh: ltc.mamh,
            nhom: ltc.nhom,
            magv: ltc.magv,
            sosvtt: ltc.sosvtt,
            sosvtd: ltc.sosvtd,
            malop: ltc.malop,
            donglop: ltc.donglop,
            tengiangvien: ltc.tengiangvien,
            tenmh: ltc.tenmh,
        });
        handleOpenDialog('LTCDialog');
    };
    const handleDeleteButtonClick = (ltc) => {
        setSelectedLTC(ltc);
        setFormValues({
            maltc: ltc.maltc,
            makhoa: selectedKhoa,
            nienkhoa: selectedNienKhoa,
            hocki: selectedHocKi,
            mamh: ltc.mamh,
            nhom: ltc.nhom,
            magv: ltc.magv,
            sosvtt: ltc.sosvtt,
            sosvtd: ltc.sosvtd,
            malop: ltc.malop,
            donglop: ltc.donglop,
            tengiangvien: ltc.tengiangvien,
            tenmh: ltc.tenmh,
        });
        handleOpenDialog('deleteDialog');
    };

    const handleSaveButtonClick = async () => {
        try {
            
            let dataToSave = {
                
                makhoa: values.makhoa,
                nienkhoa: values.nienkhoa,
                hocki: parseInt(values.hocki),
                nhom: parseInt(values.nhom),
                sosvtt: parseInt(values.sosvtt),
                sosvtd: parseInt(values.sosvtd),
                malop: values.malop,
                donglop: values.donglop === 'true' || values.donglop === true ? true : false,
                mamh: values.mamh,
                magv: values.magv,
                tenmh: values.tenmh,
                tengiangvien: values.tengiangvien,
            };
            if (selectedLTC) {
                dataToSave = {
                    ...dataToSave,
                    maltc: values.maltc
                };
            }
            else{
                dataToSave = {
                    ...dataToSave,
                    maltc: null
                };
            }

                // Lặp qua từng phần tử trong danh sách loptinchilist
                for (let i = 0; i < LTCList.length; i++) {
                    const ltcInList = LTCList[i];
                    // if ( values.makhoa === ltcInList.makhoa) console.log("trùng khoa");
                    // else if
                   
                    // So sánh từng thuộc tính của lớp tín chỉ cần kiểm tra với từng phần tử trong danh sách
                    if (
                        String(values.makhoa.trim()) === String(ltcInList.makhoa.trim()) &&
                        String(values.nienkhoa.trim()) === String(ltcInList.nienkhoa.trim()) &&
                        parseInt(values.hocki) === parseInt(ltcInList.hocki) &&
                        String(values.mamh.trim()) === String(ltcInList.mamh.trim()) &&
                        parseInt(values.nhom) === parseInt(ltcInList.nhom)
                    ) {
                        if( parseInt(values.maltc) !== parseInt(ltcInList.maltc))

                            {
                                alert('Nhóm môn này đã tồn tại, vui lòng nhập nhóm khác.');
                                return;
                            }
                    }
                }

            if (selectedLTC) {
                await updateLTC(dataToSave); // Gọi API cập nhật
            } else {
                await addLTC(dataToSave); // Gọi API thêm mới
            }
            resetForm();
            handleCloseDialog('LTCDialog');
            // Fetch lại danh sách LTC sau khi thêm hoặc cập nhật thành công
            const updatedLTCList = await getDanhSachLTC(selectedKhoa, selectedNienKhoa, selectedHocKi);
            setLTCList(updatedLTCList);
        } catch (error) {
            console.error('Error saving LTC:', error);
        }
    };

    const  AcceptDeleteButtonClick = async () => {
        try {
               
                const dataToSave = values.maltc;
                const check = await ktLTC(dataToSave)
                if (check != 0)
                    {
                        alert('Lớp tín chỉ này đã có sinh viên đăng kí không thế xóa');
                        return;
                    }
                await deleteLTC(dataToSave); // Gọi API cập nhật           
                resetForm();
                handleCloseDialog('deleteDialog');
                // Fetch lại danh sách LTC sau khi thêm hoặc cập nhật thành công
                const updatedLTCList = await getDanhSachLTC(selectedKhoa, selectedNienKhoa, selectedHocKi);
                setLTCList(updatedLTCList);
        } catch (error) {
            alert("Xóa lớp tín chỉ thất bại! môn này đã được đăng kí không thể xóa !")
            return;
        }
    };


    const handleAddButtonClick = () => {
        setSelectedLTC(null);
        resetForm(); // Đặt lại giá trị form về trạng thái ban đầu
        setFormValues({
            maltc:'',
            makhoa: selectedKhoa,
            nienkhoa: selectedNienKhoa,
            hocki: selectedHocKi,
            mamh: MHList.length > 0 ? MHList[0].mamh : '',
            nhom: '',
            magv: GVList.length > 0 ? GVList[0].magv : '',
            sosvtt: '',
            sosvtd: '',
            malop: LopList.length > 0 ? LopList[0] : '',
            donglop: false,
            tengiangvien:'',
            tenmh:'',
        });
        handleOpenDialog('LTCDialog');
    };

    const handleDropdownChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value
        }));
    };

    

    return (
        <div>
              <Header></Header>
              <NavBarMenu menuItems={menuItemsGV} />
            <div className='cartFull-036'>
                <div className="cartBackground-036">
                    <div className="titlepage"><p>Danh Sách Lớp Tín Chỉ</p></div>
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
                            <label htmlFor="nienkhoa" className="label">Niên khóa:</label>
                            <select className="cart-1-select" name="items" onChange={handleNienKhoaChange} value={selectedNienKhoa}>
                                <option value="" disabled>Chọn 1 Niên Khóa</option>
                                {nienKhoaList.length === 0 ? (
                                    <option value="" disabled>Loading NienKhoaList...</option>
                                ) : (
                                    nienKhoaList.map((nk) => (
                                        <option key={nk} value={nk}>{nk}</option>
                                    ))
                                )}
                            </select>
                            <label htmlFor="hocki" className="label">Học kì:</label>
                            <select className="cart-1-select" name="items" onChange={handleHocKiChange} value={selectedHocKi}>
                                <option value="" disabled>Chọn 1 Học Kỳ</option>
                                <option value="1">Học kì 1</option>
                                <option value="2">Học kì 2</option>

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
                                    <th>Môn học</th>
                                    <th>Nhóm</th>
                                    <th>Giảng Viên</th>
                                    <th>Số SV tối thiểu</th>
                                    <th>Số SV tối đa</th>
                                    <th>Lớp</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {LTCList.map((ltc, index) => (
                                    <tr key={ltc.maltc}>
                                        <td>{index + 1}</td>
                                        <td>{ltc.tenmh}</td>
                                        <td>{ltc.nhom}</td>
                                        <td>{ltc.tengiangvien}</td>
                                        <td>{ltc.sosvtt}</td>
                                        <td>{ltc.sosvtd}</td>
                                        <td>{ltc.malop}</td>
                                        <td>{ltc.donglop ? 'Đóng' : 'Mở'}</td>
                                        <td><a id="openUpdateDialogButton" onClick={() => handleEditButtonClick(ltc)}>Sửa</a></td>
                                        <td><a id="openDeleteDialogButton"  onClick={() => handleDeleteButtonClick(ltc)}>Xóa</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="LTCDialog" className="modal-036">
                        <div className="modal-content-036">
                            <span className="close" id="closeDialogButton" onClick={() => handleCloseDialog('LTCDialog')}>&times;</span>
                            <h3>{selectedLTC ? 'Chỉnh sửa lớp tín chỉ' : 'Thêm lớp tín chỉ mới'}</h3>
                            <form id="studentForm">
                                <div className="modal-column-left-036">
                                    <div className="form-group">
                                        <label htmlFor="KhoaCode">Mã khoa</label>
                                        <input type="text" className="form-control-036" value={values.makhoa} id="KhoaCode" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NienKhoa">Niên khóa</label>
                                        <input type="text" className="form-control-036" value={values.nienkhoa} id="NienKhoa" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="HocKi">Học kì</label>
                                        <input type="text" className="form-control-036" value={values.hocki} id="HocKi" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="MonHoc">Môn Học</label>
                                        <select name="items" id="mamh" onChange={selectedLTC ? null : handleDropdownChange} value={values.mamh}>
                                            <option value="" disabled>Chọn môn học</option>
                                            {MHList.map((mh) => (
                                                <option key={mh.mamh} value={mh.mamh}>{mh.tenmh}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Nhom">Nhóm</label>
                                        <input type="number" className="form-control-036" id="nhom" name="nhom" value={values.nhom} onChange={handleChange} placeholder="Nhập nhóm" required />
                                    </div>
                                </div>
                                <div className="modal-column-right-036">
                                    <div className="form-group">
                                        <label htmlFor="GiangVien">Giảng viên</label>
                                        <select name="items" id="magv" onChange={handleDropdownChange} value={values.magv} >
                                            <option value="" disabled>Chọn giảng viên</option>
                                            {GVList.map((gv) => (
                                                <option key={gv.magv} value={gv.magv}>{`${gv.ho} ${gv.ten}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="SoSVTT" >Số sinh viên tối thiểu</label>
                                        <input type="number" className="form-control-036" id="sosvtt" name="sosvtt" value={values.sosvtt} onChange={handleChange} placeholder="Nhập Số SV Tối Thiểu" required min="30" max="50" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="SoSVTD">Số sinh viên tối đa</label>
                                        <input type="number" className="form-control-036" id="sosvtd" name="sosvtd" value={values.sosvtd} onChange={handleChange} placeholder="Nhập Số SV Tối Đa" required min="60" max="150" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Lop">Lớp</label>
                                        <select name="items" id="malop" onChange={handleDropdownChange} value={values.malop} >
                                            <option value="" disabled>Chọn lớp</option>
                                            {LopList.map((lop) => (
                                                <option key={lop} value={lop}>{lop.trim()}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <button type="button" className="SaveButton" id="saveLTC" onClick={handleSaveButtonClick}>Lưu</button>
                        </div>
                    </div>
                    <div id="deleteDialog" className="modal-036">
                    <div className="modal-content-036">
                    <span className="close" id="closeDialogButton" onClick={() => handleCloseDialog('deleteDialog')}>&times;</span>
                    <p className='titleModal'>Xóa Lớp tín chỉ</p>

                    <input type="text" className="form-control-036" id="XoaLTC" value={`Bạn có muốn xóa lớp tín chỉ môn ${values.tenmh}, nhóm ${values.nhom} không?`}  readOnly='readOnly' ></input>
                    <button type="button" className="SaveButton" id="deleteSVButton" onClick={AcceptDeleteButtonClick}>Đồng ý</button>
                
                </div>
                </div>
                </div>
            </div>  
                  
        </div>
    );
}

export default LopTinChi;
