import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
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
    Stepper, Step, StepLabel, StepContent, StepButton, Alert,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { createProjectValidators } from "~/validators/validators";

import UsersTeamPicker from "~/components/reusable-components/minor/UsersTeamPicker";
import MultiselectPicker from "~/components/reusable-components/minor/MultislectPicker";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
// import { requireUserId } from "~/utils/session.server";
import { createProject } from "~/utils/project.server";
import { getUsersTeamData } from "~/utils/display.server";



interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface FormState {
    [key: string]: {
        value: string | boolean;
        error: string | null;
    }
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
    const fundingGoal = form.get("fundingGoal");
    // const team = form.get('team');

	const redirectTo = createProjectValidators.validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard/project");

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
        // team,
    };
	const fieldErrors = {
        name: createProjectValidators.validateProjectName(name),
        type: createProjectValidators.validateProjectType(type),
        synopsis: createProjectValidators.validateProjectSynopsis(synopsis),
        description: createProjectValidators.validateProjectDescription(description),
        techStack: createProjectValidators.validateProjectTechStack(techStack),
        beginDate: createProjectValidators.validateDate(beginDate),
        endDate: createProjectValidators.validateDate(endDate),
        fundingGoal: createProjectValidators.validateProjectFundingGoal(fundingGoal),
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
        fieldNames: ["name", "type"],
    },
    {
        label: "synopsis & description",
        description: "you'll need to provide a description for your project: a synopsis should be an brief abstract (as much info as you want to exhibit publicly) that is public faciing - limited is probably best. Then include a bit more detail in your description that will only be available to who you share it with directly",
        fieldNames: ["synopsis", "description"],
    },
    {
        label: "tech stack",
        description: "what tech or tech stack will you be using? this is a great way to find others and for them to find you quickly, it's also good to define the scope up front",
        fieldNames: ["techStack"],
    },
    {
        label: "development timeframe & status",
        description: "give a start, end date, and if you'd like to set it as active -- you can change this later if you need to",
        fieldNames: ["beginDate", "endDate", "active"],
    },
    {
        label: "funding goal",
        description: "lets set a rough estimate for a funding goal: a funding goal is part-motivation part-estimation -- you can change this later as needed",
        fieldNames: ["fundingGoal"],
    },
    {
        label: "assign a team",
        description: "you can assign a team to your project: this will allow you to share your project with them and they can contribute to it as well",
        fieldNames: ["team"],
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
    const [assignTeam, setAssignTeam] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formIsValid, setFormIsValid] = useState(false);

    const [newFormState, setNewFormState] = useState<FormState>({});

    const defaultState = {
        name: '',
        type: '',
        synopsis: '',
        description: '',
        techStack: '',
        beginDate: '',
        endDate: '',
        active: false,
        fundingGoal: 1,
        // team: '',
    }

    const [formState, setFormState] = useState(defaultState);

    // Expandable Step Form Actions
    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
    const handleReset = () => { 
        setActiveStep(0);
        setFormState(defaultState);
        setNewFormState({});
    };
    const handleStep = (step: number) => () => { setActiveStep(step) };


    const determineDisabled = (fieldValues: any[]) => {
        let returnValue = true;
        fieldValues.forEach((fieldName) => returnValue = !newFormState[fieldName] )

        return returnValue;
    }

    const ForwardBack = ({props}: any) => {
        const stepNames =  steps[props.index].fieldNames;

        return (
            <Box sx={{ mb: 2 }}>
                <div>
                    {
                        props.index !== steps.length -1
                        ?
                        <Button 
                            variant="contained" 
                            disabled={ 
                                // Needs to be disabled by default (true), then checked for bool or error state of field to enable
                                determineDisabled(stepNames) ||
                                Object.values(newFormState)?.some((item) => 
                                    item.value === "active" 
                                    ? false 
                                    // : item.value === "techStack"
                                    // ? Boolean(item.value.split(',').length < 2)
                                    : item.error
                                ) 
                            } 
                            onClick={ handleNext } 
                            sx={{ mt: 1, mr: 1 }}
                            >
                            continue
                        </Button>
                        : null
                    }
                    {
                        props.index !== 0
                        ?
                        <Button onClick={ handleBack } sx={{ mt: 1, mr: 1 }}>
                            back
                        </Button>
                        : null
                    }
                </div>
            </Box>
        )
    }

    // Form Field - specific actions
    const handleFundingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const formattedDate = createProjectValidators.validateDate(event.target.value);
    //     setFormState((prevState) => ({ ...prevState, [event.target.name]: formattedDate  }))
    // }


    const validateForm = () => {
        let errors: Record<string, string> = {};
        if(!formState.name) { 
            errors.name = "name is required";
        } else if(!createProjectValidators.validateProjectName(formState.name)) { 
            errors.name = "name is invalid";
        };
        if(!formState.type) {
            errors.type = "type is required";
        } else if(!createProjectValidators.validateProjectType(formState.type)) {
            errors.type = "type is invalid";
        };
        if(!formState.synopsis) {
            errors.synopsis = "synopsis is required";
        } else if(!createProjectValidators.validateProjectSynopsis(formState.synopsis)) {
            errors.synopsis = "synopsis is invalid";
        };
        if(!formState.description) {
            errors.description = "description is required";
        } else if(!createProjectValidators.validateProjectDescription(formState.description)) {
            errors.description = "description is invalid";
        };
        if(!formState.techStack) {
            errors.techStack = "tech stack is required";
        } else if(!createProjectValidators.validateProjectTechStack(formState.techStack)) {
            errors.techStack = "tech stack is invalid";
        };
        if(!formState.beginDate) {
            errors.beginDate = "begin date is required";
        } else if (!(formState.endDate.length >= 1 && formState.endDate.length < 10)) {
            errors.beginDate = "begin date is incomplete";
        }
        if(!formState.endDate) {
            errors.endDate = "end date is required";
        } else if (!(formState.endDate.length >= 1 && formState.endDate.length < 10)) {
            errors.endDate = "end date is incomplete";
        }
        // if(!formState.team) {
        //     errors.team = "team is required"
        // } else if(!createProjectValidators.validateProjectTeam(formState.team)) {
        //     errors.team = "team is invalid"
        // };

        setFormErrors(errors);
        setFormIsValid(Object.keys(errors).length === 0);

        return Object.keys(errors).length === 0;
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return validateForm();
    }

    const validateDate = (date: string) => {
        const regex = /^([0-9]{1,2})\/?([0-9]{1,2})?\/?([0-9]{0,4})?$/;
        const match = date.replace(/\D/g, '').match(regex);
        if(match === null) {
            return '';
        }
        let formatted = '';
        if(match[1]) {
            formatted += match[1];
            if(match[2]) {
                formatted += '/' + match[2];
                if(match[3]) {
                    formatted += '/' + match[3];
                }
            }
        }
        return formatted;
    } 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | null = null;
        let formattedValue;

        if(name === "beginDate" || name === "endDate") {
            formattedValue = validateDate(value);
            error = validateField(name, formattedValue);
        }
        else {
            error = validateField(name, value);
        }

        setNewFormState({ ...newFormState, [name]: { value: formattedValue ?? value, error } });
    };

    const validateField = (name: string, value: string): string | null => {
        switch (name) {
            case "name":
                return (value.length > 2) ? null : "name must be at least 3 characters";
            case "type":
                return (value.length > 4) ? null : "type must be at least 3 characters";
            case "synopsis":
                return (value.length > 10) ? null : "synopsis is a sentance and must be at least 10 characters";
            case "description":
                return (value.length > 60) ? null : "description is too short, it must be at least 60 characters";
            case "techStack":
                return (value?.split(',').length > 2) ? null : "tech stack cannot consist of 0 technologies";
                // return (typeof value !== "string" || value.split(',').length < 2)
            case "beginDate":
                return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
            case "endDate":
                return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
            case "team":
                return (value.length > 2) ? null : "team must be at least 3 characters";
            default:
                return null;
        }
    }

    // const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     const error = validateField(name, value);
    //     setNewFormState({ ...newFormState, [name]: { ...newFormState[name], error } });
    // };
    


	return (
        <Box sx={styles.container}>
            {/* {
                actionData ? 
                <Alert severity="success" sx={{ mb: 2 }}>
                    <p>{actionData?.message}</p>
                </Alert>
                : null
            } */}
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
                                { newFormState.name?.value ? <div style={{opacity: .5}}>&nbsp; - {newFormState.name?.value}</div> : null }
                        </Typography>
                        <Form method="post" id="create-project-form" onSubmit={ handleFormSubmit }>
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
                                                required
                                                // value={ formState.name }
                                                value={ newFormState.name?.value || "" } 
                                                label="project name" 
                                                type="text"
                                                fullWidth={ true }
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.name?.error) }
                                                helperText={ newFormState.name?.error || "" }
                                                // onChange={(e) => {
                                                //     e.preventDefault();
                                                //     setFormState((prevState) => ({ ...prevState, name: e.target.value  }));
                                                // }}
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.name) }
                                                // aria-errormessage={ actionData?.fieldErrors?.name ? "project-name-error" : undefined }
                                                />
                                            {
                                                actionData?.fieldErrors?.name 
                                                ? (
                                                    <p
                                                        className="form-validation-error"
                                                        role="alert"
                                                        id="name-error"
                                                        >
                                                        There was an {actionData?.fieldErrors?.name}
                                                    </p>
                                                ) : null
                                            }
                                        </Box>
                                        <Box sx={{ my: 2 }}>
                                            <TextField 
                                                id="type-input" 
                                                name="type"
                                                required
                                                // value={ formState.type }
                                                value={ newFormState.type?.value || "" } 
                                                variant="outlined" 
                                                label="type (e.g. web app, mobile app)" 
                                                type="text"
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.type?.error) }
                                                helperText={ newFormState.type?.error || "" }
                                                // onChange={(e) => {
                                                //     e.preventDefault();
                                                //     setFormState((prevState) => ({ ...prevState, type: e.target.value  }));
                                                // }}
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.type) }
                                                // aria-errormessage={ actionData?.fieldErrors?.type ? "project-type-error" : undefined }
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
                                        <ForwardBack props={{ index: 0 }} />
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
                                                required
                                                // value={ formState.synopsis }
                                                value={ newFormState.synopsis?.value || "" }
                                                variant="outlined" 
                                                label="synopsis (shortened description)" 
                                                type="text"
                                                multiline 
                                                rows={1}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.synopsis?.error) }
                                                helperText={ newFormState.synopsis?.error || "" }
                                                // onChange={(e) => {
                                                //     e.preventDefault();
                                                //     setFormState((prevState) => ({ ...prevState, synopsis: e.target.value  }));
                                                // }}
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.synopsis) }
                                                // aria-errormessage={ actionData?.fieldErrors?.synopsis ? "synopsis-error" : undefined }
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
                                                required
                                                // value={ formState.description }
                                                value={ newFormState.description?.value || "" }
                                                variant="outlined" 
                                                label="description (full description)" 
                                                type="text" 
                                                multiline
                                                rows={6}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.description?.error) }
                                                helperText={ newFormState.description?.error || "" }
                                                // onChange={(e) => {
                                                //     e.preventDefault();
                                                //     setFormState((prevState) => ({ ...prevState, description: e.target.value  }));
                                                // }}
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.description) }
                                                // aria-errormessage={ actionData?.fieldErrors?.description ? "description-error" : undefined }
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
                                            {/* This is a separated tech stack picker component - returns a string of techs */}
                                            <MultiselectPicker props={{ newFormState, setNewFormState }} />
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
                                                required
                                                // value={ formState.beginDate }
                                                value={ newFormState.beginDate?.value || ""}
                                                variant="outlined" 
                                                label="begin date (mm/dd/yyyy)" 
                                                type="text" 
                                                inputProps={{ maxLength: 10, minlength: 10}}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.beginDate?.error) }
                                                helperText={ newFormState.beginDate?.error || "" }
                                                // onChange={ handleDateChange }
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.beginDate) }
                                                // aria-errormessage={ actionData?.fieldErrors?.beginDate ? "beginDate-error" : undefined }
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
                                                required
                                                // value={ formState.endDate }
                                                value={ newFormState.endDate?.value || "" }
                                                variant="outlined" 
                                                label="end date (mm/dd/yyyy)" 
                                                type="text" 
                                                inputProps={{ maxLength: 10, minlength: 10}}
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                // onBlur={ handleBlur }
                                                error={ Boolean(newFormState.endDate?.error) }
                                                helperText={ newFormState.endDate?.error || "" }
                                                // onChange={ handleDateChange }
                                                // aria-invalid={ Boolean(actionData?.fieldErrors?.endDate) }
                                                // aria-errormessage={ actionData?.fieldErrors?.endDate ? "endDate-error" : undefined }
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
                                        <Divider sx={{ mt: 1, mb: 2 }}/>
                                        <FormControl>
                                            <FormLabel id="project-active-radio-choice">initialize this project in active development?</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="project-active-radio-choice"
                                                name="active"
                                                // value={ formState.active }
                                                value={ newFormState.active?.value || false }
                                                onChange={(event) => setNewFormState({ 
                                                    ...newFormState, 
                                                    [event?.target.name]: { 
                                                        value: !newFormState.active?.value, 
                                                        error: null
                                                    } 
                                                })}
                                                // onChange={(e) => {
                                                //     e.preventDefault();
                                                //     setFormState((prevState) => ({ ...prevState, active: !formState.active }));
                                                // }}
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
                                                required
                                                variant="outlined" 
                                                label="funding goal" 
                                                value={ formState.fundingGoal }
                                                type="text" 
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={handleFundingChange}
                                                InputProps={{ inputComponent: NumericFormatCustom as any }}
                                                error={ Boolean(formErrors.fundingGoal) }
                                                helperText={ formErrors.fundingGoal }
                                                aria-invalid={ Boolean(actionData?.fieldErrors?.fundingGoal) }
                                                aria-errormessage={ actionData?.fieldErrors?.fundingGoal ? "fundingGoal-error" : undefined }
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
                                        className="button" 
                                        sx={{ mt: 1}}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleReset();
                                        }}
                                        >
                                        cancel all
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        type="submit" 
                                        className="button" 
                                        sx={{ mt: 1, ml: 2  }}
                                        // disabled={ !formIsValid }
                                        >
                                        create new project
                                    </Button>
                                    
                                </Box>
                        </Stepper>
                    </Form>
                </div>
            </Paper>
        </Box>
	);
}
