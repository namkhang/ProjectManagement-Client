import React from 'react'
import { Switch , Route } from 'react-router-dom';

import Home from './Component/Home/Home';
import Login from './Component/LoginUser/Login'
import CreateReportTemplate from './Component/Report-Template/CreateReportTemplate';
import MyReport from "./Component/Reports/MyReport"
import CreateReport from './Component/Reports/CreateReport';
import './assets/css/styles.css';
import HomeForMentor from './Component/Home/HomeForMentor';
import ChatPage from './Component/Chat-page/ChatPage';
import ChatPageForMentor from './Component/Chat-page/ChatPageForMentor';
import ProfileUser from './Component/Profile/Profile';
import HomeForAdmin from './Component/Home/HomeForAdmin';
import ChatPageForAdmin from './Component/Chat-page/ChatPageForAdmin';
import ProfileMentor from './Component/Profile/ProfileForMentor';
import ProfileAdmin from './Component/Profile/ProfileForAdmin';
import MyReportForMentor from './Component/Reports/MyReportForMentor';
import MyReportForAdmin from './Component/Reports/MyReportForAdmin';
import CreateReportTemplateForAdmin from './Component/Report-Template/CreateReportTemplateForAdmin';
import Createpost from './Component/CreatePost/CreatePost';
import CreatepostForAdmin from './Component/CreatePost/CreatePostForAdmin';
import ReportDetail from './Component/Report-Detail/ReportDetail';
import ReportDetailForMentor from './Component/Report-Detail/ReportDetailForMentor';
import ReportDetailForAdmin from './Component/Report-Detail/ReportDetailForAdmin';
import CreateProject from './Component/Project/CreateProject';
import ListProject from './Component/Project/ListProject';
import EditProject from './Component/Project/EditProject';
import MyProject from './Component/Project/MyProject';
import CreateProjectForStudent from './Component/Project/CreateProjectForStudent';
import ListProjectForStudent from './Component/Project/ListProjectForStudent';
import EditProjectForStudent from './Component/Project/EditProjectForStudent';
import MyProjectForMentor from './Component/Project/MyProjectForMentor';
import ProjectDetailForMentor from './Component/Project/ProjectDetailForMentor';
import EditReportForStudent from './Component/Reports/EditReportForStudent';
import MyReportTempalte from './Component/Report-Template/MyReportTemplate';
import EditReportTemplate from './Component/Report-Template/EditReportTemplate';
import MyReportTempalteForAdmin from './Component/Report-Template/MyReportTemplateForAdmin';
import EditReportTemplateForAdmin from './Component/Report-Template/EditReportTemplateForAdmin';
import ListUser from './Component/UserManagement/ListUser';
import UserDetail from './Component/UserManagement/UserDetail';
import EditPostForAdmin from './Component/CreatePost/EditPostForAdmin';
import EditPostForMentor from './Component/CreatePost/EditPostForMentor';
import Test from './Component/Test';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/list-user" component={ListUser} />
        <Route exact path="/admin/user-detail/:id" component={UserDetail} />
        <Route exact path="/mentor" component={HomeForMentor} />
        <Route exact path="/admin" component={HomeForAdmin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mentor/create-post" component={Createpost} />
        <Route exact path="/admin/create-post" component={CreatepostForAdmin} />
        <Route exact path="/mentor/create-report-template" component={CreateReportTemplate} />
        <Route exact path="/admin/create-report-template" component={CreateReportTemplateForAdmin} />
        <Route exact path="/my-report" component={MyReport} />
        <Route exact path="/edit-report-for-student/:id" component={EditReportForStudent} />
        <Route exact path="/mentor/my-report" component={MyReportForMentor} />
        <Route exact path="/mentor/my-reporttemplate" component={MyReportTempalte} />
        <Route exact path="/admin/my-reporttemplate" component={MyReportTempalteForAdmin} />
        <Route exact path="/mentor/edit-reporttemplate/:id" component={EditReportTemplate} />
        <Route exact path="/admin/edit-reporttemplate/:id" component={EditReportTemplateForAdmin} />
        <Route exact path="/admin/list-report" component={MyReportForAdmin} />
        <Route exact path="/create-report" component={CreateReport} />
        <Route exact path="/chat" component={ChatPage} />
        <Route exact path="/mentor/chat" component={ChatPageForMentor} />
        <Route exact path="/admin/chat" component={ChatPageForAdmin} />
        <Route exact path="/profile/:id" component={ProfileUser} />
        <Route exact path="/mentor/profile/:id" component={ProfileMentor} />
        <Route exact path="/admin/profile/:id" component={ProfileAdmin} />
        <Route exact path="/report-detail/:id" component={ReportDetail} />
        <Route exact path="/mentor/report-detail/:id" component={ReportDetailForMentor} />
        <Route exact path="/admin/report-detail/:id" component={ReportDetailForAdmin} />
        <Route exact path="/my-project" component={MyProject} />
        <Route exact path="/mentor/my-project" component={MyProjectForMentor} />
        <Route exact path="/mentor/project-detail/:id" component={ProjectDetailForMentor} />
        <Route exact path="/choose-project" component={ListProjectForStudent} />
        <Route exact path="/edit-project-for-student/:id" component={EditProjectForStudent} />
        <Route exact path="/create-project" component={CreateProjectForStudent} />
        <Route exact path="/admin/create-project" component={CreateProject} />
        <Route exact path="/admin/list-project" component={ListProject} />
        <Route exact path="/admin/edit-project/:id" component={EditProject} />
        <Route exact path="/admin/edit-post/:id" component={EditPostForAdmin} />
        <Route exact path="/mentor/edit-post/:id" component={EditPostForMentor} />
        <Route exact path="/test" component={Test} />

      </Switch>
    </div>
  );
}

export default App;