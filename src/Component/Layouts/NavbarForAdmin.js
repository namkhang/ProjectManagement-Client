import Cookies from 'js-cookie';
import React from 'react';
import ReactstrapDropdown from "./ReactstrapDropdown";

const NavbarForAdmin = () => {

    function logOut(){
        Cookies.remove("mentorID")
        Cookies.remove("userID")
        Cookies.remove("adminID")
        localStorage.removeItem("adminData")
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="/admin">Report Management System</a>
            <div style={{ width: "50%", margin: "20px auto" }}>
                    <ReactstrapDropdown />
            </div>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/admin/chat">Chat</a></li>
                        <li><a className="dropdown-item" href="/admin/list-report">Report</a></li>
                        <li><a className="dropdown-item" href="/admin/list-project">Project</a></li>
                        <li><a className="dropdown-item" href="/admin/create-post">Create Post</a></li>
                        <li><a className="dropdown-item" href="/admin/create-report-template">Create Report Template</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={logOut} href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarForAdmin;
