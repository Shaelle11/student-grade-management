import React from "react";
import Navigation from "./Navigation";
import "../styles/ProtectedLayout.css";
const ProtectedLayout = () => {
    const userRole = localStorage.getItem("userRole"); // Replace with actual logic from the backend

    return (
        <div className="protected-layout">
            <aside className="sidebar">
                <Navigation userRole={userRole} />
            </aside>
            <main className="content">
                {/* Content goes here */}
            </main>
        </div>
    );
};

export default ProtectedLayout;
