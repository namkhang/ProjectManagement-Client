import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading'
import io from "socket.io-client"
import { useParams } from 'react-router';
import Navbar from '../Layouts/NavbarForAdmin';
import SideBar from '../Layouts/SideBar';
import './ReportDetail.css'


let socket = io("http://localhost:5000/")

const ReportDetailForAdmin = () => {
    let {id} = useParams()
    const userData = localStorage.getItem("adminData") ? JSON.parse(localStorage.getItem("adminData")) : {}
    const [report , setReport] = useState({reportData : [] , reportComment : []})
    const [loading , setLoading] = useState(false)
    const [project , setProject] = useState({})
    

    useEffect(()=>{
        socket.emit("join-room" , id)
        async function getData(){
                let response = await axios.get(`http://localhost:5000/user/get-report-detail/${id}` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                let response2 = await axios.get(`http://localhost:5000/user/get-project-detail/${response.data.reportData.projectID}` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setLoading(true)
                setReport(response.data.reportData)
                setProject(response2.data.projectData)
        }
        getData()
    } ,[id])

    function toProfile(userID){
        window.location.href = `http://localhost:3000/mentor/profile/${userID}`
    }

    async function CreateComment(){
        let body = {
            reportID : id ,
            content : document.getElementById("content").value ,
            userID_Comment : userData._id ,
            userImage_Comment : userData.image ,
            userName_Comment : userData.fullname 
        }
        socket.emit("create-report-comment" , body)
        socket.on("report-comment-done" , (data)=> {
            setReport(data)
        })
        document.getElementById("content").value = ""
    }

    
    function TxtCreateComment(event){
        if(event.keyCode === 13){
          let body = {
              reportID : id ,
              content : document.getElementById("content").value ,
              userID_Comment : userData._id ,
              userImage_Comment : userData.image ,
              userName_Comment : userData.fullname 
          }
          socket.emit("create-report-comment" , body)
          socket.on("report-comment-done" , (data)=> {
              setReport(data)
          })
          document.getElementById("content").value = ""
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
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">{report.reportName}</h1>
                                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Report date: {report.createAt}</li>
                                    <li className="breadcrumb-item active">Project name: {report.projectName}</li>
                                </ol>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2 font-weight-bold">
                                                        <div className="mb-2"><span>Emploee Name:</span></div>
                                                        <div className="mb-2"><span>Report Template:</span></div>
                                                        <div className="mb-2"><span>Mentor:</span></div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="mb-2"><span>{report.reporterName}</span></div>
                                                        <div className="mb-2"><span>{report.reportTemplateName}</span></div>
                                                        <div className="mb-2"><span>{project.mentorName}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                                {Object.keys(report.reportData).map(i => 
                                <>
    
                                    <div className="row custom-line mb-2">
                                    <span>{i}</span>
                                    </div>
    
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <ul>
                                                    <li>
                                                        <p>{report.reportData[i]}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>
                                )}
    
    
                               
    
                                {/* Comment */}
                                <div className="row comment-line mb-4">
                                    <span>Comments</span>
                                </div>
                                
                                <div className="row d-flex justify-content-right">
                                    <div className="col-md-10">
                                        <div className="headings d-flex justify-content-between align-items-center mb-3">
                                            <h5>Comments({report.reportComment.length})</h5>
                                        </div>
                                        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                                            <img class="img-fluid img-responsive rounded-circle mr-2" src={userData.image} width="38"/>
                                            <input onKeyUp={TxtCreateComment} id="content" type="text" class="form-control mr-3" placeholder="Add comment"/>
                                            <button onClick={CreateComment} class="btn btn-primary comment" type="button"><i class="fas fa-paper-plane"></i> Comment</button>
                                        </div>
                                       
                                        {report.reportComment.map(i2 => 
                                                  <div className="card p-3 mt-2">
                                                  <div className="d-flex justify-content-between align-items-center">
                                                      <div onClick={() => toProfile(i2.userID_Comment)} className="user d-flex flex-row align-items-center"> <img src={i2.userImage_Comment} width="30" className="user-img rounded-circle mr-2"/> <span><small className="font-weight-bold text-primary">{i2.userName_Comment}</small>  <small className="font-weight-bold">{i2.content} </small></span> </div> <small>{i2.createAt_Comment}</small>
                                                  </div>
                                                  <div className="action d-flex justify-content-between mt-2 align-items-center">
                                                      <div className="reply px-4"> <small>Remove</small></div>
                                                      <div className="icons align-items-center"> <i className="fas fa-check-circle check-icon text-primary"></i> </div>
                                                  </div>
                                              </div>
                                        )}


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

export default ReportDetailForAdmin;
