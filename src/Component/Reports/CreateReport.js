import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';


import Navbar from '../Layouts/Navbar';
import SideBar from '../Layouts/SideBar';

const CreateReport = () => {
    const [elementInput , setElementInput] = useState([1])
    const [project , setProject] = useState([])
    const [reportTemplate , setReportTemplate] = useState([])
    const [reportTemplateData , setReportTemplateData] = useState([])
    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : ""

    useEffect(() =>{
            async function getData(){
                    let responseProject = await axios.get("http://localhost:5000/user/get-list-project" , {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    let responseReportTemplate = await axios.get("http://localhost:5000/user/get-list-report-template" , {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                    function FilterProjectByUser(item){
                        let count = item.member.filter(i => i.userID === Cookies.get("userID"))
                        if(count.length > 0 ){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                    let result = responseProject.data.listProject.filter(FilterProjectByUser)
                    setProject(result)
                    setReportTemplate(responseReportTemplate.data.listReportTemplate)
            }
            getData()
    } , [])

    async function selectReportTemplate(event){
        let response= await axios.get(`http://localhost:5000/user/get-report-template/${event.target.value}` , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        setReportTemplateData(response.data.reportTemplate.field)
    }

    function changeText(event){
        document.getElementsByClassName(event.target.id)[0].innerHTML = event.target.value
    }   

    async function createReport(){
            if(userData.status === "Ok"){
        if(document.getElementById("reportName").value === ""){
                alert("Không để trống các trường")
        }
        else{
            if(document.getElementById("project").value === "0"){
                alert("Bạn chưa chọn project !!!")
            }
            else{
                if(document.getElementById("reporttemplate").value === "0"){
                    alert("Bạn chưa chọn report template !!!")
                }
                else{
                    let reportData = {}
                    for (let i in reportTemplateData){
                        reportData[reportTemplateData[i]] = document.getElementById(reportTemplateData[i]).value
                    }
                    let formData = new FormData()
                    formData.append("reportName" , document.getElementById("reportName").value)
                    formData.append("reporterID" , userData._id )
                    formData.append("reporterName" , userData.fullname)
                    formData.append("projectID" , document.getElementById("project").value)
                    formData.append("reportTemplateID" , document.getElementById("reporttemplate").value )
                    formData.append("reportData" , JSON.stringify(reportData))
                        
                    elementInput.forEach((i) => {
                        formData.append("files" , document.getElementById(`file${i}`).files[0])
                    })


                    let response = await axios.post(`http://localhost:5000/user/create-report` ,formData ,  {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                    if(response.data.success === true){
                            alert("Created")
                            window.location.href = "/my-report"
                    }
                    


        
                
                }
       
                }
        }
    
               
            }
            else{
                alert("Bạn chưa có project để report !!!")
            }

         
            
    }

    function AddElement(){
        let value = elementInput[elementInput.length - 1]
        console.log(value);
        let newElement = [...elementInput]
        newElement.push(value + 1)
        setElementInput(newElement)
    }
    function DeleteElement(){
        let newElement = [...elementInput]
        newElement.pop()
        setElementInput(newElement)
    }

    if(Cookies.get("userID")){
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Create Report</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"> <a href="">Report</a> </li>
                                    <li className="breadcrumb-item active">Create Report</li>
                                </ol>
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <form className="needs-validation" >
                                            <div className="form-group">
                                                <label className="form-label">Report Name *</label>
                                                <input type="text" className="form-control" id="reportName" required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Report Template </label>
                                                <select onChange={selectReportTemplate} defaultValue="0" id="reporttemplate" className="form-select" aria-label="Default select example">
                                                    <option value="0" disabled>Choose template...</option>
                                                    {reportTemplate.map( i2 => 
                                                            <option value={i2._id}>{i2.reportTemplateName}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Project </label>
                                                <select defaultValue="0" id="project" className="form-select" aria-label="Default select example">
                                                    <option value="0"  disabled>Choose project...</option>
                                                    {project.map(i => 
                                                            <option value={i._id}>{i.projectName}</option>
                                                    )}
                                                   
                                                </select>
                                            </div>
                                            {reportTemplateData.map(i3 =>
                                                    i3 === "Description" 
                                                    ?
                                                <div className="form-group">
                                                    <label className="form-label">Description</label>
                                                    <textarea onKeyUp={changeText} className="form-control" id="Description" rows="3"></textarea>
                                                </div>
                                                    :
                                                    i3 === "Reporter Name" 
                                                    ? 
                                                    <div className="form-group">
                                                    <label className="form-label">{i3}</label>
                                                    <input onKeyUp={changeText} type="text" defaultValue={userData.fullname} className="form-control" id={i3} required />
                                                </div>
                                                :

                                                <div className="form-group">
                                                    <label className="form-label">{i3}</label>
                                                    <input onKeyUp={changeText} type="text" className="form-control" id={i3} required />
                                                </div>
                                            )}
                                         <div className="form-group">
                                         <label className="form-label">File</label>
                                                {elementInput.map(i1 =>
                                                 elementInput.length  === 1 ?  
                                                 <div className="input-group mb-3">    
                                                 <input  type="file" className="form-control" id={`file${i1}`} />
                                                 </div>
                                                        :
                                                <div className="input-group mb-3">
        
                                                         <input  type="file" className="form-control" id={`file${i1}`} />     
                                                        <div className="input-group-append">
                                                        <button className="btn btn-danger" onClick={DeleteElement} type="button"><i className="fas fa-times"></i> Delete</button> 
                                                        </div> 
                                                </div>
                                                    )}
                                    </div>

                                               
                                                <button type="button" onClick={AddElement} className="btn btn-success"><i className="fas fa-plus"></i> Add</button>
                                          
                                            
                                        </form>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            {reportTemplateData.map(i4 =>

                                                <th scope="col">{i4}</th>
                                 
                                            )}
                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {reportTemplateData.map(i5 =>
                                                i5 === "Reporter Name" ?
                                                    <td className={i5}>{userData.fullname}</td>
                                                    :
                                                    <td className={i5}></td>

                                            )}
                                                          
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="row mt-4">
                                    <div className="col text-center">
                                        <button onClick={createReport} className="btn btn-primary" type="submit">Create Report</button>
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
    else{
        window.location.href = "/login"
    }
  
}

   


export default CreateReport;
