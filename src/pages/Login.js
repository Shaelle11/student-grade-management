import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("userRole");

        if (storedId && storedRole) {
            if (storedRole === "Admin") navigate("/hod");
            if (storedRole === "Lecturer") navigate("/lecturer");
            if (storedRole === "Student") navigate("/student");
        }
    }, [navigate]);

    const determineRole = (id) => {
        if (id.startsWith("HOD")) return "Admin";
        if (id.startsWith("L")) return "Lecturer";
        if (id.startsWith("S")) return "Student";
        return null;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!id || !password) {
            setError("All fields are required!");
            return;
        }

        const role = determineRole(id);
        if (!role) {
            setError("Invalid ID format!");
            return;
        }

        localStorage.setItem("userId", id);
        localStorage.setItem("userRole", role);

        const loggedInStaff = JSON.parse(localStorage.getItem("loggedInStaff")) || [];
        if (!loggedInStaff.some(staff => staff.id === id)) {
            loggedInStaff.push({ id, name: id, role });
            localStorage.setItem("loggedInStaff", JSON.stringify(loggedInStaff));
        }

        if (role === "Admin") navigate("/hod");
        if (role === "Lecturer") navigate("/lecturer");
        if (role === "Student") navigate("/student");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value.trim())}
                            placeholder="Enter your ID"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
