import type { ActionArgs, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Link, useActionData, useSearchParams } from "react-router-dom";
// import { Login } from "~/components/reusable-components/login";

import styles from "~/styles/global.css";



export default function IndexPage() {
	const navi = useNavigate();
	const [searchParams] = useSearchParams();
	// check session - temporarily set to true for testing
	const [session, setSession] = useState(false);
	// if session, redirect to /dashboard
	// else redirect to /login or /signup

	useEffect(() => {
		if(session) {
			navi('/dashboard');
		}
	}, [session]);

	return (
		
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
			{/* <Login /> */}
			{/* Could implement this into Login/Out Page or check session then re-route to /dashboard */}
			{/* {
				session === false ? (
					<>
						<div>
							<h2>login</h2>
						</div>
						<br />
						<div className="loginform">
							<h5>login or sign up</h5>
							<form action="/api/login" method="post">
								<label htmlFor="email">email</label>
								<input type="email" name="email" id="email" />
								<br />
								<label htmlFor="password">password</label>
								<input type="password" name="password" id="password" />
								<br />
								<br />
								<button type="submit" style={{marginBottom: "10px"}}>submit</button>
							</form>
						</div>
					</>
				) : (
					<div>
						<h4>If not redirected to dashboard...</h4>
						<p>Click <Link to="/dashboard">here</Link></p>
					</div>
				)
			} */}
		</div>
	);
}
