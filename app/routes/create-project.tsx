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
];

const formFieldData = [
    {
        name: {
            name: "name",
            label: "project name",
            // fieldType: "text",
            required: true,
        },
        type: {
            name: "type",
            label: "project type (e.g. web app, mobile app, etc.)",
            // fieldType: "text",
            required: true,
        },
    },
    {
        synopsis: {
            name: "synopsis",
            label: "synopsis (shortened description)",
            // fieldType: "text",
            required: true,
        },
        description: {
            name: "description",
            label: "description (full description)",
            // fieldType: "text",
            required: true,
        },
    },
    {
        techStack: {
            name: "techStack",
        },
    },
    {
        beginDate: {
            name: "beginDate",
            label: "begin date (mm/dd/yyyy)",
            // type: "text",
            required: true,
        },
        endDate: {
            name: "endDate",
            label: "end date (mm/dd/yyyy)",
            // type: "text",
            required: true,
        },
        active: {
            name: "active",
        },
    },
    {
        fundingGoal: {
            name: "fundingGoal",
            label: "funding goal",
            // type: "text",
        },
    },
    {
        team: { 
            name: "team",
        },
    }
];



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
        // setFormState(defaultState);
        setNewFormState({});
    };
    const handleStep = (step: number) => () => { setActiveStep(step) };


    const determineDisabled = (fieldValues: any[]) => {
        let returnValue = true;
        fieldValues.forEach((fieldName) => returnValue = !newFormState[fieldName] )

        return returnValue;
    }

    const ForwardBack = ({props}: any) => {
        const stepNames = steps[props.index].fieldNames;
        // console.log(`stepNames: ${stepNames}`)

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
                                    : item.value === "techStack"
                                    ? Boolean(item.value.split(',').length < 2)
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
        setNewFormState((prevState) => ({
            ...prevState,
            [event.target.name]: { value: event.target.value, error: null },
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
        let error: string | null;
        let formattedValue;

        if(name === "beginDate" || name === "endDate") {
            formattedValue = validateDate(value);
        }
        error = validateField(name, formattedValue !== undefined ? formattedValue : value);
        // console.log(`value on input change: ${value}, if formatted: ${formattedValue}, techStack: ${newFormState.techStack?.value}`)
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
            case "beginDate":
                return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
            case "endDate":
                return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
            case "fundingGoal":
                return (Number(value) >= 1) ? null : "funding goal should at least be a dollar";
            default:
                return null;
        }
    }

    const CreateFormFields = ({props}: any) => {
        const formFieldSet = formFieldData[props.index];
        // console.log(`formFieldSet: ${JSON.stringify(formFieldSet, null, 2)};; formfieldset type: ${typeof formFieldSet}`)
        const fundingExtraProp = { InputProps: { inputComponent: NumericFormatCustom as any } };
        const dateExtraProp = { inputProps: { maxLength: 10, minLength: 10 } };
        const multilineExtraProp = { multiline: true, rows: 5 }

        return (
            <>
                {
                    Object.values(formFieldSet)?.map((formFieldEntry) => (
                        (formFieldEntry.name === "techStack" || formFieldEntry.name === "team" || formFieldEntry.name === "active") 
                        ?
                            <Box sx={{my: 2}} key={`textfield-container-${formFieldEntry.name}`}>
                                {
                                    formFieldEntry.name === "techStack"
                                    ? 
                                        //  This is external techstack picker component - returns a string of techs
                                        <MultiselectPicker props={{ newFormState, setNewFormState }} />
                                    :
                                    formFieldEntry.name === "team"
                                    ?
                                        //  This is external team picker component - returns a string of team members
                                        <UsersTeamPicker props={{ newFormState, setNewFormState }} />
                                    :
                                    <>
                                        <Divider sx={{ mt: 1, mb: 2 }}/>
                                        <FormControl>
                                            <FormLabel id="project-active-radio-choice">initialize this project in active development?</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="project-active-radio-choice"
                                                name="active"
                                                value={ newFormState[formFieldEntry.name]?.value || false }
                                                onChange={(event) => setNewFormState({ 
                                                    ...newFormState, 
                                                    [event?.target.name]: { 
                                                        value: !newFormState.active?.value, 
                                                        error: null
                                                    } 
                                                })}
                                                >
                                                <FormControlLabel value={true} label="yes" control={ <Radio /> } />
                                                <FormControlLabel value={false} label="no" control={ <Radio /> } />
                                            </RadioGroup>
                                        </FormControl>
                                    </>
                                }
                            </Box>
                        :
                            <Box sx={{my: 2}} key={`textfield-container-${formFieldEntry.name}`}>
                                <TextField 
                                    key={`key-for-${formFieldEntry.name}-input`}
                                    id={`${formFieldEntry.name}-input`}
                                    name={ formFieldEntry.name }
                                    required={ formFieldEntry.required ?? false }
                                    value={ newFormState[formFieldEntry.name]?.value || "" } 
                                    variant="outlined" 
                                    label={ formFieldEntry.label } 
                                    type="text"
                                    fullWidth={ true }
                                    color="secondary"
                                    onChange={ handleInputChange }
                                    error={ Boolean(newFormState[formFieldEntry.name]?.error) }
                                    helperText={ newFormState[formFieldEntry.name]?.error || "" }
                                    { ...(formFieldEntry.name === "description" ? multilineExtraProp : null) }
                                    { ...(formFieldEntry.name === "beginDate" || formFieldEntry.name === "endDate" ? dateExtraProp : null) }
                                    { ...(formFieldEntry.name === "fundingGoal" ? fundingExtraProp : null) }
                                    />
                            </Box>
                    ))
                }
            </>
        )
    }


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
{/* THIS IS REPLACEMENT FOR ALL FIELDS DYNAMIC - delete map to replace with orig code */}
                                {
                                    steps.map((step, index) => (
                                        <Step key={`step-created-for-${index}`}>
                                            <StepButton color="inherit" onClick={ handleStep(index) }>{ step.label }</StepButton>
                                            <StepContent>
                                                <Typography>{ step.description }</Typography>
                                                <CreateFormFields props={{ index }} />
                                                <ForwardBack props={{ index }} />
                                            </StepContent>
                                        </Step>
                                    ))
                                }
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
                                        disabled={
                                            (activeStep !== steps.length && !Object.values(newFormState).some((field) => field.error))
                                        }
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
