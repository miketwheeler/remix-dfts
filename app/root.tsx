import type { 
	LinksFunction, 
	MetaFunction, 
	LoaderArgs 
} from "@remix-run/node";
// import { React } from "@remix-run/node";
import React from 'react'
import {
	Links,
	LiveReload,
	Meta,
	Scripts,
	// useLoaderData,
	ScrollRestoration,
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

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

// get the user from the session (at the top)
export async function loader({ request }: LoaderArgs) {
	return json({
		user: await getUser(request),
	})
}


export default function App() {

	
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
	);
}
