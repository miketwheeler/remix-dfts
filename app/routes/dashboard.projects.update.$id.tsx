import type { FC } from 'react';
import type {
    LoaderArgs, 
    ActionArgs
} from '@remix-run/node';
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from 'react';
import {
    Form,
    Link,
    useActionData,
    // Link,
    useLoaderData,
    useSearchParams,
    // useParams,
} from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { 
    Box, Typography, Paper,  
    Button, Stack, Divider, Grid,
    useMediaQuery,
    // Collapse,
    Breadcrumbs,
    Link as MuiLink,
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { projectValidators } from '~/validators/validators';

// import { db } from "~/utils/db.server";
import { getProject, updateProject } from "~/utils/project.server";
import invariant from "tiny-invariant";
import MultiselectPicker from '~/components/reusable-components/minor/MultislectPicker';
import qs from "qs";
import { badRequest } from '~/utils/request.server';

import { convertToISOString, convertToDisplayDate } from '~/components/functions/convert-dates';



interface FormSubmissionProps {
    onSubmit: (formData: FormData) => Promise<void>;
}

type FormFields = {
    name: string,
    type: string,
    description: string,
    synopsis: string,
    techStack: string,
    beginDate: string,
    endDate: string,
    milestone: number,
    deployed: boolean,
    funded: boolean,
    fundingGoal: string,
    active: boolean,
    // category: string[],  ** this is assigned into the category table by project id (I think) -- so ref to the table can be made/searched for filter **
    // team -> this is assigned from the proj owner to the team table & is lead member -> should display static as only logged in lead can update
}

export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.id, "no id provided yet");
    
    const project = await getProject(params.id);
    if(!project) { 
        throw new Response(`no id provided for ${params.id}`, {status: 404})
    }

    return json({ project });
}

export const action = async ({ request, params }: ActionArgs) => {
    invariant(params.id, "no id provided yet");
    
    const body = await request.text();
    const formData = qs.parse(body);

    // console.log("formData", formData);

    const projectId = params.id;

    const name = formData.name as string;
    const type = formData.type as string;
    const description = formData.description as string;
    const synopsis = formData.synopsis as string;
    const techStack = formData.techStack as string;
    const beginDate = formData.beginDate && convertToISOString(formData.beginDate as string);
    const endDate = formData.endDate && convertToISOString(formData.endDate as string);
    const milestone = formData.milestone as string;
    const deployed = formData.deployed === "true" ? true : false;
    const funded = formData.funded === "true" ? true : false;
    const fundingGoal = formData.fundingGoal as string;
    const active = formData.active === "true" ? true : false;

    if(typeof name !== "string" || typeof type !== "string" || typeof synopsis !== "string" || typeof description !== "string" || typeof beginDate !== "string" || typeof endDate !== "string") 
    {
        return badRequest({
            formError: "Something went wrong updating your project's information, please try again."
        });
    }

    const fields = {
        name,
        type,
        description,
        synopsis,
        techStack,
        beginDate,
        endDate,
        milestone,
        deployed,
        funded,
        fundingGoal,
        active,
    }

    const fieldErrors = {
        name: projectValidators.validateProjectName(name),
        type: projectValidators.validateProjectType(type),
        description: projectValidators.validateProjectDescription(description),
        synopsis: projectValidators.validateProjectSynopsis(synopsis),
        // techStack: projectValidators.validateProjectTechStack(techStack),
        fundingGoal: projectValidators.validateProjectFundingGoal(Number(fundingGoal)),
    }

    if(Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null
        });
    } 

    const updatedProject = await updateProject({
        id: projectId,
        name,
        type,
        synopsis,
        description,
        techStack,
        beginDate,
        endDate,
        milestone: Number(milestone),
        deployed,
        funded,
        fundingGoal: Number(fundingGoal.slice(1)), // updateProject expects numerical value and we're slicing off the $ sign
        active,
    });

    if(!updatedProject) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Something went wrong creating your new project.`,
        });
    }

    return redirect(`/dashboard/projects/view/${params.id}` );

}


const styles = {
	container: {
		flexGrow: 1,
		padding: "1.5rem",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};

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


const UpdateProject: FC<FormSubmissionProps> = () => {
    const { project } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const smAndDown = useMediaQuery('(max-width: 800px)');
    const [formFieldsToUpdate, setFormFieldsToUpdate] = useState<FormFields>({
        name: project.name,
        type: project.type,
        description: project.description,
        synopsis: project.synopsis,
        techStack: project.techStack || "",
        beginDate: project.beginDate ? convertToDisplayDate(project.beginDate) : "",
        endDate: project.endDate ? convertToDisplayDate(project.endDate) : "",
        milestone: project.milestone,
        deployed: project.deployed,
        funded: project.funded,
        fundingGoal: project.fundingGoal,
        active: project.active,
    });
    // const [newFormFields, setNewFormFields] = useState<FormFields>();

    const [searchParams] = useSearchParams();
    // console.log("searchParams", searchParams)

    // const [formFieldsToUpdate, setFormFieldsToUpdate] = useState<FormFields>({});
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | null;
        let formattedValue;
    
        if(name === "beginDate" || name === "endDate") {
            formattedValue = validateDate(value);
        }

        error = validateField(name, formattedValue !== undefined ? formattedValue : value);

        setFormFieldsToUpdate({ ...formFieldsToUpdate, [name]: { value: formattedValue ?? value, error } });
    };

    // const handleSubmit = async () => {
    //     event.preventDefault();
    //     // Object.entries(formFieldsToUpdate).forEach((fieldItem) => {
    //     //     if(fieldItem.error === null || !fieldItem.error) {
    //     //         event.preventDefault();
    //     //         return;
    //     //     }
    //     // });
    //     console.log(Object.keys(formFieldsToUpdate));
    //     return console.log("form submit button selected");
    // };

    useEffect(() => {
        console.log(JSON.stringify(formFieldsToUpdate, null, 2));
    }, [formFieldsToUpdate]);



    return (
        <Box sx={styles.container}>
            <Typography variant="h5" component="h1" gutterBottom>
                update project
            </Typography>
            <Breadcrumbs aria-label="projects breadcrumbs"sx={{ pl: 1}}>
                <MuiLink underline="hover" color="inherit" component={Link} to={'dashboard/projects'} sx={{'&:hover': {color: 'primary.main'}}}>projects</MuiLink>
                <MuiLink underline="hover" color="inherit" component={Link} to={`../view/${project.id}`} sx={{'&:hover': {color: 'primary.main'}}}>view</MuiLink>
                <Typography color="text.primary">update</Typography>
            </Breadcrumbs>            
            <br />
            {
                !project
                ?
                <Typography variant="body1" component="p" gutterBottom sx={{ m: 2 }}>
                    Oops, there was nothing found here for some reason. <Link to={'..'} >go back</Link>
                </Typography>
                :
                <Paper key={`project-${project.name}`} sx={{ minWidth: 334 }}>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" gutterBottom>
                                                { project.name }
                                            </Typography>
                                        </Box>
                                        <Box sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                gap: 1, 
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                maxWidth: 'fit-content',
                                                maxHeight: 'fit-content',
                                            }}
                                            >
                                            {
                                                !smAndDown
                                                ?
                                                <>
                                                <Button 
                                                    variant="text" 
                                                    size="small" 
                                                    color="primary" 
                                                    component={ Link } 
                                                    to={`../view/${project.id}`} 
                                                    startIcon={<ArrowBackIcon />}
                                                    sx={{mr: 1}}
                                                    >
                                                    back
                                                </Button>
                                                </>
                                                :
                                                <Link to={`../view/${project.id}`}>
                                                    <ArrowBackIcon color="primary" />
                                                </Link>
                                            }
                                        </Box>
                                    </Box>
                                    <Divider sx={{my: 1}} />

                                    <Typography variant="body1" component="p" gutterBottom sx={{p: 2, opacity: .5}}>
                                        edit your project information here. you should be sure of your edits as all members associated with your project will be notified and updated with your changes.
                                        <br />
                                        *note: navigating away will not save any changes made
                                    </Typography>

                                    <Box sx={{ p: 2 }}>
                                        <Form method="post">
                                            <Stack spacing={2}>
                                                <TextField 
                                                    type="text" 
                                                    id="project-name" 
                                                    label="name" 
                                                    name="name" 
                                                    defaultValue={ formFieldsToUpdate.name } 
                                                    onChange={ handleInputChange } 
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="project-type" 
                                                    label="type" 
                                                    name="type" 
                                                    defaultValue={ formFieldsToUpdate.type } 
                                                    onChange={ handleInputChange }
                                                    />

                                                <Divider sx={{my: 1}} />

                                                <TextField 
                                                    type="text" 
                                                    id="project-synopsis" 
                                                    label="synopsis" 
                                                    name="synopsis"
                                                    defaultValue={ formFieldsToUpdate.synopsis } 
                                                    onChange={ handleInputChange } 
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="project-description" 
                                                    label="description" 
                                                    name="description"
                                                    defaultValue={ formFieldsToUpdate.description } 
                                                    multiline 
                                                    rows={3} 
                                                    onChange={ handleInputChange }
                                                    />

                                                <Divider sx={{my: 1}} />

                                                <TextField 
                                                    type="text" 
                                                    id="project-beginDate" 
                                                    label="begin date" 
                                                    name="beginDate"
                                                    defaultValue={ formFieldsToUpdate.beginDate } 
                                                    onChange={ handleInputChange } 
                                                    InputLabelProps={{ shrink: true }} 
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="project-endDate" 
                                                    label="end date" 
                                                    name="endDate" 
                                                    defaultValue={ formFieldsToUpdate.endDate } 
                                                    onChange={ handleInputChange }
                                                    InputLabelProps={{ shrink: true }}  
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="project-milestone" 
                                                    label="milestone" 
                                                    name="milestone" 
                                                    defaultValue={ formFieldsToUpdate.milestone } 
                                                    onChange={ handleInputChange } 
                                                    />

                                                <Divider sx={{ my: 1 }} />

                                                {/* TODO: tech stack selector */}
                                                <Typography variant="body1" component="p" gutterBottom sx={{p: 2, opacity: .5}}>
                                                    placeholder for tech stack selector
                                                </Typography>

                                                {/* <MultiselectPicker props={{ newFormState: formFieldsToUpdate, setNewFormState: setFormFieldsToUpdate }} /> */}

                                                <Divider sx={{ my: 1 }} />

                                                <FormControl>
                                                    <FormLabel id="project-deployed-option">is project currently deployed?</FormLabel>
                                                    <RadioGroup
                                                        aria-label="deployed-selection"
                                                        defaultValue={ formFieldsToUpdate.deployed }
                                                        name="deployed"
                                                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                                                        >
                                                        <FormControlLabel value={ true } control={ <Radio /> } label="yes" labelPlacement='start' />
                                                        <div style={{ width: '1.25rem' }}></div>
                                                        <FormControlLabel value={ false } control={ <Radio /> } label="no" labelPlacement='start' />
                                                    </RadioGroup>
                                                </FormControl>

                                                <Divider sx={{ my: 1 }} />

                                                <FormControl>
                                                    <FormLabel id="project-funded-option">is project currently being funded?</FormLabel>
                                                    <RadioGroup
                                                        aria-label="funded-selection"
                                                        defaultValue={ formFieldsToUpdate.funded }
                                                        name="funded"
                                                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                                                        >
                                                        <FormControlLabel value={ true } control={ <Radio /> } label="yes" labelPlacement='start' />
                                                        <div style={{ width: '1.25rem' }}></div>
                                                        <FormControlLabel value={ false } control={ <Radio /> } label="no" labelPlacement='start' />
                                                    </RadioGroup>
                                                </FormControl>
                                                <NumericFormat  
                                                    type="text" 
                                                    id="project-fundingGoal" 
                                                    label="funding goal" 
                                                    name="fundingGoal" 
                                                    customInput={TextField}
                                                    prefix={'$'}
                                                    defaultValue={ formFieldsToUpdate.fundingGoal } 
                                                    onChange={ handleInputChange } 
                                                    />

                                                <Divider sx={{ my: 1 }} />

                                                <FormControl>
                                                    <FormLabel id="edit-project-funded-option">keep project active? (deactivating removes project access for everyone but you)</FormLabel>
                                                    <RadioGroup
                                                        aria-label="funded-selection"
                                                        defaultValue={ formFieldsToUpdate.active }
                                                        name="funded"
                                                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                                                        >
                                                        <FormControlLabel value={ true } control={ <Radio /> } label="keep active" labelPlacement='start' />
                                                        <div style={{ width: '1.25rem' }}></div>
                                                        <FormControlLabel value={ false } control={ <Radio /> } label="deactivate" labelPlacement='start' />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Stack>

                                            <Box sx={{ display: 'flex',  justifyContent: 'flex-end', mt: 4 }}>
                                                <Button 
                                                    type="submit" 
                                                    variant="contained" 
                                                    color="primary" 
                                                    // onSubmit={ ()=> handleFormSubmit() }
                                                    >
                                                    save updates
                                                </Button>
                                            </Box>
                                        </Form>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            }
        </Box>
    )
}
export default UpdateProject;