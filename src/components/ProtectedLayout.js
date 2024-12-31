import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/ProtectedLayout.css'; // Add custom styles for the layout

const ProtectedLayout = () => {
    const navigate = useNavigate();

    // Mock function to log out (replace with actual logic later)
    const handleLogout = () => {
        // Clear session and redirect to login
        navigate('/');
    };

    return (
        <div className="protected-layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/student_dashboard" activeClassName="active">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/courses/register" activeClassName="active">Register Courses</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="active">Profile</NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <Outlet /> {/* Renders nested route content */}
            </main>
        </div>
    );
};

export default ProtectedLayout;
