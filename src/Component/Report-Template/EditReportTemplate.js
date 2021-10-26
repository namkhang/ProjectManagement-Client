import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"


import NavbarForMentor from "../Layouts/NavbarForMentor"
import { useParams } from 'react-router';

const EditReportTemplate = () => {
    const {id} = useParams()
    const [elementInput , setElementInput] = useState([])
    const [reportTemplate , setReportTemplate] = useState({})
    const [columns , setColumns] = useState([])
    const curentIndex = useRef(0)



    useEffect(()=>{
       async function getData(){
        let response = await axios.get(`http://localhost:5000/admin/get-reporttemplate-detail/${id}` , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        setReportTemplate(response.data.dataReportTemplate)
        let result =   response.data.dataReportTemplate.field.map((i,index) => ({id : `field${index + 1}` , value : i}))      
        setElementInput(result)
        setColumns(result)
        curentIndex.current = result.length + 1
       }
       getData()
    } , [])

    useEffect(()=>{
        for (let i = 0 ; i < elementInput.length ; i++){ // giữ lại các trường người dùng đã nhập sau khi xóa
            document.getElementById(elementInput[i].id).value = elementInput[i].value
        }
    })

    




  

    function addField(){
      
        let newElementInput = [...elementInput]  
        let newColummns = [...columns]
        newColummns.push({id : `field${curentIndex.current}` , value : ""})
        newElementInput.push({id : `field${curentIndex.current}` , value : ""})
        setElementInput(newElementInput)
        setColumns(newColummns)
        curentIndex.current = curentIndex.current + 1

    }

    function deleteField(idElement){
        const newElementInput = [...elementInput]  
        const newColummns = [...columns]
        for(let index in newElementInput){
            if(newElementInput[index].id === idElement){
                newElementInput.splice(index ,1)
            }
        }
        for(let index1 in newColummns){
            if(newColummns[index1].id === idElement){
                newColummns.splice(index1 ,1)
            }
        }
     
        setElementInput(newElementInput)
        setColumns(newColummns)
 
    }

    function changeColumnsName(id){
        return (event) =>{
            let newElementInput = [...elementInput]
            let newColumn = [...columns]
            for (let index in newElementInput){
                if(newElementInput[index].id === id){
                    newElementInput[index].value = event.target.value
                }
            }
            for (let index1 in newColumn){
                if(newColumn[index1].id === id){
                    newColumn[index1].value = event.target.value
                }
            }

            setElementInput(newElementInput)
            setColumns(newColumn)
        }
       
    }

    async function updateReportTemplate(){
        let listField = []
        let userData = JSON.parse(localStorage.getItem("mentorData"))
        for (let i = 0 ; i < elementInput.length ; i++){
            listField.push(elementInput[i].value)
        }

        let body = {
            reportTemplateName : document.getElementById("templateName").value,
            description : document.getElementById("description").value,
            field : listField
        }
        let response = await axios.put(`http://localhost:5000/mentor/update-report-template/${id}` , body , {headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        if(response.data.success === true){
            alert("Updated")
            window.location.reload()
        }
        else{
            alert("Fail")
        }
             
    }

    if(Cookies.get("mentorID")){

        return (
            <>
                <NavbarForMentor/>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Update Report Template</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"> <a href="">Report</a> </li>
                                    <li className="breadcrumb-item active">Create Template</li>
                                </ol>
                                <div className="row justify-content-center">
                                    <div className="col-lg-7">
                                        <form className="needs-validation" >
                                            <div className="form-group">
                                                <label className="form-label">Template Name *</label>
                                                <input defaultValue={reportTemplate.reportTemplateName} type="text" className="form-control" id="templateName" required />
                                                <div className="invalid-feedback">
                                                Please provide a template name.
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea defaultValue={reportTemplate.description} className="form-control" id="description" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Field *</label>

                                                {elementInput.map(i1 =>
                                                 elementInput.length  === 1 ?

                                                 <div className="input-group mb-3">
                                                    <input type="text" onKeyUp={changeColumnsName(i1.id)} className="form-control me-5" name="field" id={i1.id} placeholder="Nhập tên cột" aria-describedby="basic-addon2" />
                                                 </div>
                                                        :
                                                <div className="input-group mb-3">
        
                                                        <input type="text" onKeyUp={changeColumnsName(i1.id)} className="form-control me-5" name="field" id={i1.id} placeholder="Nhập tên cột"  aria-describedby="basic-addon2" /> 
                                                        <div className="input-group-append">
                                                        <button className="btn btn-danger" onClick={() => deleteField(i1.id)} type="button"><i className="fas fa-times"></i> Delete</button> 
                                                        </div> 
                                                </div>
                                                    )}

                                               
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
                                               <th className={i2.id} scope="col">{i2.value}</th>
                                            )}
                                            
                                        </tr>
                                    </thead>
                                </table>
                                <div className="row mt-4">
                                    <div className="col text-center">
                                        <button onClick={updateReportTemplate} className="btn btn-primary" type="submit">Update Report Template</button>
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

export default EditReportTemplate;
