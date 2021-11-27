import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/NavbarForAdmin'
import SideBar from '../Layouts/SideBar'


import '../Reports/MyReport.css'

const ListUser = (props) => {
    const [user , setUser] = useState([])

    useEffect(()=>{
            async function getData(){
                let response = await axios.get(`http://localhost:5000/admin/list-user` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUser(response.data.dataUser)
            }
            getData()
    } , [])


    function ToEditUser(userID){
            window.location.href = `http://localhost:3000/admin/user-detail/${userID}`
    }


    async function ExportExcel(){
        let fileName = prompt("Nhập tên file")
        let response = await axios.post(`http://localhost:5000/user/export-excel-user` , {fileName}, {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        if(response.data.success === true){
                window.location.href = `http://localhost:5000/${response.data.link}`
        }
    }

    if(Cookies.get("adminID")){

        return (
            <div>
            <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">User List</h1>
                                <button onClick={ExportExcel} className="msg_send_btn" type="button">
                                        <i class="fas fa-download"></i>
                                </button>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                                <div className="row">
    
                     <div className="col-xl-6">

                
                    {user.map(i => 
    <div onClick={() => ToEditUser(i._id)} className="card card-margin shadow p-3 mb-5">
    <div className="card-header no-border">
        <h5 className="card-title">{i.MSSV}</h5>
    </div>
    <div className="card-body pt-0">
        <div className="widget-49">
            <div className="widget-49-title-wrapper">
                <div className="widget-49-date-primary">
                    <span className="widget-49-date-day">20</span>
                    <span className="widget-49-date-month">21</span>
                </div>
                <div className="widget-49-meeting-info">
                    <span className="widget-49-pro-title">{`Mentor:  ${i.fullname}`}</span>
                </div>
            </div>
            <ol className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item"><span>{i.email}</span></li>
                    <li className="widget-49-meeting-item"><span>{i.address}</span></li>
                    <li className="widget-49-meeting-item"><span>{i.gender}</span></li>
                    <li className="widget-49-meeting-item"><span>{i.phone}</span></li>
                    <li className="widget-49-meeting-item"><span>{i.className}</span></li>
                
            </ol>
            <div className="widget-49-meeting-action">
                <a href="#" className="btn btn-sm btn-flash-border-primary">Detail</a>
            </div>
        </div>
    </div>
    </div>
    
                    )}
    
            </div>
    
                                </div>                        
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
                </div>
          
        );
}
    else{
        window.location.href = "/login"
    }

  
}

export default ListUser;
