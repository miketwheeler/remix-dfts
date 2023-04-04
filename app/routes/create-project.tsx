import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
// import type { Decimal } from '@prisma/client/runtime';
import React, { useState } from "react";
import { json, redirect } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData, useLoaderData } from "@remix-run/react";
import { 
    Box, 
    Typography, 
    Divider, 
    Button, 
    Paper, 
    TextField, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio,
    Stepper, Step, StepLabel, StepContent, StepButton,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { createProjectValidators, validateUrl } from "~/validators/validators";

import UsersTeamPicker from "~/components/reusable-components/minor/UsersTeamPicker";
import MultiselectPicker from "~/components/reusable-components/minor/MultislectPicker";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";
import { createProject } from "~/utils/project.server";
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
        fundingGoal: createProjectValidators.validateProjectFundingGoal(fundingGoal),
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

const steps = [
    {
        label: "name & category",
        description: "give your project a name and general category: this will allow others to find your project and whether their skill set is a good fit",
    },
    {
        label: "synopsis & description",
        description: "you'll need to provide a description for your project: a synopsis should be an brief abstract (as much info as you want to exhibit publicly) that is public faciing - limited is probably best. Then include a bit more detail in your description that will only be available to who you share it with directly",
    },
    {
        label: "tech stack",
        description: "what tech or tech stack will you be using? this is a great way to find others and for them to find you quickly, it's also good to define the scope up front"
    },
    {
        label: "development timeframe & status",
        description: "give a start, end date, and if you'd like to set it as active -- you can change this later if you need to",
    },
    {
        label: "funding goal",
        description: "lets set a rough estimate for a funding goal: a funding goal is part-motivation part-estimation -- you can change this later as needed"
    },
    {
        label: "assign a team",
        description: "you can assign a team to your project: this will allow you to share your project with them and they can contribute to it as well"
    }
]



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

    const [formState, setFormState] = useState({
        name: '',
        type: '',
        synopsis: '',
        description: '',
        techStack: '',
        beginDate: '',
        endDate: '',
        active: false,
        fundingGoal: 0.00,
        // category: '',
        // team: '',
    })

    const [projectNameState, setProjectNameState] = useState('');
    const [fundingValue, setFundingValue] = useState({numberFormat: '0.00'});
    const [assignTeam, setAssignTeam] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [techStackContext, setTechStackContext] = useState('');

    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
    const handleReset = () => { 
        setActiveStep(0);
        setFormState({
            name: '',
            type: '',
            synopsis: '',
            description: '',
            techStack: '',
            beginDate: '',
            endDate: '',
            active: false,
            fundingGoal: 0.00,
            // category: '',
            // team: '',
        }) 
    };
    const handleStep = (step: number) => () => { setActiveStep(step) };

    const handleFundingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const ForwardBack = ({props}: any) => {
        return (
            <Box sx={{ mb: 2 }}>
                <div>
                    {
                        props.index !== steps.length -1
                        ?
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                            continue
                        </Button>
                        : null
                    }
                    {
                        props.index !== 0
                        ?
                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                            Back
                        </Button>
                        : null
                    }
                </div>
            </Box>
        )
    }



	return (
        <Box sx={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                create a new project
            </Typography>
            <Typography variant="body1" gutterBottom>
                already have a project going? go to {" "}
                <Link
                    to={{
                        pathname: "/dashboard/project",
                        search: searchParams.toString(),
                    }}
                    >
                    your projects
                </Link>
                &nbsp; -- else, let's get started
            </Typography>
                <Paper sx={styles.paper}>
                    <div className="content" data-light="">
                        <Typography
                            variant="h5" 
                            sx={{my: .5, display: 'inline-flex', wrap: 'nowrap'}}
                            >
                                project
                                { formState.name !== "" ? <div style={{opacity: .5}}>&nbsp; - {formState.name}</div> : null }
                        </Typography>
                        <Form method="post">
                            <input
                                type="hidden"
                                name="redirectTo"
                                value={searchParams.get("redirectTo") ?? undefined}
                                />

                            <Stepper activeStep={activeStep} orientation="vertical">
                                <Step key={'step-0'}>
                                    <StepButton color="inherit" onClick={handleStep(0)}>{steps[0].label}</StepButton>
                                    <StepContent>
                                        <Typography>{steps[0].description}</Typography>
                                        <Box sx={{ my: 2 }}>
                                            <TextField 
                                                id="name-input" 
                                                name="name"
                                                variant="outlined" 
                                                value={ formState.name } 
                                                label="name" 
                                                type="text"
                                                fullWidth={ true }
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, name: e.target.value  }));
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
                                                value={ formState.type }
                                                variant="outlined" 
                                                label="type (e.g. web app, mobile app)" 
                                                type="text"
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, type: e.target.value  }));
                                                }}
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
                                        <ForwardBack props={{index: 0}} />
                                    </StepContent>
                                </Step>
                                <Step key={'step-1'}>
                                    <StepButton color="inherit" onClick={handleStep(1)}>{steps[1].label}</StepButton>
                                    <StepContent>
                                    <Typography>{steps[1].description}</Typography>
                                        <Box sx={{ my: 2 }}>
                                            <TextField 
                                                id="synopsis-input" 
                                                name="synopsis"
                                                value={ formState.synopsis }
                                                variant="outlined" 
                                                label="synopsis (shortened description)" 
                                                type="text"
                                                multiline 
                                                rows={1}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, synopsis: e.target.value  }));
                                                }}
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
                                                value={ formState.description }
                                                variant="outlined" 
                                                label="description (full description)" 
                                                type="text" 
                                                multiline
                                                rows={6}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, description: e.target.value  }));
                                                }}
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
                                        <ForwardBack props={{index: 1}} />
                                    </StepContent>
                                </Step>
                                <Step key={'step-2'}>
                                    <StepButton color="inherit" onClick={handleStep(2)}>{steps[2].label}</StepButton>
                                    <StepContent>
                                        <Typography>{steps[2].description}</Typography>
                                        <Box sx={{ my: 2 }}>

                                            <MultiselectPicker props={{ formState, setFormState }} />
                                        
                                        </Box>
                                        <ForwardBack props={{index: 2}} />
                                    </StepContent>
                                </Step>
                                <Step key={'step-3'}>
                                    <StepButton color="inherit" onClick={handleStep(3)}>{steps[3].label}</StepButton>
                                    <StepContent>
                                        <Typography>{steps[3].description}</Typography>
                                        <Box sx={{ my: 2 }}>
                                            <TextField 
                                                id="beginDate-input" 
                                                name="beginDate"
                                                value={ formState.beginDate }
                                                variant="outlined" 
                                                label="end date (mm/dd/yyyy)" 
                                                type="text" 
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, beginDate: e.target.value  }));
                                                }}
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
                                                value={ formState.endDate }
                                                variant="outlined" 
                                                label="end date (mm/dd/yyyy)" 
                                                type="text" 
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, endDate: e.target.value  }));
                                                }}
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
                                                value={ formState.active }
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setFormState((prevState) => ({ ...prevState, active: !formState.active }));
                                                }}
                                                >
                                                <FormControlLabel value={true} label="yes" control={ <Radio /> } />
                                                <FormControlLabel value={false} label="no" control={ <Radio /> } />
                                            </RadioGroup>
                                        </FormControl>
                                        <ForwardBack props={{index: 3}} />
                                    </StepContent>
                                </Step>
                                <Step key={'step-4'}>
                                    <StepButton color="inherit" onClick={handleStep(4)}>{steps[4].label}</StepButton>
                                    <StepContent>
                                        <Typography>{steps[4].description}</Typography>
                                        <Box sx={{ my: 2 }}>
                                            <TextField 
                                                id="fundingGoal-input" 
                                                name="fundingGoal"
                                                variant="outlined" 
                                                label="funding goal" 
                                                value={ formState.fundingGoal }
                                                type="text" 
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={handleFundingChange}
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom as any,
                                                }}
                                                />
                                            {
                                                actionData?.fieldErrors?.fundingGoal ? (
                                                    <p
                                                        className="form-validation-error"
                                                        role="alert"
                                                        id="fundingGoal-error"
                                                        >
                                                        {actionData.fieldErrors.fundingGoal}
                                                    </p>
                                                ) : null
                                            }
                                        </Box>
                                        <ForwardBack props={{index: 4}} />
                                    </StepContent>
                                </Step>
                                <Step>
                                    <StepButton color="inherit" onClick={handleStep(5)}>{steps[5].label}</StepButton>
                                    <StepContent>
                                        <Typography>{steps[5].description}</Typography>
                                        <UsersTeamPicker props={{ loaderData }} teamAssignment={{ assignTeam, setAssignTeam }} />
                                        <ForwardBack props={{index: 5}} />
                                    </StepContent>
                                </Step>
                                <Box flexGrow={1} sx={{ display: 'flex-row', py: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        type="submit" 
                                        className="button" 
                                        sx={{ mt: 1 }}
                                        >
                                        create new project
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="button" 
                                        sx={{ mt: 1, ml: 2 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleReset();
                                        }}
                                        >
                                        cancel all
                                    </Button>
                                </Box>
                        </Stepper>
                    </Form>
                </div>
            </Paper>
        </Box>
	);
}
