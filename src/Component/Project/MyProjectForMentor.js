import axios from 'axios';
import Cookies, { get } from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/NavbarForMentor'
import SideBar from '../Layouts/SideBar'
import Loading from '../Loading/Loading';


import '../Reports/MyReport.css'

const MyProjectForMentor = (props) => {
    const [project , setProject] = useState([])
    const [loading , setLoading] = useState(false)




    function ToEProjectDetail(projectID){
            window.location.href = `http://localhost:3000/mentor/project-detail/${projectID}`
    }

    useEffect(()=> {
                async function getData(){
                    let response = await axios.get(`http://localhost:5000/mentor/my-project/${Cookies.get("mentorID")}` , {headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }})
                    setProject(response.data.dataProject)
                    setLoading(true)
                }
                getData()
    } , [])


    if(Cookies.get("mentorID")){
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
                                <h1 className="mt-4">Project List</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                                <div className="row">
    
                     <div className="col-xl-6">

                
                    {project.map(i => 
    <div onClick={() => ToEProjectDetail(i._id)} className="card card-margin shadow p-3 mb-5">
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
}
    else{
        window.location.href = "/login"
    }

  
}

export default MyProjectForMentor;
