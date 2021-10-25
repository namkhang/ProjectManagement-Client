import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import Navbar from '../Layouts/NavbarForMentor';
import SideBar from '../Layouts/SideBar';
import '../Report-Detail/ReportDetail.css'
import { useParams } from 'react-router';



const ProjectDetailForMentor = () => {
    const {id} = useParams()
    const [loading , setLoading] = useState(false)
    const [project , setProject] = useState({member : []})
    

    useEffect(()=>{
        async function getData(){
                let response = await axios.get(`http://localhost:5000/admin/get-project-detail/${id}` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    setLoading(true)
                    setProject(response.data.dataProject)
               
        }
        getData()
    } ,[])



    if(Cookies.get("mentorID")){
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
                                <h1 className="mt-4">{project.projectName}</h1>
                                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Project create date: {project.createAt}</li>
                                </ol>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2 font-weight-bold">
                                                        <div className="mb-2"><span>Project Creator Name:</span></div>
                                                        <div className="mb-2"><span>Total Member:</span></div>
                                                        <div className="mb-2"><span>Mentor:</span></div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="mb-2"><a href={`/mentor/profile/${project.creatorID}`}>{project.creatorName}</a></div>
                                                        <div className="mb-2"><a>{project.member.length}</a></div>
                                                        <div className="mb-2"><a href={`/mentor/profile/${project.mentorID}`}>{project.mentorName}</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
    
                                    <div className="row custom-line mb-2">
                                    <span>Status</span>
                                    </div>
    
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <ul>
                                                    <li>
                                                        <p>{project.status}</p>
                                                    </li>
                                                </ul>
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
                                                        <p>{project.description}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    
                                    <div className="row custom-line mb-2">
                                    <span>Member</span>
                                    </div>
    
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <ul>
                                                    {project.member.map(i => 
                                                        <li>
                                                            <p><a href={`/mentor/profile/${i.userID}`}>{i.fullname}</a></p>
                                                        </li>
                                                    )}
                                                
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

export default ProjectDetailForMentor;
