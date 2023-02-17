import type { 
    ActionArgs, 
    MetaFunction, 
} from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Box, Typography, Button, Paper, TextField } from "@mui/material";
// import for data from DB
// import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, login } from "~/utils/session.server";
// import { useState } from "react";
import React from "react";



export const meta: MetaFunction = () => ({
	description: "Login to access your dashboard and account.",
	title: "dev foyer | login",
});


function validateUsername(username: unknown) {
	if (typeof username !== "string" || username.length < 3) {
		return "The username must be at least 3 characters long";
	}
}

function validatePassword(password: unknown) {
	if (typeof password !== "string" || password.length < 6) {
		return "The password must be at least 6 characters long";
	}
}


function validateUrl(url: string) {
	let urls = [
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
	return "/dashboard";
}

export const action = async ({ request }: ActionArgs) => {
	const form = await request.formData();
	const username = form.get("username");
	const password = form.get("password");                                      
	const redirectTo = validateUrl(
		form.get("redirectTo")?.toString() ?? "/dashboard"
	);

	if (
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

	const fields = { 
        username, 
        password
    };
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
    const user = await login({ username, password });
    // console.log({ user }); // check if the user is logged in
    if (!user) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: "Invalid username or password",
        });
    }
    console.log(``)

    return createUserSession(user.id, redirectTo);
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


	return (
		<Box sx={styles.container}>
            <Paper sx={styles.paper}>
                <div className="content" data-light="">
                    <Typography variant="h4" sx={{my: '1rem'}}>login</Typography>
                    <Form method="post">
                        <input
                            type="hidden"
                            name="redirectTo"
                            value={searchParams.get("redirectTo") ?? undefined}
                        />
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
                        <div className="flex items-center justify-center">
                            <div className="text-center text-sm text-gray-500">
                                new here? join by {" "}
                                <Link
                                    className="text-blue-500 underline"
                                    to={{
                                        pathname: "/register",
                                        search: searchParams.toString(),
                                    }}
                                    >
                                    creating a account
                                </Link>
                            </div>
                        </div>
                        <Button variant="outlined" type="submit" className="button" sx={{ mt: '1rem'}}>
                            log in
                        </Button>
                    </Form>
                </div>
            </Paper>
		</Box>
	);
}
