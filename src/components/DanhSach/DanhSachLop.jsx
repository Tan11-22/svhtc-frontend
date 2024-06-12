import React,{useState, useEffect} from 'react'
import "./DanhSach.css"
import {getLopHoc,getSoLuongLopHoc,timLopHoc } from '../../services/lopService';
import Pagination from '../Pagination/Pagination';
import add from "../../assets/add.png";
import edit from "../../assets/edit.png";
import bin from "../../assets/bin.png";
import search from "../../assets/search.png";
import close from "../../assets/close.png";
import FormMonHoc from '../Form62/FormMonHoc';
import FormThemLop from '../Form62/FormThemLop';
import FormDeleteLop from '../Form62/FormDeleteLop';
import FormUpdateLop from '../Form62/FormUpdateLop';

function DanhSachLop() {
    const [danhSachLop,setDanhSachLop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [totalLop,setTotalLop] = useState(0);
    const [totalPage,setTotalPage] = useState(0);
    const [page,setPage] = useState(-1);
    const [size, setSize] = useState(0);

    const [openFormThemLop, setOpenFormThemLop] = useState(false);
    const [openFormXoaLop, setOpenFormXoaLop] = useState(false);
    const [formValueDelete, setFormValueDelete] = useState("");
    const [openFormSuaLop, setOpenFormSuaLop] = useState(false);
    const [formValueUpdate, setFormValueUpdate] = useState({});

    const [isSearch,setIsSearch] = useState(false)
    const [inputSearch, setInputSearch] =useState("")

    const [isRefresh, setIsRefresh] = useState(false)

    const handlePageChange = (newPage)=> {
      if(isNaN(newPage)) return;
      setPage(newPage);
      setSize((totalLop - 10*newPage) > 10 ? 10 : (totalLop - 10*newPage));
    };

    const handleSearch = () =>{
      setIsSearch(true);
      const fetchData = async () => {
        try {
          const result2 = await timLopHoc(inputSearch);
          setDanhSachLop(result2.data);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
    
    fetchData();
    }
    const handleCloseSearch = () => {
      setInputSearch("");
      setIsSearch(false);
      const fetchData = async () => {
        try {
          const result2 = await getLopHoc(page*10,size);
          setDanhSachLop(result2.data);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
    
    fetchData();
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
              const result1 = await getSoLuongLopHoc();
              setTotalLop(result1.data);
              console.log("Check")
            } catch (error) {
              setError(error);
              setLoading(false);
            }
          };
        
        fetchData();       
    },[isRefresh]);


    useEffect(()=>{
      if(totalLop - 10*page == 0) {
        setPage(page-1)
      } else {
        setPage(0)
      }
      setTotalPage(Math.ceil(totalLop/10));
      setSize((totalLop - 10*page) > 10 ? 10 : (totalLop - 10*page));
      
    },[totalLop]);


    useEffect(()=>{
      console.log("check new page", page);
      
      console.log("check new size", size);
      if(size === 0 || page === -1 ) return;
      const fetchData1 = async () => {
        try {
          const result2 = await getLopHoc(page*10,size);
          setDanhSachLop(result2.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData1(); 
      // console.log("check data", danhSachMonHoc); 
    },[page,totalLop]);

    const handleEdit=(monHoc) => {
      setFormValueUpdate(monHoc)
      setOpenFormSuaLop(true)
    };

    const handleDelete = (maLop) => {
      setFormValueDelete(maLop)
      setOpenFormXoaLop(true);  
    }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
  <div>

      <div className="loc-input">
              <div className="loc-control">
                <p>Lọc lớp học</p>
                <div className='line-1'>
                  <input 
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                    type='text'
                    placeholder='Mã, tên lớp học'
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
            <p >Danh sách lớp học</p> 
             <button onClick={()=> setOpenFormThemLop(true)}>
              <img src={add}></img>
             </button>
          </div>
           
            <table>
            <thead>
                    <tr>
                      <th className='col-1'>STT</th>
                      <th className='col-2'>Mã lớp</th>
                      <th className='col-3'>Tên lớp học</th>
                      <th className='col-2'>Khoá học</th>
                      <th className='col-2'>Hệ</th>
                      <th className='col-2'>Khoa</th>
                      <th className='col-2'>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      danhSachLop.map((val, key)=> {
                        return (
                          <tr key={key}>
                            <th className='col-1'>{val.stt}</th>
                            <th className='col-2'>{val.maLop}</th>
                            <th className='col-3'>{val.tenLop}</th>
                            <th className='col-2'>{val.khoaHoc}</th>
                            <th className='col-2'>{val.tenHe}</th>
                            <th className='col-2'>{val.tenKhoa}</th>
                            <th className='col-4'>
                              <img src={edit} onClick={()=> handleEdit(val)}/>
                              <img src={bin} onClick={()=>handleDelete(val.maLop)}/>
                            </th>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                {!isSearch ? 
                <Pagination max = {totalPage} select={page} onPageChange={handlePageChange}/> : null}
    <FormThemLop open={openFormThemLop}
      onClose={()=>setOpenFormThemLop(false)
      }
      refresh={()=> setIsRefresh(!isRefresh)}
    />
    <FormDeleteLop open={openFormXoaLop} onClose={() => setOpenFormXoaLop(false)} maLop={formValueDelete} refresh={() => setIsRefresh(!isRefresh)}/>
    <FormUpdateLop open={openFormSuaLop} onClose={() => setOpenFormSuaLop(false)} data={formValueUpdate} refresh={() => setIsRefresh(!isRefresh)}/>
    </div>
  </div>
      
  )
}

export default DanhSachLop
