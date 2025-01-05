import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedLayout from './components/ProtectedLayout';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RegisterCourses from './pages/RegisterCourses';
import CourseOverview from './pages/CourseOverview';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';



const ProtectedRoute = ({ role, children }) => {
    const userRole = localStorage.getItem("userRole");
    return userRole === role ? children : <Navigate to="/" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedLayout />}>
                <Route
                        path="/admin_dashboard"
                        element={
                            <ProtectedRoute role="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff_dashboard"
                        element={
                            <ProtectedRoute role="staff">
                                <StaffDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student_dashboard"
                        element={
                            <ProtectedRoute role="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register_courses"
                        element={
                            <ProtectedRoute role="student">
                                <RegisterCourses />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/course_overview"
                        element={
                            <ProtectedRoute role="staff">
                                <CourseOverview />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
