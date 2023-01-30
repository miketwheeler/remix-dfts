import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import styles from "~/styles/global.css";
import AppBarAndNav from "~/components/AppBarAndNav";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
        <AppBarAndNav />
				{/* <div className="appbarContainer">
					<div className="appbarContent">
						<h1>Root Route - Top Parent</h1>
					</div>
				</div>
				<div className="navigationContainer">
					<h1>Navigation</h1>
					<ul>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li>
							<Link to="/projecthub">ProjectHub</Link>
						</li>
						<li>
							<Link to="/memberhall">MemberHall</Link>
						</li>
					</ul>
				</div>
				<div className="contentContainer">
					<Outlet />
				</div>
				<div className="footerContainer">
					<h4>This is the footer</h4>
				</div> */}

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
