import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RegisterCourses from './pages/RegisterCourses';
import CourseOverview from './pages/CourseOverview';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedLayout from './components/ProtectedLayout'; // New Layout Component

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="/staff_dashboard" element={<StaffDashboard />} />
                    <Route path="/student_dashboard" element={<StudentDashboard />} />
                    <Route path="/courses/register" element={<RegisterCourses />} />
                    <Route path="/courses/:id" element={<CourseOverview />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Catch-All for 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
