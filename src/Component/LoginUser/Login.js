import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import './login.css'
function Login(props) {

    async function onLogin(){
        let email = document.getElementById("txtUser").value;
        let password = document.getElementById("txtPass").value;
        let response = await axios.post("http://localhost:5000/user/login" , {email , password})
        if(response.data.success == false){
            alert(response.data.message)
        }
        else{
            Cookies.set("userID" , response.data.userData._id , {expires : 1/24})
            localStorage.setItem("token" , response.data.token)
            localStorage.setItem("userData" , JSON.stringify(response.data.userData))
            window.location.href = "/"
        }
    }

    return (
        <div style={{paddingTop:'50px'}}>

            <div style={{
                backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/upimg-28822.appspot.com/o/download.png?alt=media&token=10a42fd7-fd44-41ab-bef4-c121201c98e0")`,
                height: '227px',
                backgroundRepeat: 'no-repeat',
                margin: '0 auto',
                width: '965px'
            }}>

                <div className="option">
                    <div className="list_option">
                        <p> <img className="icon" src="https://mydtu.duytan.edu.vn/Uploads/Menu/32truycap.png"></img> @dtu.edu.vn</p>
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/MasterPages/icons/ico-ann.png"></img> Thông báo</p>
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/MasterPages/icons/calendar16.png"></img>Lịch Cá nhân</p>
                    </div>
                    <div className="list_option">
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/Uploads/Menu/12elearning.png"></img> Learning</p>
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/Uploads/Menu/54thuvien.png"></img> Thư viện</p>
                        <p>  <img className="icon" src="	https://mydtu.duytan.edu.vn/Uploads/Menu/35diendan.png"></img> Diễn đàn</p>
                    </div>
                    <div className="list_option">
                        <p>  <img className="icon" src="	https://mydtu.duytan.edu.vn/MasterPages/icons/dangkylop.png"></img> Đăng ký Môn học</p>
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/MasterPages/icons/hocphi.png"></img> Học phí</p>
                        <p>  <img className="icon" src="https://mydtu.duytan.edu.vn/MasterPages/icons/bangdiem.png"></img> Bảng điểm</p>
                    </div>
                </div>
                <div id="form">
                    <div className="username">
                        <span>
                             Tên đăng nhập:</span>
                        <input name="txtUser" type="text" maxlength="50" id="txtUser" tabindex="1" className="txt" autocomplete="off" placeholder="Nhập Tên đăng nhập" />
                    </div>
                    <div className="pass">
                        <span>
                            Mật khẩu:</span>
                        <input name="txtPass" type="password" id="txtPass" tabindex="2" className="txt" placeholder="Nhập Mật khẩu" />
                    </div>

                    <button className="btn_login" onClick={onLogin} style={{ float: 'right' }}>Đăng Nhập</button>
                </div>
            </div>
        </div >
    );
}

export default Login;