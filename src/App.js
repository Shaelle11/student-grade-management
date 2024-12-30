import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterCourses from './pages/RegisterCourses';
import CourseOverview from './pages/CourseOverview';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login />} />

                {/* Protected Routes (Require Authentication) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses/register" element={<RegisterCourses />} />
                <Route path="/courses/:id" element={<CourseOverview />} />
                <Route path="/profile" element={<Profile />} />

                {/* Catch-All for 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
