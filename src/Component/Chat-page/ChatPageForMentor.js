import React, { useEffect, useState } from "react";


import "./styles.css";
import Navbar from '../Layouts/Navbar'
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client"

let socket = io("http://localhost:5000/")

const ChatPageForMentor = (props) => {
  const userData = localStorage.getItem("mentorData") ? JSON.parse(localStorage.getItem("mentorData")) : ""
  const [listChats , setListChats] = useState([])
  const [chats , setChats] = useState([])

 


  useEffect(()=>{
      async function getData(){
            let response = await axios.get(`http://localhost:5000/user/list-chat/${Cookies.get("mentorID")}` , {headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }})
            setListChats(response.data.dataChatForUser)
      }
      getData()
  } , [])




  async function getChat(id){
      let response = await axios.get(`http://localhost:5000/user/get-chat-detail/${id}` , {headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }})
     setChats(response.data.dataChat.chat)
     socket.emit("join-room" ,response.data.dataChat._id )
  }

  function enterChat(event){
    if(event.keyCode === 13){
    socket.emit("chat" , {
      userID_chat : Cookies.get("mentorID"),
      fullname_chat : userData.fullname,
      image : userData.image ,
      chat_content : event.target.value
    })
    event.target.value = ""
    socket.on("chat-done" , (data) => {
      setChats(data)
    })
    socket.on("update-list-chat" , (data) => {
      setListChats(data)
    })
    
   
    }
  }

  if(Cookies.get("mentorID")){
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="messaging">
            <div className="inbox_msg">
              <div className="inbox_people">
                <div className="headind_srch">
                  <div className="recent_heading">
                    <h4>Recent</h4>
                  </div>
                  <div className="srch_bar">
                    <div className="stylish-input-group">
                      <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                      />
                      <span className="input-group-addon">
                        <button type="button">
                          {" "}
                          <i className="fa fa-search" aria-hidden="true" />{" "}
                        </button>
                      </span>{" "}
                    </div>
                  </div>
                </div>
  
                <div className="inbox_chat">
                  <div className="chat_list">
                    {listChats.map((item, index) => {
                      return (
                        <>
                          <div className="chat_people" onClick={() => getChat(item._id)} key={index}>
                            <div className="chat_img">
                              {" "}
                              <img
                                src={
                                  item.chat[item.chat.length - 1].image
                                }
                                alt="sunil"
                              />{" "}
                            </div>
                            <div className="chat_ib">
                              <h5>
                                {item.chat[item.chat.length - 1].fullname_chat}
                                <span className="chat_date">{item.chat[item.chat.length - 1].createAt}</span>
                              </h5>
                              <p> {item.chat[item.chat.length - 1].chat_content}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mesgs">
                <div className="msg_history">
                  <div>
                    <div>
                      <span className="msg_history__heading">Hãy cùng trò chuyện thật vui vẻ</span>
                    </div>

                    {chats.map(chat => 
                      chat.userID_chat === Cookies.get("mentorID") ? 
                      <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{chat.chat_content}</p>
                        <span className="time_date">{chat.createAt}</span>{" "}
                      </div>
                    </div>
                      :

                      <div className="incoming_msg">
                      <div className="incoming_msg_img">
                        {" "}
                        <img
                          src={
                           chat.image
                          }
                          alt="sunil"
                        />{" "}
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{chat.chat_content}</p>
                          <span className="time_date">{chat.createAt}</span>
                        </div>
                      </div>
                    </div>

                      )}

             
  
               
                  </div>
                </div>
  
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      type="text"
                      onKeyUp={enterChat}
                      className="write_msg"
                      id="chatcontent"
                      placeholder="Type a message"
                    />
                    <button className="msg_send_btn" type="button">
                      <i className="fa fa-paper-plane-o" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else{
      window.location.href = "/login"
  }

};

export default ChatPageForMentor;
