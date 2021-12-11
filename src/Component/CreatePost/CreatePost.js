import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';

import NavbarForMentor from '../Layouts/NavbarForMentor'
import SideBar from '../Layouts/SideBar'

const Createpost = () => {

    async function CreatePost(){
        if(document.getElementById("Description").value === ""){
                alert("Không để trống các trường")
        }
        else{
              if(document.getElementById("file").files[0]){
                let userData = JSON.parse(localStorage.getItem("mentorData"))
                let formData = new FormData();
                formData.append("userID" ,userData._id )
                formData.append("userName" , userData.fullname)
                formData.append("content" , document.getElementById("Description").value)
                formData.append("image" , userData.image)
                formData.append("imagePost" , document.getElementById("file").files[0])
                let response = await axios.post("http://localhost:5000/mentor/create-post" , formData , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success === true){
                    window.location.href = '/mentor'
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

    if(Cookies.get("mentorID")){
        return (
            <>
               <NavbarForMentor/>
               <div id="layoutSidenav">
                   <SideBar/>
                   <div id="layoutSidenav_content">
                       <main>
                           <div className="container-fluid px-4">
                               <h1 className="mt-4">Create Post</h1>
                               <ol className="breadcrumb mb-4">
                                   <li className="breadcrumb-item"> <a href="">Report</a> </li>
                                   <li className="breadcrumb-item active">Create Report</li>
                               </ol>
                               <div className="row justify-content-center">
                                   <div className="col-lg-7">
                                       <form className="needs-validation" >

                                           <div className="form-group">
                                                   <label className="form-label">Description</label>
                                                   <textarea  className="form-control" id="Description" rows="3"></textarea>
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
                                       <button onClick={CreatePost} className="btn btn-primary" type="submit">Create Post</button>
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

export default Createpost;
