import { Link } from "@remix-run/react";
import { Outlet } from "@remix-run/react";


import CustomTabs from "~/components/CustomTabs";

// dashboard default component
export default function DashboardHomeRoute() {
    return (
        <div>
            <h3 style={{color: 'purple'}}>Dashboard - Home Tab</h3>
            <p>We'll include this index dashboard component when landing on Dashboard.</p>
            <br />
            <h5>Select tab to navigate to a different dashboard page!</h5>
            <br />
            <br />
            <div>
                <p>This is the dashboard home page. </p>
            </div>
        </div>
    );
}