import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';


import Navbar from '../Layouts/Navbar';
import SideBar from '../Layouts/SideBar';

const CreateReport = () => {
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
                    setProject(responseProject.data.listProject)
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
            let reportData = {}
            for (let i in reportTemplateData){
                reportData[reportTemplateData[i]] = document.getElementById(reportTemplateData[i]).value
            }
            let body  = {
                reportName : document.getElementById("reportName").value,
                reporterID : userData._id ,
                reporterName : userData.fullname ,
                projectID : document.getElementById("project").value , 
                reportTemplateID : document.getElementById("reporttemplate").value ,
                reportData 

            }
            let response = await axios.post(`http://localhost:5000/user/create-report` ,body ,  {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(response.data.success === true){
                    alert("Created")
            }
            
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
