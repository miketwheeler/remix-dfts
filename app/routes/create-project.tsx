import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
import React, { useState, useMemo } from "react";
import { json, redirect } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData, useLoaderData } from "@remix-run/react";
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Stepper, Step, StepContent, StepButton,
} from "@mui/material";
import { createProjectValidators } from "~/validators/validators";
import { CreateFormFields } from "~/components/reusable-components/minor/CreateFormFields";
import { ForwardBack } from "~/components/reusable-components/minor/ForwardBackStep";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";
import { createProject } from "~/utils/project.server";
import { getUsersTeamData } from "~/utils/display.server";



interface FormState {
    [key: string]: {
        value: string;
        error: string | null;
    }
}

// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	// const userId = await requireUserId(request);
    const usersTeams = await getUsersTeamData(request);

	return json(usersTeams);
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
    const active = form.get("active");
    const fundingGoal = form.get("fundingGoal");
    const team = form.get('team');

	const redirectTo = createProjectValidators.validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard/project");

	if (
		typeof name !== "string" ||
        typeof type !== "string" ||
        typeof synopsis !== "string" ||
		typeof description !== "string" ||
        typeof techStack !== "string" ||
        typeof beginDate !== "string" ||
        typeof endDate !== "string" ||
        typeof active !== "string" ||
        typeof fundingGoal !== "number" ||
        typeof team !== "string" ||
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
        team: team,
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
        team,
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
        mx: 2,
        my: 2,
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



export default function CreateProject() {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
    const [activeStep, setActiveStep] = useState(0); // TODO: change back to 0 when compl testing

    // const [assignTeam, setAssignTeam] = useState({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formIsValid, setFormIsValid] = useState(false);

    const [newFormState, setNewFormState] = useState<FormState>({});

    // Expandable Step Form Actions
    const handleStep = (step: number) => () => { setActiveStep(step) };

    const handleAllFieldsReset = () => { 
        setActiveStep(0);
        setNewFormState({}); // reset all field values' state
    };

    // const determineDisabled = (fieldValues: any[]) => {
    //     let returnValue = true;
    //     fieldValues.forEach((fieldName) => returnValue = !newFormState[fieldName] )

    //     return returnValue;
    // }

    // const ForwardBack = ({props}: any) => {
    //     const stepNames = steps[props.index].fieldNames;

    //     return (
    //         <Box sx={{ mb: 2 }}>
    //             <div>
    //                 {
    //                     props.index !== steps.length -1
    //                     ?
    //                     <Button 
    //                         variant="contained" 
    //                         disabled={ 
    //                             // Needs to be disabled by default (true), then checked for bool or error state of field to enable
    //                             determineDisabled(stepNames) ||
    //                             Object.values(newFormState)?.some((item) => 
    //                                 item.value === "active" 
    //                                 ? false 
    //                                 : item.value === "techStack"
    //                                 ? Boolean(item.value.split(',').length < 2)
    //                                 : item.error
    //                             ) 
    //                         } 
    //                         onClick={ handleNext } 
    //                         sx={{ mt: 1, mr: 1 }}
    //                         >
    //                         continue
    //                     </Button>
    //                     : null
    //                 }
    //                 {
    //                     props.index !== 0
    //                     ?
    //                     <Button onClick={ handleBack } sx={{ mt: 1, mr: 1 }}>
    //                         back
    //                     </Button>
    //                     : null
    //                 }
    //             </div>
    //         </Box>
    //     )
    // }

    // Form Field - specific actions

    // const handleFundingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewFormState((prevState) => ({
    //         ...prevState,
    //         [event.target.name]: { value: event.target.value, error: null },
    //     }));
    // };

    // const validateForm = () => {
    //     let errors: Record<string, string> = {};
    //     if(!newFormState.name) { 
    //         errors.name = "name is required";
    //     } else if(!createProjectValidators.validateProjectName(newFormState[name]?.value)) { 
    //         errors.name = "name is invalid";
    //     };
    //     if(!newFormState.type) {
    //         errors.type = "type is required";
    //     } else if(!createProjectValidators.validateProjectType(newFormState[type]?.value.length)) {
    //         errors.type = "type is invalid";
    //     };
    //     if(!newFormState.synopsis) {
    //         errors.synopsis = "synopsis is required";
    //     } else if(!createProjectValidators.validateProjectSynopsis(newFormState.synopsis)) {
    //         errors.synopsis = "synopsis is invalid";
    //     };
    //     if(!newFormState.description) {
    //         errors.description = "description is required";
    //     } else if(!createProjectValidators.validateProjectDescription(newFormState.description)) {
    //         errors.description = "description is invalid";
    //     };
    //     if(!newFormState.techStack) {
    //         errors.techStack = "tech stack is required";
    //     } else if(!createProjectValidators.validateProjectTechStack(newFormState.techStack)) {
    //         errors.techStack = "tech stack is invalid";
    //     };
    //     if(!newFormState.beginDate) {
    //         errors.beginDate = "begin date is required";
    //     } else if (!(newFormState.endDate.length >= 1 && newFormState.endDate.length < 10)) {
    //         errors.beginDate = "begin date is incomplete";
    //     }
    //     if(!newFormState.endDate) {
    //         errors.endDate = "end date is required";
    //     } else if (!(newFormState.endDate.length >= 1 && newFormState.endDate.length < 10)) {
    //         errors.endDate = "end date is incomplete";
    //     }
        // if(!formState.team) {
        //     errors.team = "team is required"
        // } else if(!createProjectValidators.validateProjectTeam(formState.team)) {
        //     errors.team = "team is invalid"
        // };

    //     setFormErrors(errors);
    //     setFormIsValid(Object.keys(errors).length === 0);

    //     return Object.keys(errors).length === 0;
    // }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // return validateForm();
        // TODO: fix the final form validation - should be on the submit action's server check (accept/deny form in all)
        return null;
    }

    useMemo(() => {
        console.log(`complete form state: ${JSON.stringify(newFormState, null, 2)}`)
    }, [newFormState])


	return (
        <Box sx={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                create a new project
            </Typography>
            <Typography variant="body1" gutterBottom>
                already have a project going? go to &nbsp;
                <Link
                    to={{
                        pathname: "/dashboard/project",
                        search: searchParams.toString(),
                    }}
                    style={{ textDecoration: 'none', color: 'purple'}}
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
                                {/* THIS IS REPLACEMENT FOR ALL FIELDS DYNAMICLY - delete map to replace with orig code */}
                                {
                                    steps.map((step, index) => (
                                        <Step key={`step-created-for-${index}`}>
                                            <StepButton color="inherit" onClick={ handleStep(index) }>{ step.label }</StepButton>
                                            <StepContent>
                                                <Typography>{ step.description }</Typography>
                                                { CreateFormFields({props: { index, newFormState, setNewFormState, loaderData }}) }
                                                <ForwardBack props={{ index, setActiveStep, steps, newFormState }} />
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
                                            handleAllFieldsReset();
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
