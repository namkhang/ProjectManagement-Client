import React, { useEffect, useState } from "react";


import "./styles.css";
import Navbar from '../Layouts/Navbar'
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client"


let socket = io("http://localhost:5000/")

const ChatPage = (props) => {
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : ""
  const [listChats , setListChats] = useState([])
  const [receiver , setReceiver] = useState([])
  const [chats , setChats] = useState([])

 


  useEffect(()=>{
      async function getData(){
            let response = await axios.get(`http://localhost:5000/user/list-chat/${Cookies.get("userID")}` , {headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }})
            let receiverInformation = []
            response.data.dataChatForUser.forEach((i) => {
              let result = i.chat.filter(x => x.userID_chat !== Cookies.get("userID"))
              receiverInformation.push(result[0])
            })
            setReceiver(receiverInformation)
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
       if(chats.length !== 0 ){
        socket.emit("chat" , {
          userID_chat : Cookies.get("userID"),
          fullname_chat : userData.fullname,
          image : userData.image ,
          chat_content : event.target.value
        })
        event.target.value = ""
        socket.on("chat-done" , (data) => {
          async function getData(){
            let response = await axios.get(`http://localhost:5000/user/list-chat/${Cookies.get("userID")}` , {headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }})
            let receiverInformation = []
            response.data.dataChatForUser.forEach((i) => {
              let result = i.chat.filter(x => x.userID_chat !== Cookies.get("userID"))
              receiverInformation.push(result[0])
            })
            setReceiver(receiverInformation)
            setListChats(response.data.dataChatForUser)
      }
          getData()
          setChats(data)
    
        })
       }
       else{
         alert("Vui lòng chọn người bạn muốn nhắn")
         event.target.value = ""
       }

   
    }
  }

  function btnSendChat(){
    if(chats.length !== 0 ){
      socket.emit("chat" , {
        userID_chat : Cookies.get("userID"),
        fullname_chat : userData.fullname,
        image : userData.image ,
        chat_content : document.getElementById("chatcontent").value
      })
      document.getElementById("chatcontent").value = ""
      socket.on("chat-done" , (data) => {
        async function getData(){
          let response = await axios.get(`http://localhost:5000/user/list-chat/${Cookies.get("userID")}` , {headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          }})
          let receiverInformation = []
          response.data.dataChatForUser.forEach((i) => {
            let result = i.chat.filter(x => x.userID_chat !== Cookies.get("userID"))
            receiverInformation.push(result[0])
          })
          setReceiver(receiverInformation)
          setListChats(response.data.dataChatForUser)
    }
        getData()
        setChats(data)
  
      })
     }
     else{
       alert("Vui lòng chọn người bạn muốn nhắn")
       document.getElementById("chatcontent").value = ""
     }

    
  }

  if(Cookies.get("userID")){
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
                                  receiver[index].image
                                }
                                alt="sunil"
                              />{" "}
                            </div>
                            <div className="chat_ib">
                              <h5>
                                {receiver[index].fullname_chat}
                                <span className="chat_date">{item.chat[item.chat.length - 1].createAt}</span>
                              </h5>
                              <p> {item.chat[item.chat.length - 1].userID_chat === Cookies.get("userID") ? item.chat[item.chat.length - 1].chat_content !== "" ?   `Bạn: ${item.chat[item.chat.length - 1].chat_content}` : "" :  item.chat[item.chat.length - 1].chat_content}</p>
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
                    chat.chat_content === "" ?
                    ""
                    :
                      chat.userID_chat === Cookies.get("userID") ? 
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
                    <button onClick={btnSendChat} className="msg_send_btn" type="button">
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

export default ChatPage;
