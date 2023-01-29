import { Outlet } from "@remix-run/react";


const handleBackButton = () => {
    window.history.back();
}

// Dashboard layout component   
export default function DashboardRoute() {
    return (
        <div>
            <h1>Dashboard Page</h1>
            <Outlet />
            <br />
            <br />
            <button type='button' onClick={handleBackButton}>Go Back</button>
        </div>
    );
}