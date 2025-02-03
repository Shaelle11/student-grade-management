import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentPage from './pages/StudentPage';
import StudentDashboard from './components/StudentDashboard';
import RegisterCourses from './components/RegisterCourses';
import CourseOverview from './components/CourseOverview';
import StaffPage from './pages/StaffPage';
import StaffDashboard from './components/StaffDashboard';
import CourseList from './components/CourseList';
import AddResult from './components/AddResult';
import HODPage from './pages/HODPage';
import HODDashboard from './components/HODDashboard';
import ManageLecturers from './components/ManageLecturers';
import ManageCourses from './components/ManageCourses';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/student" element={<StudentPage />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="register-courses" element={<RegisterCourses />} />
        <Route path="course-overview" element={<CourseOverview />} />
  </Route>
        
        <Route path="/lecturer" element={<StaffPage/>}>
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="course-list" element={<CourseList />} />
          <Route path="add-result" element={<AddResult />} />
        </Route>
        <Route path="/hod" element={<HODPage />}>
        <Route path="dashboard" element={<HODDashboard/>} />
        <Route path="manage-lecturers" element={<ManageLecturers/>} />
        <Route path="manage-courses" element={<ManageCourses/>} />
      </Route>
      </Routes>
    </Router>
  );
  

export default App;
