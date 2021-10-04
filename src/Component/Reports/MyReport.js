import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import SideBar from '../Layouts/SideBar'

import './MyReport.css'

const MyReport = (props) => {
    const [report , setReport] = useState([])

    useEffect(()=>{
      async  function getData(){
        let userID = Cookies.get("userID")
        let response = await axios.get(`http://localhost:5000/user/my-report/${userID}` , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        setReport(response.data.dataReport)
    }
    getData()
           
    } , [])

    if(Cookies.get("userID")){
        return (
            <div>
            <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Report List</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                                <div className="row">
    
                     <div className="col-xl-6">
                
                    {report.map(i => 
    
    <div className="card card-margin shadow p-3 mb-5">
    <div className="card-header no-border">
        <h5 className="card-title">Report Capstone 2</h5>
    </div>
    <div className="card-body pt-0">
        <div className="widget-49">
            <div className="widget-49-title-wrapper">
                <div className="widget-49-date-primary">
                    <span className="widget-49-date-day">{i.createAt.substring(0 , 2)}</span>
                    <span className="widget-49-date-month">{i.createAt.substring(3 , 4)}</span>
                </div>
                <div className="widget-49-meeting-info">
                    <span className="widget-49-pro-title">{i.projectName}</span>
                    <span className="widget-49-meeting-time">{i.createAt.substring(9)}</span>
                </div>
            </div>
            <ol className="widget-49-meeting-points">
                <li className="widget-49-meeting-item"><span>Expand module is removed</span></li>
                <li className="widget-49-meeting-item"><span>Data migration is in scope</span></li>
                <li className="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li>
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

export default MyReport;
