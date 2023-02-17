import { 
	LinksFunction, 
	MetaFunction, 
	LoaderArgs, 
	redirect
} from "@remix-run/node";
// import { React } from "@remix-run/node";
import React from 'react'
import {
	Links,
	LiveReload,
	Meta,
	Scripts,
	useLoaderData,
	ScrollRestoration,
	Outlet,
	useCatch,
} from "@remix-run/react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import styles from "~/styles/global.css";
import AppBarAndNav from "~/components/AppBarAndNav";
import theme from "~/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

import { json } from "@remix-run/node";
// import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";




export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
	const description = "welcome to the dev foyer";
	return {
		charset: "utf-8",
		description,
		// can add more keywords here
		keywords: "dev foyer,devlopment,web development,software development,software engineer,application, projects, community",
		viewport: "width=device-width,initial-scale=1",
	}
};

// get the user from the session (at the top)
// export async function loader({ request }: LoaderArgs) {
// 	const user = await getUser(request);
// 	if(!user) {
// 		console.log('no user')
// 	}
// 	return json({  });
// }
export async function loader({ request }: LoaderArgs) {
	return json({
		user: await getUser(request),
	})
}


function Document({
	children,
	title = "dev foyer",
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<ThemeProvider theme={theme}>
				<head>
					<Meta />
					<Links />
				</head>
				<body>
					<AppBarAndNav />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</ThemeProvider>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<div className="error-container">
				<h1>{caught.status} {caught.statusText}</h1>
			</div>
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document title="Error">
			<div className="error-container">
				<h1>{error.message}</h1>
				<pre>{error.stack}</pre>
			</div>
		</Document>
	);
}