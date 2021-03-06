import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import "./login.css";
function Login(props) {
  async function onLogin() {
    let login = false
    let email = document.getElementById("txtUser");
    let password = document.getElementById("txtPass");
    let role = document.getElementsByName("role");
    for (let i = 0; i < role.length; i++) {
      if (role[i].checked) {
        let response = await axios.post("http://localhost:5000/user/login", {
          email: email.value,
          password: password.value,
          role: role[i].value,
        });
        if (response.data.success == false) {
          alert(response.data.message);
          if (response.data.message === "Email Invalid") {
            email.value = "";
            password.value = "";
          } else {
            password.value = "";
          }
        } else {
          response.data.role === "student"
            ? Cookies.set("userID", response.data.userData._id, {
                expires: 1 / 24,
              })
            : response.data.role === "mentor"
            ? Cookies.set("mentorID", response.data.userData._id, {
                expires: 1 / 24,
              })
            : Cookies.set("adminID", response.data.userData._id, {
                expires: 1 / 24,
              });
          localStorage.setItem("token", response.data.token);
          response.data.role === "student"
            ? localStorage.setItem(
                "userData",
                JSON.stringify(response.data.userData)
              )
            : response.data.role === "mentor"
            ? localStorage.setItem(
                "mentorData",
                JSON.stringify(response.data.userData)
              )
            : localStorage.setItem(
                "adminData",
                JSON.stringify(response.data.userData)
              );
          response.data.role === "student"
            ? (window.location.href = "/")
            : response.data.role === "mentor"
            ? (window.location.href = "/mentor")
            : (window.location.href = "/admin");
        }
        login = true
      }
    }

    if(login === false){
      alert("B???n ch??a nh???p role !!!")
    }

    
  }

  return (
    <div style={{ paddingTop: "50px",
        backgroundColor:'#860207',
        height:'860px'
        }}>
      <div
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/upimg-28822.appspot.com/o/download.png?alt=media&token=10a42fd7-fd44-41ab-bef4-c121201c98e0")`,
          height: "227px",
          backgroundRepeat: "no-repeat",
          margin: "0 auto",
          width: "965px",
        }}
      >
        <div className="option">
          <div className="list_option">
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/Uploads/Menu/32truycap.png"
              ></img>{" "}
              @dtu.edu.vn
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/MasterPages/icons/ico-ann.png"
              ></img>{" "}
              Th??ng b??o
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/MasterPages/icons/calendar16.png"
              ></img>
              L???ch C?? nh??n
            </p>
          </div>
          <div className="list_option">
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/Uploads/Menu/12elearning.png"
              ></img>{" "}
              Learning
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/Uploads/Menu/54thuvien.png"
              ></img>{" "}
              Th?? vi???n
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="    https://mydtu.duytan.edu.vn/Uploads/Menu/35diendan.png"
              ></img>{" "}
              Di???n ????n
            </p>
          </div>
          <div className="list_option">
            <p>
              {" "}
              <img
                className="icon"
                src="    https://mydtu.duytan.edu.vn/MasterPages/icons/dangkylop.png"
              ></img>{" "}
              ????ng k?? M??n h???c
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/MasterPages/icons/hocphi.png"
              ></img>{" "}
              H???c ph??
            </p>
            <p>
              {" "}
              <img
                className="icon"
                src="https://mydtu.duytan.edu.vn/MasterPages/icons/bangdiem.png"
              ></img>{" "}
              B???ng ??i???m
            </p>
          </div>
        </div>
        <div id="form">
          <div className="username">
            <span>T??n ????ng nh???p:</span>
            <input
              name="txtUser"
              type="text"
              maxlength="50"
              id="txtUser"
              tabindex="1"
              className="txt"
              autocomplete="off"
              placeholder="Nh???p T??n ????ng nh???p"
            />
          </div>
          <div className="pass">
            <span>M???t kh???u:</span>
            <input
              name="txtPass"
              type="password"
              id="txtPass"
              tabindex="2"
              className="txt"
              placeholder="Nh???p M???t kh???u"
            />
          </div>
          <br></br>
          <div className="Button">
            <span className='inputRadio'>
              <input
                style={{ marginRight: "5px" }}
                type="radio"
                name="role"
                value="admin"
              />
              <label style={{ marginRight: "5px" }} for="Admin">
                Admin
              </label>
            </span>
            <span className='inputRadio'>
            <input
              style={{ marginRight: "5px" }}
              type="radio"
              name="role"
              value="mentor"
            />
            <label style={{ marginRight: "5px" }} for="Mentor">
              Mentor
            </label>
            </span>
            <span className='inputRadio'>
            <input
              style={{ marginRight: "5px" }}
              type="radio"
              name="role"
              value="student"
            />
            <label style={{ marginRight: "5px" }} for="Student">
              Student
            </label>
            </span>
            <button
              className="btn btn_login"
              onClick={onLogin}
              style={{
                float: "right",
                margin: "0px 19px",
                backgroundColor: "rgb(90, 2, 2)",
                border: "none",
                color: "#fff",
                padding: "4px",
                borderRadius: "5px",
              }}
            >
              ????ng Nh???p
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
