import React from 'react';

import './Home.css'

function Nav(props) {
    return (
        <div className="shadow-sm p-3 mb-5 bg-white rounded sticky-top w-100">
            <ul className="nav justify-content-end sticky-top ">

               <li className="nav-item">
               <div className="btn-group" role="group">
                    <a id="dropdownMenuButton2" type="button" data-bs-display="static" className=" dropdown-toggle Mess" data-bs-toggle="dropdown" aria-expanded="true">
                    <i class="fa fa-envelope-o"></i>
                    <spam class="soMess">3</spam>
                    </a>
                    
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                        <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                        <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                    </ul>
                </div>
               </li>
                <li className="nav-item ml-3">
                <div className="btn-group" role="group">
                    <a id="dropdownMenuButton2" type="button" data-bs-display="static" className=" dropdown-toggle Notifi" data-bs-toggle="dropdown" aria-expanded="true">
                        <i class="fa fa-bell-o" aria-hidden="true"></i>
                        <spam class="soNotifi">3</spam>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                        <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                        <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                    </ul>
                </div>
                </li>
                <li className="nav-item ml-3 mr-2 pt-1 menu-add">
                <i class="fa fa-plus" aria-hidden="true"></i>
                </li>
                <li className="nav-item mr-2 ml-2">
                </li>
            </ul>

        </div>
    );
}

export default Nav;