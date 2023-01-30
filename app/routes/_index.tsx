import { flexbox } from "@mui/system";
import { Link, Outlet, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

import styles from "~/styles/global.css";



export default function IndexPage() {
	const navi = useNavigate();
	// check session - temporarily set to true for testing
	const [session, setSession] = useState(true);
	// if session, redirect to /dashboard
	// else redirect to /login or /signup

	useEffect(() => {
		if(session) {
			navi('/dashboard');
		}
	}, [session]);

	return (
		
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
			{/* Could implement this into Login/Out Page or check session then re-route to /dashboard */}
			{
				session ? (
					<>
						<div>
							<h2>Dash-Index Page</h2>
						</div>
						<br />
						<div className="loginform">
							<h5>Login</h5>
							<form action="/api/login" method="post">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" id="email" />
								<br />
								<label htmlFor="password">Password</label>
								<input type="password" name="password" id="password" />
								<br />
								<br />
								<button type="submit" style={{marginBottom: "10px"}}>Submit</button>
							</form>
						</div>
					</>
				) : (
					<div>
						<h4>If not redirected to dashboard...</h4>
						<p>Click <Link to="/dashboard">here</Link></p>
					</div>
				)
			}
		</div>
	);
}
