import { NavLink } from "react-router-dom";
const adminNavLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Courses", path: "/admin/manage_courses" },
    { name: "Manage Lecturers", path: "/admin/manage_lecturers" },
];
const staffNavLinks = [
    { name: "Dashboard", path: "/staff" },
    { name: "Course Overview", path: "/staff/course-overview" },
];
const studentNavLinks = [
    { name: "Dashboard", path: "/student" },
    { name: "Register Courses", path: "/student/register-courses" },
    { name: "Profile", path: "/student/profile" },
];


const Navigation = ({ userRole }) => {
    const navLinks =
        userRole === "admin"
            ? adminNavLinks
            : userRole === "staff"
            ? staffNavLinks
            : userRole === "student"
            ? studentNavLinks
            : [];

    return (
        <nav>
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
