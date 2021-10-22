import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import Loading from '../Loading/Loading'


import Navbar from "../Layouts/NavbarForAdmin"
import { useParams } from 'react-router';

const EditProject = () => {
    const {id} = useParams()
    const [elementInput , setElementInput] = useState([])
    const [loading  ,setLoading] = useState(false)
    const [mentor , setMentor] = useState([])
    const [student , setStudent] = useState([])
    const [project , setProject] = useState({member : []})
    const [members , setMember] = useState([])


    useEffect(()=>{
                async function getData(){
                            let response = await axios.get("http://localhost:5000/mentor/get-all-mentor" , {
                                headers :{
                                    Authorization : `Bearer ${localStorage.getItem("token")}`
                                }
                            })

                            let response2 = await axios.get("http://localhost:5000/user/get-student" , {
                                headers :{
                                    Authorization : `Bearer ${localStorage.getItem("token")}`
                                }
                            })

                            let response3 = await axios.get(`http://localhost:5000/admin/get-project-detail/${id}` , {
                                headers :{
                                    Authorization : `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            setMentor(response.data.dataMentor)
                            setStudent(response2.data.userData)
                            setProject(response3.data.dataProject)
                            setMember(response3.data.dataProject.member)
                            setLoading(true)
                }
                getData()
    } , [])

    function AddField(){
        let newElement = [...elementInput]
        if(newElement.length === 0){
            let id = `field${project.member.length + 1}`
            newElement.push(id)
            setElementInput(newElement)
        }
        else{
            let id = `field${parseInt((newElement[newElement.length - 1].substring(5))) + 1}`
            newElement.push(id)
            setElementInput(newElement)
        }

    }

    function DeleteElement(){
        let newElement = [...elementInput]
        newElement.pop()
        setElementInput(newElement)
    }
    
    function DeleteMember(){
        let newMember = [...members]
        newMember.pop()
        setMember(newMember)
    }

    async function OnUpdateProject(){
            let format = members.map((i , index) => `field${index + 1}`)
            let result = [...format , ...elementInput]
            function HandleNewArray(i){
                   let obj = {}
                   obj.userID = document.getElementById(i).value
                   obj.fullname =  document.getElementById(document.getElementById(i).value).innerText
                   return obj
            }
            let member = result.map(HandleNewArray)
            let body = {
                projectName : document.getElementById("projectname").value,
                mentorID : document.getElementById("mentor").value,
                mentorName : document.getElementById(document.getElementById("mentor").value).innerText,
                member ,
                creatorID : Cookies.get("adminID"),
                creatorName : JSON.parse(localStorage.getItem("adminData")).fullname,
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
                window.location.reload()
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
                                                <input defaultValue={project.projectName} type="text" className="form-control" id="projectname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Creator ID *</label>
                                                <input disabled defaultValue={project.creatorID} type="text" className="form-control" id="projectname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Creator Name *</label>
                                                <input disabled defaultValue={project.creatorName} type="text" className="form-control" id="projectname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea defaultValue={project.description} className="form-control" id="description" rows="3"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select defaultValue={project.status} id="status" className="form-select" aria-label="Default select example">
                                                    <option value="0" disabled>Choose mentor...</option>
                                                 
                                                    <option  value="Ok">Ok</option>
                                                    <option  value="Pending">Pending</option>

                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Mentor</label>
                                                <select defaultValue={project.mentorID} id="mentor" className="form-select" aria-label="Default select example">
                                                    <option value="0" disabled>Choose mentor...</option>
                                                    {mentor.map( i2 => 
                                                            <option id={i2._id} value={i2._id}>{i2.fullname}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Member *</label>

                                            {members.map((member,index) =>
                                            <div className="input-group mb-3">
    
                                                        <select  defaultValue={member.userID} id={`field${index + 1}`} className="form-select" aria-label="Default select example">
                                                                <option value="0" disabled>Choose member...</option>
                                                                {student.map( i4 => 
                                                                        i4.status === "Ok" ?
                                                                        <option disabled id={i4._id} value={i4._id}>{i4.fullname}</option>
                                                                        :
                                                                        <option id={i4._id} value={i4._id}>{i4.fullname}</option>
                                                                )}
                                                        </select> 
                                                    <div   div className="input-group-append">
                                                            <button onClick={DeleteMember} className="btn btn-danger"  type="button"><i className="fas fa-times"></i> Delete</button> 
                                                    </div> 
                                            </div>
                                                )}    

                                            {elementInput.map(i1 =>
                                                <div className="input-group mb-3">
        
                                                            <select  defaultValue="0" id={i1} className="form-select" aria-label="Default select example">
                                                                    <option value="0" disabled>Choose member...</option>
                                                                    {student.map( i3 => 
                                                                            i3.status === "Ok" ?
                                                                            <option disabled id={i3._id} value={i3._id}>{i3.fullname}</option>
                                                                            :
                                                                            <option id={i3._id} value={i3._id}>{i3.fullname}</option>
                                                                    )}
                                                            </select> 
                                                        <div   div className="input-group-append">
                                                                <button onClick={DeleteElement} className="btn btn-danger"  type="button"><i className="fas fa-times"></i> Delete</button> 
                                                        </div> 
                                                </div>
                                                    )}

                                               
                                                <button type="button" onClick={AddField}  className="btn btn-success"><i className="fas fa-plus"></i> Add</button>
                                            </div>
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

export default EditProject;
