import React from "react";
import { NavLink } from "react-router-dom";

// Navigation arrays
const adminNavLinks = [
    { name: "Dashboard", path: "/admin_dashboard" },
    { name: "Manage Students", path: "/manage_users" },
    { name: "Reports", path: "/reports" },
    { name: "Profile", path: "/profile" },
];

const staffNavLinks = [
    { name: "Dashboard", path: "/staff_dashboard" },
    { name: "Course Overview", path: "/course_overview" },
    { name: "Profile", path: "/profile" },
];

const studentNavLinks = [
    { name: "Dashboard", path: "/student_dashboard" },
    { name: "Register Courses", path: "/register_courses" },
    { name: "Profile", path: "/profile" },
];

const Navigation = ({ userRole }) => {
    let navLinks = [];

    // Determine navigation links based on role
    switch (userRole) {
        case "admin":
            navLinks = adminNavLinks;
            break;
        case "staff":
            navLinks = staffNavLinks;
            break;
        case "student":
            navLinks = studentNavLinks;
            break;
        default:
            break;
    }

    return (
        <nav>
            <ul>
                {navLinks.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path}>{item.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
