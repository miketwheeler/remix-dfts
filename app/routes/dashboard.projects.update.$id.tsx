import type {
    LoaderArgs
} from '@remix-run/node';
import { useState } from 'react';
import {
    Form,
    Link,
    // Link,
    useLoaderData,
    // useParams,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { 
    Box, Typography, Paper,  
    Button, Stack, Chip, Divider, Grid,
    useMediaQuery,
    Collapse,
    Breadcrumbs,
    Link as MuiLink,
    TextField,
    FormControlLabel,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { db } from "~/utils/db.server";
import { getProject } from "~/utils/project.server";
import invariant from "tiny-invariant";
import MultiselectPicker from '~/components/reusable-components/minor/MultislectPicker';


type FormFields = {
    name: string,
    type: string,
    description: string,
    synopsis: string,
    techStack: string[] | null,
    beginDate: string,
    endDate: string,
    active: boolean,
    milestone: number,
    deployed: boolean,
    funded: boolean,
    fundingGoal: number,
    fundingCurrent: number,
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


export default function DashboardViewProjectIdRoute() {
    const { project } = useLoaderData<typeof loader>();
    const smAndDown = useMediaQuery('(max-width: 800px)');
    const [formFieldsToUpdate, setFormFieldsToUpdate] = useState<FormFields>({
        name: project.name,
        type: project.type,
        description: project.description,
        synopsis: project.synopsis,
        techStack: project.techStack?.split(",") || [],
        beginDate: project.beginDate || "",
        endDate: project.endDate || "",
        active: project.active,
        milestone: project.milestone,
        deployed: project.deployed,
        funded: project.funded,
        fundingGoal: Number(project.fundingGoal),
        fundingCurrent: Number(project.fundingCurrent),
    });
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

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" component="h1" gutterBottom>
                updating project - {project.name}
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
                                                editing project - {project.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{my: 1}} />

                                    <Typography variant="body1" component="p" gutterBottom sx={{p: 2, opacity: .5}}>
                                        edit your project information here. you should be sure of your edits as all members associated with your project will be notified and had your changes applied.
                                        <br />
                                        *note: navigating away will not save any changes made
                                    </Typography>

                                    {/* TODO: UPDATE FORM - on form submit (check updatedAt is updated) */}
                                    <Box sx={{ p: 2 }}>
                                        <Form method="post">
                                            <Stack spacing={2}>
                                                <TextField 
                                                    type="text" 
                                                    id="project name" 
                                                    label="name" 
                                                    name={`field-${formFieldsToUpdate.name}`} 
                                                    defaultValue={formFieldsToUpdate.name} 
                                                    onChange={ handleInputChange } 
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="type" 
                                                    label="type" 
                                                    name={`field-${formFieldsToUpdate.type}`} 
                                                    defaultValue={formFieldsToUpdate.type} 
                                                    onChange={ handleInputChange }
                                                    />
                                                <Divider sx={{my: 1}} />
                                                <TextField 
                                                    type="text" 
                                                    id="synopsis" 
                                                    label="synopsis" 
                                                    name={`field-${formFieldsToUpdate.synopsis}`} 
                                                    defaultValue={formFieldsToUpdate.synopsis} 
                                                    onChange={ handleInputChange } 
                                                    />
                                                <TextField 
                                                    type="text" 
                                                    id="description" 
                                                    label="description" 
                                                    name={`field-${formFieldsToUpdate.description}`} 
                                                    defaultValue={formFieldsToUpdate.description} 
                                                    multiline 
                                                    rows={3} 
                                                    onChange={ handleInputChange }
                                                    />
                                                <Divider sx={{my: 1}} />
                                                <TextField 
                                                    type="date" 
                                                    id="beginDate" 
                                                    label="begin date" 
                                                    name={`field-${formFieldsToUpdate.beginDate}`} 
                                                    defaultValue={`${formFieldsToUpdate.beginDate}`} 
                                                    onChange={ handleInputChange } 
                                                    InputLabelProps={{ shrink: true }} 
                                                    />
                                                <TextField 
                                                    type="date" 
                                                    id="endDate" 
                                                    label="end date" 
                                                    name={`field-${formFieldsToUpdate.endDate}`} 
                                                    defaultValue={`${formFieldsToUpdate.endDate}`} 
                                                    onChange={ handleInputChange }
                                                    InputLabelProps={{ shrink: true }}  
                                                    />
                                                <TextField 
                                                    type="number" 
                                                    id="milestone" 
                                                    label="milestone" 
                                                    name={`field-${formFieldsToUpdate.milestone}`} 
                                                    defaultValue={formFieldsToUpdate.milestone} 
                                                    onChange={ handleInputChange } 
                                                    />
                                                <Divider sx={{my: 1}} />
                                                {/* <MultiselectPicker props={{ formFieldsToUpdate, setFormFieldsToUpdate }} /> */}
                                            </Stack>
                                        </Form>
                                    </Box>

                                    <Box 
                                        sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'flex-end' 
                                        }}
                                        >
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            >
                                                save
                                        </Button>
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