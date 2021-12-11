import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/NavbarForAdmin'
import SideBar from '../Layouts/SideBar'
import Loading from '../Loading/Loading'
import './MyReport.css'

const MyReportForAdmin = (props) => {
    const [report , setReport] = useState([])
    const [project , setProject] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
      async  function getData(){
        let response = await axios.get(`http://localhost:5000/admin/list-project` , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        setLoading(true)
        setProject(response.data.dataProject)
    }
    getData()
           
    } , [])

    async function getReport(event){
        let response = await axios.get(`http://localhost:5000/admin/get-report-by-project/${event.target.value}` , {
            headers :{
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        setReport(response.data.dataReport)
    }

    async function SendMail(){
        let response = await axios.post("http://localhost:5000/admin/send-email" , {},{
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
        })
        if(response.data.success === true){
            alert("Success")
        }
    }

    function ToDetailPage(reportID){
        window.location.href = `http://localhost:3000/admin/report-detail/${reportID}`
}

   async function ExportExcel(){
    let fileName = prompt("Nhập tên file")
    let response = await axios.post(`http://localhost:5000/user/export-excel-report` , {fileName}, {headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }})
    if(response.data.success === true){
            window.location.href = `http://localhost:5000/${response.data.link}`
    }   
    }

    if(Cookies.get("adminID")){
        if(loading === false){
            return (
                <Loading />
            )
        }
        else{
        return (
            <div>
            <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Report List</h1>
                                <button onClick={SendMail} className="msg_send_btn" type="button">
                                <button onClick={ExportExcel} style={{marginRight : "50px"}} className="msg_send_btn" type="button">
                                <i class="fas fa-download"></i>
                                </button>
                                        <i className="fa fa-paper-plane-o" aria-hidden="true" />
                                </button>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                                <div className="row">
    
                     <div className="col-xl-6">
                     <div className="form-group">
                                                <label className="form-label">Project </label>
                                                <select onChange={getReport} defaultValue="0" id="project" className="form-select" aria-label="Default select example">
                                                    <option value="0"  disabled>Choose project...</option>
                                                            {project.map(i2 =>
                                                            <option value={i2._id}>{i2.projectName}</option>
                                                            )}
                                                            
                                                  
                                                   
                                                </select>
                    </div>
                
                    {report.map(i => 
    
    <div onClick={() => ToDetailPage(i._id)} className="card card-margin shadow p-3 mb-5">
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
                    <span className="widget-49-pro-title">{i.reportName}</span>
                    <span className="widget-49-meeting-time">{i.createAt.substring(11)}</span>
                </div>
            </div>
            <ol className="widget-49-meeting-points">
                {Object.keys(i.reportData).map(i2 => 
                    <li className="widget-49-meeting-item"><span>{`${i2} : ${i.reportData[i2]}`}</span></li>
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
}
    else{
        window.location.href = "/login"
    }

  
}

export default MyReportForAdmin;
