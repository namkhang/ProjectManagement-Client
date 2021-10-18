import React, { useEffect, useState } from 'react';

import NavbarForMentor from "../Layouts/NavbarForMentor"
import './Home.css'
import axios from 'axios';
import Cookies from 'js-cookie';

function HomeForMentor(props) {
    const [post , setPost] = useState([])
    const mentorID = Cookies.get("mentorID")
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ""
    const {fullname : userName_commnent , image} = JSON.parse(localStorage.getItem("mentorData")) ? JSON.parse(localStorage.getItem("mentorData")) : {fullname : ""}

    useEffect(()=>{
        async function getData(){
            let response = await axios.get("http://localhost:5000/user/get_all_post" , {headers : {
                Authorization : `Bearer ${token}`
            }});
            setPost(response.data.dataPost)
        }
        getData()
    } , [])

   async function Comment(postID){
       let body = {
        postID ,
        userID_comment : mentorID ,
        userName_commnent , 
        image ,
        content_comment : document.getElementById(postID).value
       }
        let response = await axios.post("http://localhost:5000/user/create_post_comment" , body , {headers :{
            Authorization : `Bearer ${token}`
        }})
        setPost(response.data.newPost)
        document.getElementById(postID).value = ""
    }

    async function Like(postID){
            let data = {
                postID
            }
            let response = await axios.post("http://localhost:5000/user/like" , data , {headers :{
                Authorization : `Bearer ${token}`
            }})
            setPost(response.data.newPost)
    }

    if(mentorID){
        return (
            <div>
            <NavbarForMentor/>
            <div className="container">
           
            {post.map(i => 
    
    <div style={{marginTop : "30px"}} className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
        <div className="header-Stt">
            <span className="User-img"><img src={i.image} className="img-fluid rounded-start rounded-circle Avt-User mr-2" alt="..." />
            </span>
            <span className="User-name mr-1">{i.userName} </span>
            <span className="User-name__active">{i.createAt}</span>
        </div>
        <div className="Description mb-3">
                {i.content}
        </div>
        <div className="Description_img_video mb-3">
                    <img className="h-100" src={i.imagePost} style={{ border: 'none', overflow: 'hidden' }}/>
        </div>
        <span style={{marginLeft : '45px'}} className="User-name__active">{i.like} lượt thích</span>
        <span style={{marginLeft : '100px'}} className="User-name__active">{i.post_comment.length} lượt bình luận</span>
        <div style={{marginTop : "10px"}} className="Comment border-bottom border-top row">
            <a onClick={() => Like(i._id)} className="col-4 text-center Comment-Like p-2"><i class="fa fa-heart-o" aria-hidden="true"></i> Thích</a>
            <div className="col-4 text-center Comment-cmt p-2">
                <p>
                    <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fa fa-comment-o"></i> Bình Luận
                    </a>
    
                </p>
                {/* <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div> */}
    
            </div>
            {/* <div className="col-4 text-center Comment-share p-2"> <i class="fa fa-share" aria-hidden="true"></i> like</div> */}
            <div className="col-4 text-center Comment-share p-2"> <div>
    {/* Button trigger modal */}
    <a  data-toggle="modal" data-target="#exampleModal">
    <i class="fa fa-share" aria-hidden="true"></i> Chia sẻ
    </a>
    {/* Modal */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
    <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
    </div>
    <div className="modal-body">
    ...
    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary">Save changes</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    
        </div>
        {/* bình luận */}
        <div>
            {/* inputcmt */}
            <div className="collapse mt-2 mb-3" id="collapseExample">
                <input type="text" id={i._id} className="form-control input-cmt mb-2" />
                <button type="submit" onClick={() => Comment(i._id)} class="btn btn-sent my-1 float-right mb-4"><i class="fa fa-paper-plane"></i></button> <br></br><br></br>  <br></br>
                {/* endinputcmt */}
                <div className="scroll p-3">
                    {i.post_comment.map(item => 
    
                         <div className="card mb-3" style={{ maxWidth: '540px' }}>
                         <div className="row g-0">
                             <div className="col-2 pt-3 ml-2">
                                 <img src={item.image_comment} className="img-fluid rounded-start rounded-circle" alt="..." />
                             </div>
                             <div className="col-9">
                                 <div className="card-body p-0">
                                     <h5 className="card-title NameUser pt-2 mb-1">{item.userName_commnet}</h5>
                                     <p className="card-text Cmt_Description mb-1">{item.content_comment}</p>
                                     <p className="card-text"><small className="text-muted">{item.createAt_comment}</small></p>
                                 </div>
                             </div>
                         </div>
                     </div>
    
                        )}
                  
              
               
    
    
                </div>
            </div>
            {/* endcmt */}
    
    
        </div>
    
    
    </div>
    <div className="col-md-3"></div>
    
    </div>
    
            )}
    
            
    
            </div>
            </div>
        );
    }
    else{
        window.location.href = "/login"
    }
   
}

export default HomeForMentor;