import type { LinksFunction, ActionArgs, MetaFunction } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
// import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Box, Stack, Skeleton, Typography, Divider } from "@mui/material";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, login, register } from "~/utils/session.server";

const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
};

export const meta: MetaFunction = () => ({
	description: "Login to access your dashboard and account.",
	title: "dev foyer | login",
});

// export const links: LinksFunction = () => [
//     { rel: "stylesheet", href: stylesUrl },
//   ];

function validateUsername(username: unknown) {
	if (typeof username !== "string" || username.length < 3) {
		return "The username must be at least 3 characters long";
	}
}

function validatePassword(password: unknown) {
	if (typeof password !== "string" || password.length < 6) {
		return "The password must be at least 3 characters long";
	}
}

function validateUrl(url: string) {
	let urls = [
		"/signup",
		"/login",
		"/forgot-password",
		"/reset-password",
		"/",
		"/dashboard",
		"/account",
        "https://remix.run"
	];
	if (urls.includes(url)) {
		return url;
	}
	return "/login";
}

export const action = async ({ request }: ActionArgs) => {
	const form = await request.formData();
	const loginType = form.get("loginType");
	const username = form.get("username");
	const password = form.get("password");
	const redirectTo = validateUrl(
		form.get("redirectTo")?.toString() ?? "/login"
	);

	if (
		typeof loginType !== "string" ||
		typeof username !== "string" ||
		typeof password !== "string" ||
		typeof redirectTo !== "string"
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Something went wrong when submitting the form. Please try again.",
		});
	}

	const fields = { loginType, username, password };
	const fieldErrors = {
		username: validateUsername(username),
		password: validatePassword(password),
	};
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}

	switch (loginType) {
		case "login": {
			const user = await login({ username, password });
			console.log({ user }); // check if the user is logged in
			if (!user) {
				return badRequest({
					fieldErrors: null,
					fields,
					formError: "Invalid username or password",
				});
			}

			return createUserSession(user.id, redirectTo);
		}
		case "register": {
			const userExists = await db.user.findFirst({
				where: { username },
			});
			if (userExists) {
				return badRequest({
					fieldErrors: null,
					fields,
					formError: `User with username ${username} already exists`,
				});
			}
			// create the user
			// create their session and redirect to /dashboard
			const user = await register({ username, password });
			if (!user) {
				return badRequest({
					fieldErrors: null,
					fields,
					formError: `Something went wrong trying to create a new user.`,
				});
			}
			return createUserSession(user.id, redirectTo);
		}
		default: {
			return badRequest({
				fieldErrors: null,
				fields,
				formError: `Login type invalid`,
			});
		}
	}
};

export default function Login() {
    const actionData = useActionData<typeof action>();
	const [searchParams] = useSearchParams();
	// const username = searchParams.get('username') || '';
	// const password = searchParams.get('password') || '';
	return (
		// <Grid container>
		//     <Grid sx={styles.container}>
		//         <h5>Login</h5>
		//         <form method="post">
		//             <label>
		//                 Username
		//                 <input type="text" name="username" defaultValue={username} />
		//             </label>
		//             <label>
		//                 Password
		//                 <input type="password" name="password" defaultValue={password} />
		//             </label>
		//             <button type="submit">Login</button>
		//         </form>
		//         <Link to="/signup">Sign Up</Link>

		//     </Grid>
		// </Grid>

		<div className="container">
			<div className="content" data-light="">
				<h1>Login</h1>
				<form method="post">
					<input
						type="hidden"
						name="redirectTo"
						value={searchParams.get("redirectTo") ?? undefined}
					/>
					<fieldset>
						<legend className="sr-only">Login or Register</legend>
						<label>
							<input
								type="radio"
								name="loginType"
								value="login"
								defaultChecked
							/>{" "}
							Login
						</label>
						<label>
							<input
								type="radio"
								name="loginType"
								value="register"
							/>{" "}
							Register
						</label>
					</fieldset>
					<div>
						<label htmlFor="username-input">Username</label>
						<input
							type="text"
							id="username-input"
							name="username"
						/>
					</div>
					<div>
						<label htmlFor="password-input">Password</label>
						<input
							id="password-input"
							name="password"
							type="password"
						/>
					</div>
					<button type="submit" className="button">
						Submit
					</button>
				</form>
			</div>
			<div className="links">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/jokes">Jokes</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
