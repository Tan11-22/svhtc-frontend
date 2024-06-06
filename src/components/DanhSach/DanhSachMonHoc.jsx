
import React,{useState, useEffect} from 'react'
import "./DanhSach.css"
import {getMonHoc, getSoLuongMonHoc, timMonHoc} from '../../services/monHocService';
import Pagination from '../Pagination/Pagination';
import add from "../../assets/add.png";
import edit from "../../assets/edit.png";
import bin from "../../assets/bin.png";
import search from "../../assets/search.png";
import close from "../../assets/close.png";
import FormMonHoc from '../Form62/FormMonHoc';
import Loading from '../Loading/Loading';
import FormUpdateMonHoc from '../Form62/FromUpdateMonHoc';
import FormDeleteMonHoc from '../Form62/FormDeleteMonHoc';


function DanhSachMonHoc() {
    const [danhSachMonHoc,setDanhSachMH] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [totalMonHoc,setTotalMonHoc] = useState(0);
    const [totalPage,setTotalPage] = useState(0);
    const [page,setPage] = useState(-1);
    const [size, setSize] = useState(0);

    const [openFormMonHoc, setOpenFormMonHoc] = useState(false);

    const [openFormUpdateMonHoc, setOpenFormUpdateMonHoc] = useState(false);
    const [formValue, setFormValue] = useState(null);

    const [openFormDeleteMonHoc, setOpenFormDeleteMonHoc] = useState(false);
    const [formValueDelete, setFormValueDelete] = useState("");

    const [isSearch,setIsSearch] = useState(false)
    const [inputSearch, setInputSearch] =useState("")

    const [isRefresh, setIsRefresh] = useState(false)

    // bắt sự kiện chuyển trang
    const handlePageChange = (newPage)=> {
      if(isNaN(newPage)) return;
      setPage(newPage);
      setSize((totalMonHoc - 10*newPage) > 10 ? 10 : (totalMonHoc - 10*newPage));
    };

    // bắt sự kiện tìm kiếm
    const handleSearch = () =>{
      setIsSearch(true);
      const fetchData = async () => {
        try {
          const result2 = await timMonHoc(inputSearch);
          setDanhSachMH(result2.data);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
    
      fetchData();
    }
    // bắt sự kiện huỷ bỏ tìm kiếm
    const handleCloseSearch = () => {
      setInputSearch("");
      setIsSearch(false);
      const fetchData = async () => {
        try {
          const result2 = await getMonHoc(page*10,size);
          setDanhSachMH(result2.data);

        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
    
      fetchData();
    }
    // load tổng số môn học
    useEffect(() => {
        const fetchData = async () => {
            try {
              const result1 = await getSoLuongMonHoc();
              setTotalMonHoc(result1.data); 
              // setPage(0);
            } catch (error) {
              setError(error);
              setLoading(false);
            }
          };
        
        fetchData();       
    },[isRefresh]);

    // set lại số trang khi tổng số môn học thay đổi
    useEffect(()=>{ 
      if(totalMonHoc - 10*page == 0) {
        setPage(page-1)
      } else {
        setPage(0)
      }
      setTotalPage(Math.ceil(totalMonHoc/10));
      setSize((totalMonHoc - 10*page) > 10 ? 10 : (totalMonHoc - 10*page));
    },[totalMonHoc]);

    // load data khi thay đổi trang
    useEffect(()=>{
      if(size === 0 || page === -1 ) return;
      console.log("check", page, size)
      const fetchData1 = async () => {
        try {
          const result2 = await getMonHoc(page*10,size);
          setDanhSachMH(result2.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData1(); 
      console.log("check data", danhSachMonHoc); 
    },[page,totalMonHoc]);


    const handleDelete = (maMH) => {
      setFormValueDelete(maMH)
      setOpenFormDeleteMonHoc(true);
      // console.log("Kết quả xoá môn học1 ", maMH.trim(), "abc")
      // const fetchData = async () => {
      //   try {
      //     const result1 = await xoaMonHoc(maMH.trim());
      //     console.log("Kết quả xoá môn học", result1)
      //     if(result1.code == 200) setIsRefresh(!isRefresh);
      //     console.log("Kết quả :", isRefresh)
      //   } catch (error) {
      //   }
      // };
    
      // fetchData();   
    }
    const handleUpdate = (monHoc) => {
        setFormValue(monHoc)
        setOpenFormUpdateMonHoc(true)
    }


  if (loading) return <Loading/>;
  if (error) return <p>Error: {error.message}</p>;
  return (
  <div>

      <div className="loc-input">
              <div className="loc-control">
                <p>Lọc môn học</p>
                <div className='line-1'>
                  <input 
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                    type='text'
                    placeholder='Mã, tên môn học'
                              />
                  <div className='line-2'>
                    <button onClick={handleSearch}>
                      <img src={search}/>
                    </button>
                    {
                    isSearch ?
                    <button onClick={handleCloseSearch}>
                      <img src={close}/>
                    </button>:null}
                  </div>
                  
                </div>
                
              </div> 
            </div>
            <div className='card-dsmh'>
        
          <div className='title-dsmh'>
            <p >Danh sách môn học</p> 
             <button onClick={()=> setOpenFormMonHoc(true)}>
              <img src={add}></img>
             </button>
          </div>
           
            <table>
            <thead>
                    <tr>
                      <th className='col-1'>STT</th>
                      <th className='col-2'>Mã MH</th>
                      <th className='col-3'>Tên môn học</th>
                      <th className='col-2'>Số tiết LT</th>
                      <th className='col-2'>Số tiết TH</th>
                      <th className='col-2'>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    { 
                      danhSachMonHoc.map((val, key)=> {
                        return (
                          <tr key={key}>
                            <th className='col-1'>{val.stt}</th>
                            <th className='col-2'>{val.monHoc.maMH}</th>
                            <th className='col-3'>{val.monHoc.tenMH}</th>
                            <th className='col-2'>{val.monHoc.soTietLT}</th>
                            <th className='col-2'>{val.monHoc.soTietTH}</th>
                            <th className='col-4'>
                              <img src={edit} onClick={() => handleUpdate(val.monHoc)}/>
                              <img src={bin} onClick={()=>handleDelete(val.monHoc.maMH)}/>
                            </th>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                {!isSearch ? 
                <Pagination max = {totalPage} select={page} onPageChange={handlePageChange}/> : null}
    <FormMonHoc open={openFormMonHoc} onClose={()=>setOpenFormMonHoc(false)}/>
    <FormUpdateMonHoc open={openFormUpdateMonHoc} onClose={() => setOpenFormUpdateMonHoc(false)} data={formValue} refresh={() => setIsRefresh(!isRefresh)}/>
      <FormDeleteMonHoc open={openFormDeleteMonHoc} onClose={() => setOpenFormDeleteMonHoc(false)} maMH={formValueDelete} refresh={() => setIsRefresh(!isRefresh)}/>
    </div>
  </div>
      
  )
}

export default DanhSachMonHoc
