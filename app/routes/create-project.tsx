import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
import React, { useState } from "react";
import { json } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";
import { Box, Typography, Divider, Button, Paper, TextField } from "@mui/material";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, register } from "~/utils/session.server";

import { requireUserId } from "~/utils/session.server";

// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


// // exports the 'index' page of the member hall route - the parent of subsequent member hall content
// export default function CreateProjectRoute() {    
//     return (
//         <div>Project Page</div>
//     );
// }





export const meta: MetaFunction = () => ({
	description: "Register to create an project and access your dashboard.",
	title: "dev foyer | register",
});


function validateTeamName(username: unknown) {
	if (typeof username !== "string" || username.length < 3) {
		return "The username must be at least 3 characters long";
	}
}

// function validatePassword(password: unknown) {
// 	if (typeof password !== "string" || password.length < 6) {
// 		return "The password must be at least 6 characters long";
// 	}
// }

// function validatePasswordConfirm(passwordConfirm: unknown, password: unknown) {
//     if (passwordConfirm !== password) {
//         return "The passwords do not match";
//     }
// }

// TODO: needs to satisfy @somehting.com - (use regex or library that will work server side)
function validateEmail(email: unknown) {
    if (typeof email !== "string" || email.length < 6) {
        return "The email must be at least 6 characters long";
    }
}

function validateFirstName(firstName: unknown) {
	if (typeof firstName !== "string" || firstName.length < 1) {
		return "The first name must be at least 1 character long";
	}
}

function validateLastName(lastName: unknown) {
	if (typeof lastName !== "string" || lastName.length < 1) {
		return "The lastName must be at least 1 character long";
	}
}

function validateDevType(devType: unknown) {
	if (typeof devType !== "string" || devType.length < 3) {
		return "The dev type must be at least 3 characters long";
	}
}

function validateUrl(url: string) {
	let urls = [
		"/forgot-password",
		"/reset-password",
		"/",
		"/dashboard",
		"/project",
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
    const passwordConfirm = form.get("passwordConfirm");
    const email = form.get("email");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const devType = form.get("devType");                                        
	const redirectTo = validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard");

	if (
		typeof username !== "string" ||
		typeof password !== "string" ||
        typeof passwordConfirm !== "string" ||
        typeof email !== "string" ||
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof devType !== "string" ||
		typeof redirectTo !== "string"
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Something went wrong when submitting the form. Please try again.",
		});
	}

	const fields = { username, password, email, firstName, lastName, devType };
	const fieldErrors = {
		username: validateTeamName(username),
		// password: validatePassword(password),
        // passwordConfirm: validatePasswordConfirm(passwordConfirm, password),
        email: validateEmail(email),
        firstName: validateFirstName(firstName),
        lastName: validateLastName(lastName),
        devType: validateDevType(devType),
	};
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}
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
    // create the user && create their session and redirect to /dashboard
    const user = await register({ username, password, email, firstName, lastName, devType });
    if (!user) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Something went wrong creating your new project.`,
        });
    }

    return createUserSession(user.id, "/dashboard");
    // return redirect("/login");
};

const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
        maxWidth: "400px",
        // mx: "auto",
        mt: 2.5,
        m: 2,
        // my: "2rem",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};

export default function CreateProject() {
    const actionData = useActionData<typeof action>();
	const [searchParams] = useSearchParams();
    const [projectName, setProjectName] = useState('');


	return (
		<Box sx={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                create a new project
            </Typography>
            <Typography variant="body1" gutterBottom>
                set up a new project to kick something off
            </Typography>
            <Paper sx={styles.paper}>
                <div className="content" data-light="">
                    <Typography
                        variant="h4" 
                        sx={{my: '1rem', display: 'inline-flex', wrap: 'nowrap'}}
                        >
                            project
                            { projectName !== "" ? <div style={{opacity: .5}}>&nbsp; - {projectName}</div> : null }
                    </Typography>
                    <Form method="post">
                        <input
                            type="hidden"
                            name="redirectTo"
                            value={searchParams.get("redirectTo") ?? undefined}
                        />
                        <Box sx={{ my: 2 }}>
                            <TextField 
                                id="project-name-input" 
                                name="project name"
                                variant="outlined" 
                                label="project name" 
                                type="text" 
                                fullWidth={ true }
                                onChange={(e) => {
                                    e.preventDefault();
                                    setProjectName(e.target.value);
                                }}
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
                                id="project-type-input" 
                                name="type"
                                variant="outlined" 
                                label="type (e.g. web app, mobile app, etc.)" 
                                type="text"
                                fullWidth={ true }
                                color="secondary"
                                defaultValue={ actionData?.fields?.email } 
                                aria-invalid={ Boolean(actionData?.fieldErrors?.email) }
                                aria-errormessage={ actionData?.fieldErrors?.email ? "email-error" : undefined }
                                />
                            {
                                actionData?.fieldErrors?.email ? (
                                    <p
                                        className="form-validation-error"
                                        role="alert"
                                        id="email-error"
                                        >
                                        {actionData.fieldErrors.email}
                                    </p>
                                ) : null
                            }
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <TextField 
                                id="firstName-input" 
                                name="firstName"
                                variant="outlined" 
                                label="first name" 
                                type="text" 
                                fullWidth={ true }
                                color="secondary"
                                defaultValue={ actionData?.fields?.firstName } 
                                aria-invalid={ Boolean(actionData?.fieldErrors?.firstName) }
                                aria-errormessage={ actionData?.fieldErrors?.firstName ? "firstName-error" : undefined }
                                />
                            {
                                actionData?.fieldErrors?.firstName ? (
                                    <p
                                        className="form-validation-error"
                                        role="alert"
                                        id="firstName-error"
                                        >
                                        {actionData.fieldErrors.firstName}
                                    </p>
                                ) : null
                            }
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <TextField 
                                id="lastName-input" 
                                name="lastName"
                                variant="outlined" 
                                label="last name" 
                                type="text" 
                                fullWidth={ true }
                                color="secondary"
                                defaultValue={ actionData?.fields?.lastName } 
                                aria-invalid={ Boolean(actionData?.fieldErrors?.lastName) }
                                aria-errormessage={ actionData?.fieldErrors?.lastName ? "lastName-error" : undefined }
                                />
                            {
                                actionData?.fieldErrors?.lastName ? (
                                    <p
                                        className="form-validation-error"
                                        role="alert"
                                        id="lastName-error"
                                        >
                                        {actionData.fieldErrors.lastName}
                                    </p>
                                ) : null
                            }
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <TextField 
                                id="devType-input" 
                                name="devType"
                                variant="outlined" 
                                label="dev type" 
                                type="text" 
                                fullWidth={ true }
                                color="secondary"
                                defaultValue={ actionData?.fields?.devType } 
                                aria-invalid={ Boolean(actionData?.fieldErrors?.devType) }
                                aria-errormessage={ actionData?.fieldErrors?.devType ? "devType-error" : undefined }
                                />
                            {
                                actionData?.fieldErrors?.devType ? (
                                    <p
                                        className="form-validation-error"
                                        role="alert"
                                        id="devType-error"
                                        >
                                        {actionData.fieldErrors.devType}
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
                                already have an project? go to {" "}
                                <Link
                                    className="text-blue-500 underline"
                                    to={{
                                        pathname: "/login",
                                        search: searchParams.toString(),
                                    }}
                                    >
                                    login
                                </Link>
                            </div>
                        </div>
                        <Button variant="outlined" type="submit" className="button" sx={{ mt: '1rem'}}>
                            create project
                        </Button>
                    </Form>
                </div>
            </Paper>
		</Box>
	);
}
