import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import Navbar from '../Layouts/Navbar';
import SideBar from '../Layouts/SideBar';
import '../Report-Detail/ReportDetail.css'
import { useParams } from 'react-router';



const UserDetail = () => {

    const {id} = useParams()
    const [loading , setLoading] = useState(false)
    const [user , setUser] = useState({})
    

    useEffect(()=>{
        async function getData(){
                let response = await axios.get(`http://localhost:5000/admin/user-detail/${id}` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success === true){
                    setLoading(true)
                    setUser(response.data.dataUser)
                }
                else{
                    alert("Bạn chưa có project !!!")
                    window.location.href = "/"
                }
                    
               
        }
        getData()
    } ,[])



    if(Cookies.get("adminID")){
        if(loading === false){
                return (
                    <Loading />
                )
        }
        else{
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">{user.fullname}</h1>
                                <ol className="breadcrumb mb-4">
                        
                                </ol>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2 font-weight-bold">
                                                        <div className="mb-2"><span>Email:</span></div>
                                                        <div className="mb-2"><span>MSSV:</span></div>
                                                        <div className="mb-2"><span>Class:</span></div>
                                                        <div className="mb-2"><span>Address:</span></div>
                                                        <div className="mb-2"><span>Gender:</span></div>
                                                        <div className="mb-2"><span>Phone:</span></div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="mb-2"><a>{user.email}</a></div>
                                                        <div className="mb-2"><a>{user.MSSV}</a></div>
                                                        <div className="mb-2"><a>{user.className}</a></div>
                                                        <div className="mb-2"><a>{user.address}</a></div>
                                                        <div className="mb-2"><a>{user.gender}</a></div>
                                                        <div className="mb-2"><a>{user.phone}</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                    
                                    <div className="row custom-line mb-2">
                                    <span>Description</span>
                                    </div>
    
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <ul>
                                                    <li>
                                                        <p>{user.description}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    
                        
    
                           
                        
    
    
                                
                            
                            </div>
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright &copy; Your Website 2021</div>
                                    <div>
                                        <a href="#">Privacy Policy</a>
                                        &middot;
                                        <a href="#">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </>
        );
    }
}
   else{
       window.location.href = "/login"
   }
}

export default UserDetail;
