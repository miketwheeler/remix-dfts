import { Link } from "@remix-run/react";



export default function Navigation() {
    return (
        <div>
            <h1>Navigation</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/projecthub">ProjectHub</Link></li>
                <li><Link to="/memberhall">MemberHall</Link></li>
            </ul>
        </div>
    );
}