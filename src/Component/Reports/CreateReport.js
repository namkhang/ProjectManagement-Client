import React from 'react';


import Navbar from '../Layouts/Navbar';
import SideBar from '../Layouts/SideBar';

const CreateReport = () => {

        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <SideBar/>
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">CreateReport</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">CreateReport</li>
                                </ol>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-body">Primary Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-warning text-white mb-4">
                                            <div className="card-body">Warning Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-success text-white mb-4">
                                            <div className="card-body">Success Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-danger text-white mb-4">
                                            <div className="card-body">Danger Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-area me-1"></i>
                                                Area Chart Example
                                            </div>
                                            <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-bar me-1"></i>
                                                Bar Chart Example
                                            </div>
                                            <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                                        </div>
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

   


export default CreateReport;
