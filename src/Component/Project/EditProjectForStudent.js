import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import Loading from '../Loading/Loading'


import Navbar from "../Layouts/Navbar"
import { useParams } from 'react-router';

const EditProjectForStudent = () => {
    const {id} = useParams()
    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {}
    const [loading  ,setLoading] = useState(false)
    const [project , setProject] = useState({member : []})
    const [members , setMember] = useState([])


    useEffect(()=>{
                async function getData(){
                            let response3 = await axios.get(`http://localhost:5000/admin/get-project-detail/${id}` , {
                                headers :{
                                    Authorization : `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            setProject(response3.data.dataProject)
                            setMember(response3.data.dataProject.member)
                            setLoading(true)
                }
                getData()
    } , [])

  

    async function OnUpdateProject(){
                    if(userData.status === "Pending"){
                        let newMember = [...project.member]
                        newMember.push({
                            userID : userData._id,
                            fullname : userData.fullname
                        })
                        
                        let body = {
                            projectName : document.getElementById("projectname").value,
                            mentorID : document.getElementById("mentor").value,
                            mentorName : document.getElementById(document.getElementById("mentor").value).innerText,
                            member : newMember  ,
                            creatorID : document.getElementById("creatorid").value,
                            creatorName : document.getElementById("creatorname").value,
                            description :  document.getElementById("description").value,
                            status : document.getElementById("status").value
                        }
                        let response = await axios.put(`http://localhost:5000/admin/update-project/${id}` , body , {
                            headers : {
                                Authorization : `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        if(response.data.success === true){
                            alert("Updated")
                            let newUserData = {...userData}
                            newUserData.status = "Ok"
                            localStorage.setItem("userData" , JSON.stringify(newUserData))
                            window.location.reload()
                        }
            
                    }
                    else{
                                alert("Bạn đã có dự án rồi !!!!")
                    }
     
    }

    if(Cookies.get("userID")){
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
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Edit Project</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"> <a href="/admin/list-project">Project</a> </li>
                                    <li className="breadcrumb-item active">Edit Project</li>
                                </ol>
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <form className="needs-validation" >
                                            <div className="form-group">
                                                <label className="form-label">Project Name *</label>
                                                <input disabled defaultValue={project.projectName} type="text" className="form-control" id="projectname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Creator ID *</label>
                                                <input disabled defaultValue={project.creatorID} type="text" className="form-control" id="creatorid" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Creator Name *</label>
                                                <input disabled defaultValue={project.creatorName} type="text" className="form-control" id="creatorname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label  className="form-label">Description</label>
                                                <textarea disabled defaultValue={project.description} className="form-control" id="description" rows="3"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select disabled defaultValue={project.status} id="status" className="form-select" aria-label="Default select example">
                                                    <option value="0" disabled>Choose mentor...</option>
                                                 
                                                    <option  value="Ok">Ok</option>
                                                    <option  value="Pending">Pending</option>

                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Mentor</label>
                                                <select disabled defaultValue={project.mentorID} id="mentor" className="form-select" aria-label="Default select example">
                                                    <option id={project.mentorID} value={project.mentorID}>{project.mentorName}</option>

                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Member *</label>

                                            {members.map((member) =>
                                            <div className="input-group mb-3">
    
                                                        <select disabled defaultValue={member.userID}  className="form-select" aria-label="Default select example">
                                                                <option value="0" disabled>Choose member...</option>
                                                                <option disabled value={member.userID}>{member.fullname}</option>
                                                
                                                        </select> 
                                            </div>
                                                )}   
                
                                            </div>
                                            {userData.status === "Pending" ? 
                                            <div className="form-group">
                                                <label className="form-label">New Member *</label>
                                                
                                            <div className="input-group mb-3">
                                 
                                        <select disabled defaultValue={userData._id} id="user-choose-project" className="form-select" aria-label="Default select example">
                                        <option value="0" disabled>Choose member...</option>
                                        <option disabled  value={userData._id}>{userData.fullname}</option>

                                         </select>
                                         </div> 
                                         </div>
                                         :
                                         ""
                                         }
                                         
                                        </form>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col text-center">
                                        <button onClick={OnUpdateProject} className="btn btn-primary" type="submit">Update Project</button>
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

export default EditProjectForStudent;
