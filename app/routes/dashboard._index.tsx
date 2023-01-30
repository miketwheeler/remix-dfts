import { Link } from "@remix-run/react";
import { Outlet } from "@remix-run/react";


import CustomTabs from "~/components/CustomTabs";

// dashboard default component
export default function DashboardHomeRoute() {
    return (
        <div style={{ border: '1px solid blue', height: '100%'}}>
            <h3 style={{color: 'purple'}}>*Dashboard - Home Tab*</h3>
            <p>We'll include this index dashboard component when landing on Dashboard.</p>
            <br />
            <h5>Select tab to display tab information!</h5>
            <br />
        </div>
    );
}