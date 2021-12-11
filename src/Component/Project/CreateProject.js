import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import Loading from '../Loading/Loading'


import Navbar from "../Layouts/NavbarForAdmin"

const CreateProject = () => {
    const [elementInput , setElementInput] = useState([{id : "field1" , value : "0"}])
    const [loading  ,setLoading] = useState(false)
    const [mentor , setMentor] = useState([])
    const [student , setStudent] = useState([])


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
                            setMentor(response.data.dataMentor)
                            setStudent(response2.data.userData)
                            setLoading(true)
                }
                getData()
    } , [])

    function AddField(){
        let newElement = [...elementInput]
        if(newElement.length === 0){
            let id = 'field1'
            newElement.push({id , value : "0"})
            setElementInput(newElement)
        }
        else{
            let id = `field${parseInt((newElement[newElement.length - 1].id.substring(5))) + 1}`
            newElement.push({id , value : "0"})
            setElementInput(newElement)
        }

    }

    function DeleteElement(){
        let newElement = [...elementInput]
        newElement.pop()
        setElementInput(newElement)
    }

    async function OnCreateProject(){
        if(document.getElementById("projectname").value === "" ||   document.getElementById("description").value === ""){
            alert("Không để trống các trường")     
      }
      else{
        if(document.getElementById("mentor").value === "0"){
            alert("Chưa có mentor nào được chọn")
            }
        else{
            try{
                let member = []
                function HandleNewArray(i){
                    let obj = {}
                    obj.userID = document.getElementById(i.id).value
                    obj.fullname =  document.getElementById(document.getElementById(i.id).value).innerText
                    return obj
                }
                if(elementInput.length > 1){
                    member = elementInput.map(HandleNewArray)
                }
       
            let body = {
                projectName : document.getElementById("projectname").value,
                mentorID : document.getElementById("mentor").value,
                mentorName : document.getElementById(document.getElementById("mentor").value).innerText,
                member ,
                creatorID : Cookies.get("adminID"),
                creatorName : JSON.parse(localStorage.getItem("adminData")).fullname,
                description :  document.getElementById("description").value
            }
            let response = await axios.post("http://localhost:5000/admin/create-project" , body , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success === true){
                alert("Created")
                window.location.href ="/admin/list-project"
            }
            }
            catch(err){
                alert("Chưa chọn thông tin member")
            }
         
        }
                    
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
                                <h1 className="mt-4">Create Project</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"> <a href="">Project</a> </li>
                                    <li className="breadcrumb-item active">Create Project</li>
                                </ol>
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <form className="needs-validation" >
                                            <div className="form-group">
                                                <label className="form-label">Project Name *</label>
                                                <input required type="text" className="form-control" id="projectname" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea className="form-control" id="description" rows="3"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Mentor</label>
                                                <select defaultValue="0" id="mentor" className="form-select" aria-label="Default select example">
                                                    <option value="0" disabled>Choose mentor...</option>
                                                    {mentor.map( i2 => 
                                                            <option id={i2._id} value={i2._id}>{i2.fullname}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Member *</label>

                                            {elementInput.map(i1 =>
                                                <div className="input-group mb-3">
        
                                                            <select  defaultValue={i1.value} id={i1.id} className="form-select" aria-label="Default select example">
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
                                        <button onClick={OnCreateProject} className="btn btn-primary" type="submit">Create Project</button>
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

export default CreateProject;
