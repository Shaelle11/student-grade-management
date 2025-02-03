import React from "react";
import { Outlet } from "react-router-dom"; // To render nested routes
import Navigation from "./Navigation"; // Navigation component for dynamic nav links
import "../styles/ProtectedLayout.css";

const ProtectedLayout = () => {
    // Get the user role from localStorage (replace this logic with actual backend handling)
    const userRole = localStorage.getItem("userRole") || "guest"; // Default to 'guest' if no role is found

    return (
        <div className="protected-layout">
            {/* Sidebar for Navigation */}
            <aside className="sidebar">
                <Navigation userRole={userRole} />
            </aside>

            {/* Main Content */}
            <main className="content">
                <Outlet /> {/* Renders the nested route's content */}
            </main>
        </div>
    );
};

export default ProtectedLayout;
