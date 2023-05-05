import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
import type { FC } from 'react';
import React, { useState, useMemo, useEffect } from "react";
import { json, redirect } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData, useLoaderData, useSubmit} from "@remix-run/react";
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
import qs from "qs";


interface FormState {
    [key: string]: {
        value: string;
        error: string | null;
    }
}

interface FormSubmissionProps {
    onSubmit: (formData: FormData) => Promise<void>;
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
    // const form = await request.json();
    // const formState = JSON.parse(form.get("formState") as string);

    // TODO: was last set - testing above
    const body = await request.text();
    const formState = qs.parse(body);

    // const name = form.get("name");
    // const type = form.get("type");
    // const synopsis = form.get("synopsis");
    // const description = form.get("description");
    // const techStack = form.get("techStack");
    // const beginDate = form.get("beginDate");
    // const endDate = form.get("endDate");
    // const active = form.get("active");
    // const fundingGoal = form.get("fundingGoal");
    // const team = form.get('team');

    // const name = formState.name.value.toString();
    // const type = formState.type.value.toString();
    // const synopsis = formState.synopsis.value.toString();
    // const description = formState.description.value.toString();
    // const techStack = formState.techStack.value.toString();
    // const beginDate = formState.beginDate.value.toString();
    // const endDate = formState.endDate.value.toString();
    // const active = formState.active.value.toString();
    // const fundingGoal = formState.fundingGoal.value;
    // const team = formState.team.value.toString();

    const name = formState?.name;
    const type = formState?.type;
    const synopsis = formState?.synopsis;
    const description = formState?.description;
    const techStack = formState?.techStack;
    const beginDate = formState?.beginDate;
    const endDate = formState?.endDate;
    const active = formState?.active;
    const fundingGoal = formState?.fundingGoal;
    const team = formState?.team;

	// const redirectTo = createProjectValidators.validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard");

    if (
		typeof name !== "string" ||
        typeof type !== "string" ||
        typeof synopsis !== "string" ||
		typeof description !== "string" ||
        typeof techStack !== "string" ||
        typeof beginDate !== "string" ||
        typeof endDate !== "string" ||
        typeof active !== "string" ||
        typeof fundingGoal !== "string" ||
        typeof team !== "string" 
		// typeof redirectTo !== "string" 
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Something went wrong when submitting the form. Please try again.",
		});
	}

    const fields = { 
        name, 
        type, 
        synopsis, 
        description,
        techStack, 
        beginDate, 
        endDate, 
        active, 
        fundingGoal,
        team
    };
	const fieldErrors = {
        name: createProjectValidators.validateProjectName(name),
        type: createProjectValidators.validateProjectType(type),
        synopsis: createProjectValidators.validateProjectSynopsis(synopsis),
        description: createProjectValidators.validateProjectDescription(description),
        techStack: createProjectValidators.validateProjectTechStack(techStack),
        fundingGoal: createProjectValidators.validateProjectFundingGoal(Number(fundingGoal)),
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
    // create the project
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
        teamId: team,
    });

    if(!project) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Something went wrong creating your new project.`,
        });
    }

    return redirect("/dashboard/projects");
};

// export const action = async ({ request }: ActionArgs) => {
//     const form = await request.formData();
//     // const formStateVar = form.get("formState");

//     const name = form.get("name");
//     const type = form.get("type");
//     const synopsis = form.get("synopsis");
//     const description = form.get("description");
//     const techStack = form.get("techStack");
//     const beginDate = form.get("beginDate");
//     const endDate = form.get("endDate");
//     const active = form.get("active");
//     const fundingGoal = form.get("fundingGoal");
//     const team = form.get('team');
//     // const name = newFormState.name.value;

// 	const redirectTo = createProjectValidators.validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard/project");

// 	if (
// 		typeof name !== "string" ||
//         typeof type !== "string" ||
//         typeof synopsis !== "string" ||
// 		typeof description !== "string" ||
//         typeof techStack !== "string" ||
//         typeof beginDate !== "string" ||
//         typeof endDate !== "string" ||
//         typeof active !== "string" ||
//         typeof fundingGoal !== "number" ||
//         typeof team !== "string" ||
// 		typeof redirectTo !== "string" 
// 	) {
// 		return badRequest({
// 			fieldErrors: null,
// 			fields: null,
// 			formError: "Something went wrong when submitting the form. Please try again.",
// 		});
// 	}

// 	const fields = { 
//         name: name, 
//         type: type, 
//         synopsis: synopsis, 
//         description: description,
//         techStack: techStack, 
//         beginDate: beginDate, 
//         endDate: endDate, 
//         active: active, 
//         fundingGoal: fundingGoal, 
//         team: team,
//     };
// 	const fieldErrors = {
//         name: createProjectValidators.validateProjectName(name),
//         type: createProjectValidators.validateProjectType(type),
//         synopsis: createProjectValidators.validateProjectSynopsis(synopsis),
//         description: createProjectValidators.validateProjectDescription(description),
//         techStack: createProjectValidators.validateProjectTechStack(techStack),
//         beginDate: createProjectValidators.validateDate(beginDate),
//         endDate: createProjectValidators.validateDate(endDate),
//         fundingGoal: createProjectValidators.validateProjectFundingGoal(fundingGoal),
//         // projectTeam: validateProjectTeam(projectTeam),
// 	};
// 	if(Object.values(fieldErrors).some(Boolean)) {
// 		return badRequest({
// 			fieldErrors,
// 			fields,
// 			formError: null,
// 		});
// 	}
//     const projectExists = await db.project.findFirst({
//         where: { name },
//     });
//     if(projectExists) {
//         return badRequest({
//             fieldErrors: null,
//             fields,
//             formError: `Project with the name ${name} already exists`,
//         });
//     }
//     // create the project && create their session and redirect to /dashboard
//     const project = await createProject({ 
//         name,
//         type,
//         synopsis,
//         description,
//         techStack,
//         beginDate,
//         endDate,
//         active,
//         fundingGoal,
//         teamId: team,
//     });
//     if(!project) {
//         return badRequest({
//             fieldErrors: null,
//             fields,
//             formError: `Something went wrong creating your new project.`,
//         });
//     }

//     return redirect("/dashboard/project");
// };

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



const CreateProject: FC<FormSubmissionProps> = () => {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
    const [activeStep, setActiveStep] = useState(0); // TODO: change back to 0 when compl testing

    // const submit = useSubmit();

    // const [assignTeam, setAssignTeam] = useState({});
    // const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    // const [formIsValid, setFormIsValid] = useState(false);

    const [newFormState, setNewFormState] = useState<FormState>({});

    // Expandable Step Form Actions
    const handleStep = (step: number) => () => { setActiveStep(step) };

    const handleAllFieldsReset = () => { 
        setActiveStep(0);
        setNewFormState({}); // reset all field values' state
    };

    const checkFormIsDisabled = () => {
        return !((Object.keys(newFormState).includes("team") && newFormState["team"].value !== "")
                && Object.values(newFormState).some((field) => field.error === null))
    }

    // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     // event.preventDefault();
    //     setFormIsValid(checkFormIsDisabled)

    //     let formData = new FormData();

    //     for (const [key, value] of Object.entries(newFormState)) {
    //         formData.append(key, value.value)
    //     }

    //     // Object.entries(newFormState).forEach(([key, value]) => {
    //     //     formData.append(key, value.value)
    //     // });
    //     console.log(`form data: ${JSON.stringify(Object.fromEntries(formData), null, 2)}`)

    //     onSubmit(formData);
    // }

    // useMemo(() => {
    //     console.log(`complete form state: ${JSON.stringify(newFormState, null, 2)}`)
    //     // console.dir(`hidden form state var: ${document.getElementById("hidden-form-state")}`)
    // }, [newFormState])

    useEffect(() => {
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
                        pathname: "/dashboard/projects",
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
                    <Form 
                        method="post" 
                        // onSubmit={ handleFormSubmit }
                        >
                        <input
                            type="hidden"
                            name="redirectTo"
                            value={ searchParams.get("redirectTo") ?? undefined }
                            />
                        {/* <input 
                            type="hidden" 
                            name="formState" 
                            value={ JSON.stringify(newFormState) } 
                            /> */}
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {/* THIS IS REPLACEMENT FOR ALL FIELDS DYNAMICLY - delete map to replace with orig code */}
                            {
                                steps.map((step, index) => (
                                    <Step key={`form-section-step-${index}`}>
                                        <StepButton color="inherit" onClick={ handleStep(index) }>{ step.label }</StepButton>
                                        <StepContent TransitionProps={{ unmountOnExit: false }} >
                                            <Typography>{ step.description }</Typography>
                                            { 
                                                CreateFormFields({ 
                                                    props: { 
                                                        index, newFormState, setNewFormState, loaderData 
                                                    }
                                                }) 
                                            }
                                            <ForwardBack props={{ index, setActiveStep, steps, newFormState }} />
                                        </StepContent>
                                    </Step>
                                ))
                            }
                        </Stepper>
                        <Box flexGrow={1} sx={{ display: 'flex-row', py: 2 }}>
                            <Button 
                                className="button" 
                                sx={{ mt: 1 }}
                                onClick={(e) => {
                                    // e.preventDefault();
                                    handleAllFieldsReset();
                                }}
                                >
                                cancel all
                            </Button>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                className="button" 
                                sx={{ mt: 1, ml: 2 }}
                                disabled={ activeStep !== (steps.length -1) ? true : checkFormIsDisabled() }
                                >
                                create new project
                            </Button>
                            {/* <Box sx={{ display: actionData?.fieldErrors ? "flex" : "none"}}>
                                <Typography variant="body2" sx={{mt: 1, ml: 2, display: 'inline-flex', wrap: 'nowrap'}}>
                                    { actionData?.fieldErrors ? Object.entries(actionData.fieldErrors).map(([key, value]) => {
                                        return <div key={key}>{key}: {value} error on the page! Please fix, then resubmit.</div>
                                    }) : null}
                                </Typography>
                            </Box> */}
                        </Box>
                    </Form> 
                </div>
            </Paper>
        </Box>
	);
}

export default CreateProject;