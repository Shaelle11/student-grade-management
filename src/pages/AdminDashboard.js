import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        navigate('/admin_login'); // Redirect to admin login
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Add admin-specific controls here */}
            <ul>
                <li>Manage Users</li>
                <li>Manage Courses</li>
                <li>View Reports</li>
            </ul>
        </div>
    );
};

export default AdminDashboard;
