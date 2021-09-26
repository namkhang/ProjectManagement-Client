import Cookies from 'js-cookie';
import React, { useState } from 'react';
import axios from "axios"


import Navbar from '../Layouts/Navbar';
import SideBar from '../Layouts/SideBar';

const CreateReportTemplate = () => {
    const [elementInput , setElementInput] = useState(["field1"])
    const [columns , setColumns] = useState(["field1"])

    function addField(){
        const newElementInput = [...elementInput]  
        const newColummns = [...columns]
        newColummns.push(`field${newColummns.length + 1}`)
        newElementInput.push(`field${elementInput.length +  1}`)
        setElementInput(newElementInput)
        setColumns(newColummns)
    }

    function deleteField(idElement){
        elementInput.splice(elementInput.indexOf(`field${idElement}`) ,1)
        columns.splice(columns.indexOf(`field${idElement}`) ,1)
        let field = document.getElementById(idElement) // vì có chung index khi add nên chỉ cần dùng chung chỉ số index
        let column = document.getElementsByClassName(`field${idElement}`)[0]
        field.remove()
        column.remove()
        setElementInput(elementInput)
        setColumns(columns)
    }

    function changeColumnsName(event){
        let nameColumn = document.getElementsByClassName(event.target.id)[0] // vì id của thẻ input trùng với className của thẻ th
        nameColumn.innerHTML = event.target.value
    }

    async function createReportTemplate(){
        let listField = []
        let userData = JSON.parse(localStorage.getItem("userData"))
        for (let i = 0 ; i < elementInput.length ; i++){
            let idElement = elementInput[i]
            let inputValue = document.getElementById(idElement).value
            listField.push(inputValue)
        }

        let body = {
            reportTemplateName : document.getElementById("templateName").value,
            creatorID : userData._id ,
            creatorName : userData.fullname ,
            description : document.getElementById("description").value,
            field : listField
        }
        let response = await axios.post("http://localhost:5000/mentor/create-report-template" , body , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        if(response.data.success === true){
            console.log(response); 
            alert("Created")
        }
        else{
            alert("Fail")
        }
             
    }

    if(Cookies.get("mentorID")){
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Create Report Template</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"> <a href="">Report</a> </li>
                                    <li className="breadcrumb-item active">Create Template</li>
                                </ol>
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <form className="needs-validation" >
                                            <div className="form-group">
                                                <label className="form-label">Template Name *</label>
                                                <input type="text" className="form-control" id="templateName" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea className="form-control" id="description" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Field *</label>
                                                <div className="input-group mb-3">
    
                                                    {elementInput.map((i1,index1) =>
                                                        index1 !== 0 ?
                                                        <div id={index1 + 1}>
                                                        <input type="text" onKeyUp={changeColumnsName} className="form-control me-5" name="field" id={i1} placeholder="Nhập tên cột" aria-describedby="basic-addon2" /> 
                                                        <div className="input-group-append">
                                                        <button className="btn btn-danger" onClick={() => deleteField(index1 + 1)} type="button"><i className="fas fa-times"></i> Delete</button> 
                                                        </div> 
                                                        </div>  
                                                        :
                                                       
                                                        <input type="text" onKeyUp={changeColumnsName} className="form-control me-5" name="field" id={i1} placeholder="Nhập tên cột" aria-describedby="basic-addon2" />
                                                       
                                                    )}

                                                </div>
                                                <button type="button" onClick={addField} className="btn btn-success"><i className="fas fa-plus"></i> Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Reporter Name</th>
                                            <th scope="col">Project Name</th>
                                            <th scope="col">Task</th>
                                            {columns.map(i2  =>
                                               <th className={i2} scope="col"></th>
                                            )}
                                            
                                        </tr>
                                    </thead>
                                </table>
                                <div className="row mt-4">
                                    <div className="col text-center">
                                        <button onClick={createReportTemplate} className="btn btn-primary" type="submit">Create Report Template</button>
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

export default CreateReportTemplate;
