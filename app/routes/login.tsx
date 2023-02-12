import type { LinksFunction, ActionArgs, MetaFunction } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
// import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Box, Typography, Divider, Button, Paper, TextField, FormControlLabel, Radio, RadioGroup } from "@mui/material";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, login, register } from "~/utils/session.server";




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

const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
        maxWidth: "400px",
        mx: "auto",
        my: "2rem",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};

export default function Login() {
    const actionData = useActionData<typeof action>();
	const [searchParams] = useSearchParams();
	// const username = searchParams.get('username') || '';
	// const password = searchParams.get('password') || '';
	return (
		<Box sx={styles.container}>
            <Paper sx={styles.paper}>
			<div className="content" data-light="">
				<Typography variant="h4">Login</Typography>
				<form method="post">
					<input
						type="hidden"
						name="redirectTo"
						value={searchParams.get("redirectTo") ?? undefined}
					/>
					<fieldset style={{ borderRadius: '4px', alignItems: 'center'}}>
						<legend className="sr-only">Sign-in or Sign up</legend>
                        <RadioGroup
                            row={true}
                            aria-label="loginType"
                            name="loginType"
                            defaultValue="login"
                            >
                            <FormControlLabel 
                                value="login" 
                                control={<Radio />} 
                                label="login" 
                                defaultChecked={ !actionData?.fields?.loginType || actionData?.fields?.loginType === "login" } 
                                />
                            <FormControlLabel 
                                value="register" 
                                control={<Radio />} 
                                label="register" 
                                defaultChecked={ actionData?.fields?.loginType === "register" } 
                                />
                        </RadioGroup>
						{/* <label>
							<input
								type="radio"
								name="loginType"
								value="login"
								defaultChecked={ !actionData?.fields?.loginType || actionData?.fields?.loginType === "login" }
							/>{" "}
							login
						</label>
						<label>
							<input
								type="radio"
								name="loginType"
								value="register"
                                defaultChecked={ actionData?.fields?.loginType === "register" }
							/>{" "}
							register
						</label> */}
					</fieldset>
					<Box sx={{ my: 2 }}>
                        <TextField 
                            id="username-input" 
                            name="username"
                            variant="outlined" 
                            label="username" 
                            type="text" 
                            fullWidth={ true }
                            defaultValue={ actionData?.fields?.username } 
                            aria-invalid={ Boolean(actionData?.fieldErrors?.username) }
                            aria-errormessage={ actionData?.fieldErrors?.username ? "username-error" : undefined }
                            />
						{/* <label htmlFor="username-input">username</label>
						<input
							type="text"
							id="username-input"
							name="username"
                            defaultValue={actionData?.fields?.username}
                            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                            aria-errormessage={actionData?.fieldErrors?.username ? "username-error" : undefined }
						/> */}
                        {
                            actionData?.fieldErrors?.username 
                            ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="username-error"
                                    >
                                    {actionData.fieldErrors.username}
                                </p>
                            ) : null
                        }
					</Box>
					<Box sx={{ my: 2 }}>
                        <TextField 
                            id="password-input" 
                            name="password"
                            variant="outlined" 
                            label="password" 
                            type="password" 
                            fullWidth={ true }
                            color="secondary"
                            defaultValue={ actionData?.fields?.password } 
                            aria-invalid={ Boolean(actionData?.fieldErrors?.password) }
                            aria-errormessage={ actionData?.fieldErrors?.password ? "password-error" : undefined }
                            />
						{/* <label htmlFor="password-input">password</label>
						<input
							id="password-input"
							name="password"
							type="password"
                            defaultValue={actionData?.fields?.password}
                            aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                            aria-errormessage={actionData?.fieldErrors?.password ? "password-error" : undefined }
						/> */}
                        {
                            actionData?.fieldErrors?.password ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    id="password-error"
                                    >
                                    {actionData.fieldErrors.password}
                                </p>
                            ) : null
                        }
					</Box>
                    <div id="form-error-message">
                        {
                            actionData?.formError ? (
                                <p
                                    className="form-validation-error"
                                    role="alert"
                                    >
                                    {actionData.formError}
                                </p>
                            ) : null
                        }
                    </div>
					<Button variant="outlined" type="submit" className="button" sx={{ mt: '1rem'}}>
						Submit
					</Button>
				</form>
			</div>
			{/* <div className="links">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/jokes">Jokes</Link>
					</li>
				</ul>
			</div> */}
            </Paper>
		</Box>
	);
}
