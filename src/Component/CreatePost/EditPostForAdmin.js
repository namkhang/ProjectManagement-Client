import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import NavbarForMentor from '../Layouts/NavbarForAdmin'
import SideBar from '../Layouts/SideBar'

const EditPostForAdmin = () => {
    const {id} = useParams()
    const [post , setPost] = useState({})

    useEffect(()=>{
            async function getData(){
                    let response = await axios.get(`http://localhost:5000/admin/get-post-detail/${id}` , { headers :
                        {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        }
                })
                setPost(response.data.dataPost)
            }
            getData()
    } , [])

    async function DeletePost(){
        let check = window.confirm("Bạn có muốn xóa bài đăng này")
        if(check === true){
            let response = await axios.delete(`http://localhost:5000/admin/delete-post/${id}` , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success === true){
                window.location.href = "/admin"
            }
        }
       
    }

    async function UpdatePost(){
        if(document.getElementById("Description").value === ""){
            alert("Không để trống các trường")
    }
    else{
        if(document.getElementById("file").files[0]){
        let userData = JSON.parse(localStorage.getItem("adminData"))
        let formData = new FormData();
        formData.append("content" , document.getElementById("Description").value)
        formData.append("imagePost" , document.getElementById("file").files[0])
        let response = await axios.put(`http://localhost:5000/mentor/edit-post/${id}` , formData , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success === true){
            window.location.href = '/admin'
        }
    }
    else{
        alert("Không có file đính kèm")
    }
    }
    }
    function changeImage(event){
        let image = URL.createObjectURL(event.target.files[0])
        document.getElementById("image").src = image
        
    }

    if(Cookies.get("adminID")){
        return (
            <>
               <NavbarForMentor/>
               <div id="layoutSidenav">
                   <SideBar/>
                   <div id="layoutSidenav_content">
                       <main>
                           <div className="container-fluid px-4">
                               <h1 className="mt-4">Edit Post</h1>
                               <ol className="breadcrumb mb-4">
                                   <li className="breadcrumb-item"> <a href="/">Report</a> </li>
                                   <li className="breadcrumb-item active">Create Report</li>
                               </ol>
                               <div className="row justify-content-center">
                                   <div className="col-lg-7">
                                       <form className="needs-validation" >

                                           <div className="form-group">
                                                   <label className="form-label">Description</label>
                                                   <textarea defaultValue={post.content}  className="form-control" id="Description" rows="3"></textarea>
                                           </div>
                                           <div className="form-group">
                                                   <img src="" id="image" />
                                                   <input type="file" id="file"  className="form-control" onChange={changeImage} />
                                           </div>
               
       
                                  
                                           
                                       </form>
                                   </div>
                               </div>
                  
                               <div className="row mt-4">
                                   <div className="col text-center">
                                       <button onClick={UpdatePost} className="btn btn-primary" type="submit">Edit Post</button>
                                   </div>
                                   <div className="col text-center">
                                       <button onClick={DeletePost} className="btn btn-primary" type="submit">Delete Post</button>
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

export default EditPostForAdmin;
