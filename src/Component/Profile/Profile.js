import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./styles.css";


export default function ProfileUser() {
  const [profile , setProfile] = useState({}) 
  let {id} = useParams()

  useEffect(()=>{
      async function getData(){
          let response = await axios.get(`http://localhost:5000/user/get-detail-user/${id}` , {headers :{
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }})
          setProfile(response.data.userData)
      }
      
      getData()
  } , [])

  async function openMessage(){
    if(Cookies.get("userID") !== id){
      let response = await axios.post(`http://localhost:5000/user/create-new-chat` , {sender : Cookies.get("userID") , receiver : id}, {headers :{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }})
      window.location.href = '/chat'
    }
  }

  if(Cookies.get("userID")){
    return (
      <div className="app__container">
        {/* <div className="grid wide container__profile-user">
          <h1 className="container__profile-header">My Profile</h1>
        </div> */}
        <main className="profile-page">
          <section className="profile-page__background">
            <div className="profile-page__top">
              <div className="profile-page__content">
                <img alt="" src="/background.jpg" className="profile-page__img" />
              </div>
            </div>
          </section>
  
          <section className="profile-page__bottom">
            <div className="profile-page__bottom-container">
              <div className="profile-page__bottom-body">
                <div className="profile-page__bottom-content">
                  <div className="profile-page__bottom-content-top">
                    <div className="profile-page__bottom-content-left">
                      <div className="profile-page__bottom-content-left-container"></div>
                    </div>
  
                    <div className="profile-page__bottom-content-top-middle">
                      <div className="profile-page__bottom-content-top-middle-cover">
                        <img
                          alt=""
                          src={
                            profile.image
                          }
                          className="profile-page__bottom-content-top-middle-img"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
  
                    <div className="profile-page__bottom-content-right">
                      <div className="profile-page__bottom-content-right-cover">
                        <div className="profile-page__bottom-content-right-btn">
                          <button
                            onClick={openMessage}
                            className="profile-page__bottom-content-right-btn-text"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="profile-page__bottom-content-body">
                    <h3 className="profile-page__bottom-content-body-text-h3">
                    {profile.fullname}
                    </h3>
                    <div className="profile-page__bottom-content-body-location">
                      <i className="fas fa-map-marker-alt profile-page__bottom-content-body-icon"></i>{" "}
                      {profile.address}
                    </div>
                    <div className="profile-page__bottom-content-body-email">
                      <i className="fas fa-briefcase profile-page__bottom-content-body-icon"></i>
                      E-Mail: {profile.email}
                    </div>
                    <div className="profile-page__bottom-content-body-userID">
                      <i className="fas fa-user profile-page__bottom-content-body-icon"></i>
                      UserID: {profile.MSSV ? profile.MSSV : profile.MSGV}
                    </div>
                    <div className="profile-page__bottom-content-body-userID">
                      <i className="fas fa-university profile-page__bottom-content-body-icon"></i>
                      Class: {profile.className ? profile.className : profile.level}
                    </div>
                    <div className="profile-page__bottom-content-body-userID">
                      <i class="fas fa-phone-alt" style={{marginRight : "8px"}}></i>
                       Phone: {profile.phone}
                    </div>
                    <div className="profile-page__bottom-content-body-userID">
                    <i class="fas fa-venus-mars"  style={{marginRight : "8px"}}></i>
                       Gender: {profile.gender}
                    </div>
                  </div>
  
                  <div className="profile-page__bottom-content-bottom">
                    <div className="profile-page__bottom-content-bottom-container">
                      <div className="profile-page__bottom-content-bottom-content">
                        <p className="profile-page__bottom-content-bottom-desc">
                          {profile.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  else{
    window.location.href = "/login"
  }
 
}
