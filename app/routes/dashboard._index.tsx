import { Link } from "@remix-run/react";



// dashboard default component
export default function DashboardHomeRoute() {
    return (
        <div style={{ border: '1px solid blue'}}>
            <h3 style={{color: 'purple'}}>*Dashboard - Home Tab*</h3>
            <p>We'll include this index dashboard component when landing on Dashboard.</p>
            <br />
            <h5>Select tab to display tab information!</h5>
            <ul>
                <li>
                    <Link to="/dashboard">Dash Home</Link>
                </li>
                <li>
                    <Link to="/dashboard/tasks">Tasks</Link>
                </li>
                <li>
                    <Link to="/dashboard/messages">Messages</Link>
                </li>
                <li>
                    <Link to="/dashboard/schedule">Schedule</Link>
                </li>
            </ul>            
        </div>
    );
}