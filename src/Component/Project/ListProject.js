import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/NavbarForAdmin'
import SideBar from '../Layouts/SideBar'


import '../Reports/MyReport.css'

const ListProject = (props) => {
    const [project , setProject] = useState([])




    function ToEditProject(projectID){
            window.location.href = `http://localhost:3000/admin/edit-project/${projectID}`
    }

    async function getProjectByStatus(event){
        let response = await axios.get(`http://localhost:5000/admin/list-project/${event.target.value}` , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        setProject(response.data.dataProject)
    }

    async function ExportExcel(){
        let fileName = prompt("Nhập tên file")
        let response = await axios.post(`http://localhost:5000/user/export-excel-project` , {fileName}, {headers : {
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
                                <h1 className="mt-4">Project List</h1>
                                <button style={{marginRight : "35px"}} onClick={ExportExcel} className="msg_send_btn" type="button">
                                        <i class="fas fa-download"></i>
                                </button>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                                <div className="row">
    
                     <div className="col-xl-6">

                     <div className="form-group">
                                                <label className="form-label">Satus </label>
                                                <select onChange={getProjectByStatus} defaultValue="0" id="project" className="form-select" aria-label="Default select example">
                                                    <option value="0"  disabled>Choose Project Satus...</option>
                                                    <option value="Ok">Ok</option>
                                                    <option value="Pending">Pending</option>
                                                        
                                                            
                                                  
                                                   
                                                </select>
                    </div>
                
                    {project.map(i => 
    <div onClick={() => ToEditProject(i._id)} className="card card-margin shadow p-3 mb-5">
    <div className="card-header no-border">
        <h5 className="card-title">{i.projectName}</h5>
    </div>
    <div className="card-body pt-0">
        <div className="widget-49">
            <div className="widget-49-title-wrapper">
                <div className="widget-49-date-primary">
                    <span className="widget-49-date-day">{i.createAt.substring(0 , 2)}</span>
                    <span className="widget-49-date-month">{i.createAt.substring(3 , 5)}</span>
                </div>
                <div className="widget-49-meeting-info">
                    <span className="widget-49-pro-title">{`Mentor:  ${i.mentorName}`}</span>
                    <span className="widget-49-meeting-time">{i.createAt.substring(11)}</span>
                </div>
            </div>
            <ol className="widget-49-meeting-points">
                {i.member.map(i2 => 
                    <li className="widget-49-meeting-item"><span>{i2.fullname}</span></li>
                )}
                
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

export default ListProject;
