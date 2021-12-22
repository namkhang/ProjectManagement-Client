import React, { useEffect, useState } from "react";

import NavbarForAdmin from "../Layouts/NavbarForAdmin";
import Loading from "../Loading/Loading";
import "./Home.css";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";

let socket = io("http://localhost:5000/");

function HomeForAdmin(props) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminID = Cookies.get("adminID");
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const { fullname: userName_commnent, image } = JSON.parse(
    localStorage.getItem("adminData")
  )
    ? JSON.parse(localStorage.getItem("adminData"))
    : { fullname: "" };

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "http://localhost:5000/user/get_all_post",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(true);
      setPost(response.data.dataPost.reverse());
    }
    getData();
  }, []);

   function EditPost(id){
    window.location.href = `/admin/edit-post/${id}`
  }

  function TxtComment(postID) {
    return async (event) => {
      if (event.keyCode === 13) {
        let body = {
          postID,
          userID_comment: adminID,
          userName_commnent,
          image,
          content_comment: event.target.value,
        };
        socket.emit("create-post-comment", body);
        socket.on("done-post-comment", (data) => {
          setPost(data.reverse());
        });
        document.getElementById(postID).value = "";
      }
    };
  }
  function Comment(postID) {
    let body = {
      postID,
      userID_comment: adminID,
      userName_commnent,
      image,
      content_comment: document.getElementById(postID).value,
    };
    socket.emit("create-post-comment", body);
    socket.on("done-post-comment", (data) => {
      setPost(data.reverse());
    });
    document.getElementById(postID).value = "";
  }

  async function Like(postID) {
    let data = {
      postID,
      userID : Cookies.get("adminID")
    };
    let response = await axios.post("http://localhost:5000/user/like", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPost(response.data.newPost.reverse());
  }

  function toProfile(userID) {
    window.location.href = `/admin/profile/${userID}`;
  }

  if (adminID) {
    if (loading === false) {
      return <Loading />;
    } else {
      return (
        <div>
          <NavbarForAdmin />
          <div className="container">
            {post.map((i) => (
              <div style={{ marginTop: "30px" }} className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div
                    onClick={() => toProfile(i.userID)}
                    className="header-Stt"
                  >
                    <span className="User-img">
                      <img
                        src={i.image}
                        className="img-fluid rounded-start rounded-circle Avt-User mr-2"
                        alt="..."
                      />
                    </span>
                    <span className="User-name mr-1">{i.userName} </span>
                    <span className="User-name__active">{i.createAt}</span>
                  </div>
                  <div className="Description mb-3">{i.content}</div>
                  <div className="Description_img_video mb-3">
                    <img
                      className="h-100"
                      src={i.imagePost}
                      style={{ border: "none", overflow: "hidden" }}
                    />
                  </div>
                  <div className="Comment row">
                    <div className="col-4 text-center">
                      <span
                        className="User-name__active"
                      >
                        {i.like.length} lượt thích
                      </span>
                    </div>

                    <di v className="col-4 text-center">
                      <span
                        className="User-name__active"
                      >
                        {i.post_comment.length} lượt bình luận
                      </span>
                    </di>
                  </div>
                  <div
                    style={{ marginTop: "10px" }}
                    className="Comment border-bottom border-top row"
                  >
                    <a
                      onClick={() => Like(i._id)}
                      className="col-4 text-center Comment-Like p-2"
                    >
                      <i class="fa fa-thumbs-up" aria-hidden="true"></i> Thích
                    </a>
                    <div className="col-4 text-center Comment-cmt p-2">
                      <p>
                        <a
                          data-toggle="collapse"
                          href="#collapseExample"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <i class="fa fa-comment" aria-hidden="true"></i> Bình
                          Luận
                        </a>
                      </p>
                      {/* <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div> */}
                    </div>
                    {/* <div className="col-4 text-center Comment-share p-2"> <i class="fa fa-share" aria-hidden="true"></i> like</div> */}
                  {Cookies.get("adminID") === i.userID && 
                    <div className="col-4 text-center Comment-share p-2">
                    {" "}
                    <div>
                      {/* Button trigger modal */}
                      <a data-toggle="modal" onClick={() => EditPost(i._id)}>
                        <i class="fa fa-share" aria-hidden="true"></i> Chỉnh sửa
                      </a>
                      {/* Modal */}
          
                    </div>
                  </div>
                  }
                  </div>
                  {/* bình luận */}
                  <div>
                    {/* inputcmt */}
                    <div className="collapse mt-2 mb-3" id="collapseExample">
                      <input
                        onKeyUp={TxtComment(i._id)}
                        type="text"
                        id={i._id}
                        className="form-control input-cmt mb-2"
                      />
                      <button
                        type="submit"
                        onClick={() => Comment(i._id)}
                        class="btn btn-sent btn-primary my-1 float-right mb-4"
                      >
                        <i class="fa fa-paper-plane"></i>
                      </button>{" "}
                      <br></br>
                      <br></br> <br></br>
                      {/* endinputcmt */}
                      <div className="scroll p-3">
                        {i.post_comment.map((item) => (
                          <div
                            className="card mb-3"
                            style={{ maxWidth: "540px" }}
                          >
                            <div className="row g-0">
                              <div className="col-2 pt-3 ml-2">
                                <img
                                  src={item.image_comment}
                                  className="img-fluid rounded-start rounded-circle"
                                  alt="..."
                                />
                              </div>
                              <div className="col-9">
                                <div className="card-body p-0">
                                  <h5 className="card-title NameUser pt-2 mb-1">
                                    {item.userName_commnent}
                                  </h5>
                                  <p className="card-text Cmt_Description mb-1">
                                    {item.content_comment}
                                  </p>
                                  <p className="card-text">
                                    <small className="text-muted">
                                      {item.createAt_comment}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* endcmt */}
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } else {
    window.location.href = "/login";
  }
}

export default HomeForAdmin;
