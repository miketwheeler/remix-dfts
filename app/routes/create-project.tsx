import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
// import type { Decimal } from '@prisma/client/runtime';
import React, { useState } from "react";
import { json, redirect } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData, useLoaderData } from "@remix-run/react";
import { Box, Typography, Divider, Button, Paper, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { createProjectValidators, validateUrl } from "~/validators/validators";

import UsersTeamPicker from "~/components/reusable-components/minor/UsersTeamPicker";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";
import { createProject } from "~/utils/create.server";
import { getUsersTeamData } from "~/utils/display.server";



interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	// const userId = await requireUserId(request);
    const teams = await getUsersTeamData(request);

	return json(teams);
}

export const meta: MetaFunction = () => ({
	description: "Create a project and access it on your dashboard.",
	title: "dev foyer | create project",
});



export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const name = form.get("name");
    const type = form.get("type");
    const synopsis = form.get("synopsis");
    const description = form.get("description");
    const techStack = form.get("techStack");
    const beginDate = form.get("beginDate");
    const endDate = form.get("endDate");
    const active = form.get("active") ?? true;
    const fundingGoal = form.get("fundingGoal") ?? 0.0;
    // const category = form.get('category');
    // const team = form.get('team');

	const redirectTo = validateUrl.validateFn(form.get("redirectTo")?.toString() ?? "/dashboard/project");

	if (
		typeof name !== "string" ||
        typeof type !== "string" ||
        typeof synopsis !== "string" ||
		typeof description !== "string" ||
        typeof techStack !== "string" ||
        typeof beginDate !== "string" ||
        typeof endDate !== "string" ||
        typeof active !== "boolean" ||
        typeof fundingGoal !== "number" ||
        // typeof team !== "string" ||
		typeof redirectTo !== "string" 
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Something went wrong when submitting the form. Please try again.",
		});
	}

	const fields = { 
        name: name, 
        type: type, 
        synopsis: synopsis, 
        description: description,
        techStack: techStack, 
        beginDate: beginDate, 
        endDate: endDate, 
        active: active, 
        fundingGoal: fundingGoal, 
        // category,
        // team,
    };
	const fieldErrors = {
        name: createProjectValidators.validateProjectName(name),
        type: createProjectValidators.validateProjectType(type),
        synopsis: createProjectValidators.validateProjectSynopsis(synopsis),
        description: createProjectValidators.validateProjectDescription(description),
        techStack: createProjectValidators.validateProjectTechStack(techStack),
        beginDate: createProjectValidators.validateProjectBeginDate(beginDate),
        endDate: createProjectValidators.validateProjectEndDate(endDate),
        // projectFundingGoal: validateProjectFundingGoal(projectFundingGoal),
        // projectCategories: validateProjectCategories(projectCategories),
        // projectTeam: validateProjectTeam(projectTeam),
	};
	if(Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}
    const projectExists = await db.project.findFirst({
        where: { name },
    });
    if(projectExists) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Project with the name ${name} already exists`,
        });
    }
    // create the project && create their session and redirect to /dashboard
    const project = await createProject({ 
        name,
        type,
        synopsis,
        description,
        techStack,
        beginDate,
        endDate,
        active,
        fundingGoal,
        // category,
        // team,
    });
    if(!project) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Something went wrong creating your new project.`,
        });
    }

    return redirect("/dashboard/project");
};

const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
        mx: 1,
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				thousandSeparator
				valueIsNumericString
				prefix="$"
			/>
		);
	}
);


export default function CreateProject() {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
    const [projectNameState, setProjectNameState] = useState('');
    const [fundingValue, setFundingValue] = useState({numberFormat: '0.00'});


    const handleFundingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFundingValue({
            ...fundingValue,
            [event.target.name]: event.target.value,
        });
    };


	return (
        <Grid container spacing={2} sx={{justifyContent: 'center', mt: 2.5}}>
            <Grid sm={12} md={6}>
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
                                variant="h5" 
                                sx={{my: .5, display: 'inline-flex', wrap: 'nowrap'}}
                                >
                                    project
                                    { projectNameState !== "" ? <div style={{opacity: .5}}>&nbsp; - {projectNameState}</div> : null }
                            </Typography>
                            <Form method="post">
                                <input
                                    type="hidden"
                                    name="redirectTo"
                                    value={searchParams.get("redirectTo") ?? undefined}
                                />
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="name-input" 
                                        name="name"
                                        variant="outlined" 
                                        label="name" 
                                        type="text" 
                                        fullWidth={ true }
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setProjectNameState(e.target.value);
                                        }}
                                        defaultValue={ actionData?.fields?.name } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.name) }
                                        aria-errormessage={ actionData?.fieldErrors?.name ? "name-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.name 
                                        ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="name-error"
                                                >
                                                {actionData?.fieldErrors?.name}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="type-input" 
                                        name="type"
                                        variant="outlined" 
                                        label="type (e.g. web app, mobile app, etc.)" 
                                        type="text"
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.type } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.type) }
                                        aria-errormessage={ actionData?.fieldErrors?.type ? "type-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.type ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="type-error"
                                                >
                                                {actionData.fieldErrors.type}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="synopsis-input" 
                                        name="synopsis"
                                        variant="outlined" 
                                        label="synopsis (shortened description)" 
                                        type="text"
                                        multiline 
                                        rows={4}
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.synopsis } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.synopsis) }
                                        aria-errormessage={ actionData?.fieldErrors?.synopsis ? "synopsis-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.synopsis ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="synopsis-error"
                                                >
                                                {actionData.fieldErrors.synopsis}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="description-input" 
                                        name="description"
                                        variant="outlined" 
                                        label="description (full description)" 
                                        type="text" 
                                        multiline
                                        rows={6}
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.description } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.description) }
                                        aria-errormessage={ actionData?.fieldErrors?.description ? "description-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.description ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="description-error"
                                                >
                                                {actionData.fieldErrors.description}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="techStack-input" 
                                        name="techStack"
                                        variant="outlined" 
                                        label="begin date (mm/dd/yyyy)" 
                                        type="text" 
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.techStack } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.techStack) }
                                        aria-errormessage={ actionData?.fieldErrors?.techStack ? "techStack-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.techStack ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="techStack-error"
                                                >
                                                {actionData.fieldErrors.techStack}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="beginDate-input" 
                                        name="beginDate"
                                        variant="outlined" 
                                        label="end date (mm/dd/yyyy)" 
                                        type="text" 
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.beginDate } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.beginDate) }
                                        aria-errormessage={ actionData?.fieldErrors?.beginDate ? "beginDate-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.beginDate ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="beginDate-error"
                                                >
                                                {actionData.fieldErrors.beginDate}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="endDate-input" 
                                        name="endDate"
                                        variant="outlined" 
                                        label="tech stack" 
                                        type="text" 
                                        fullWidth={ true }
                                        color="secondary"
                                        defaultValue={ actionData?.fields?.endDate } 
                                        aria-invalid={ Boolean(actionData?.fieldErrors?.endDate) }
                                        aria-errormessage={ actionData?.fieldErrors?.endDate ? "endDate-error" : undefined }
                                        />
                                    {
                                        actionData?.fieldErrors?.endDate ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                id="endDate-error"
                                                >
                                                {actionData.fieldErrors.endDate}
                                            </p>
                                        ) : null
                                    }
                                </Box>
                                <FormControl>
                                    <FormLabel id="project-active-radio-choice">active development</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="project-active-radio-choice"
                                        name="project-active-radio-group"
                                        defaultValue={ actionData?.fields?.active ?? true}
                                        aria-invalid={ actionData?.fields?.active === undefined ? true : false }
                                        >
                                        <FormControlLabel value="true" label="yes" control={ <Radio /> } />
                                        <FormControlLabel value="false" label="no" control={ <Radio /> } />
                                    </RadioGroup>
                                </FormControl>
                                <Box sx={{ my: 2 }}>
                                    <TextField 
                                        id="fundingGoal-input" 
                                        name="fundingGoal"
                                        variant="outlined" 
                                        label="funding goal" 
                                        type="text" 
                                        fullWidth={ true }
                                        color="secondary"
                                        onChange={handleFundingChange}
                                        InputProps={{
                                            inputComponent: NumericFormatCustom as any,
                                        }}
                                        />
                                </Box>
                                {/* <div id="form-error-message">
                                    {
                                        actionData?.formError?.techStack ? (
                                            <p
                                                className="form-validation-error"
                                                role="alert"
                                                >
                                                {actionData.formError?.techStack}
                                            </p>
                                        ) : null
                                    }
                                </div> */}
                                <div className="flex items-center justify-center">
                                    <div className="text-center text-sm text-gray-500">
                                        already have an project? go to {" "}
                                        <Link
                                            // className="text-purple-500 underline"
                                            to={{
                                                pathname: "/dashboard/project",
                                                search: searchParams.toString(),
                                            }}
                                            >
                                            your projects
                                        </Link>
                                    </div>
                                </div>
                                <Button variant="outlined" type="submit" className="button" sx={{ mt: '1rem' }}>
                                    create new project
                                </Button>
                            </Form>
                        </div>
                    </Paper>
                </Box>
            </Grid>
            <Grid sm={12} md={6}>
                <UsersTeamPicker props={{ loaderData }} />
            </Grid>
        </Grid>
	);
}
