import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/ProtectedLayout.css';

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (!role) {
            navigate("/"); // Redirect to login if no role is found
        } else {
            setUserRole(role);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/");
    };

    if (!userRole) {
        return <div>Loading...</div>;
    }

    return (
        <div className="protected-layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={userRole === "student" ? "/student_dashboard" : "/staff_dashboard"}
                                activeClassName="active"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        {userRole === "student" && (
                            <li>
                                <NavLink to="/register_courses" activeClassName="active">
                                    Register Courses
                                </NavLink>
                            </li>
                        )}
                        {userRole === "staff" && (
                            <li>
                                <NavLink to="/course_overview" activeClassName="active">
                                    Course Overview
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile" activeClassName="active">
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;
