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
import theme from "~/styles/theme";
import { ThemeProvider } from "@mui/material/styles";


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
