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
    Link as MuiLink
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { db } from "~/utils/db.server";
import { getProject } from "~/utils/project.server";
import invariant from "tiny-invariant";


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


export default function DashboardViewProjectIdRoute() {
    const { project } = useLoaderData<typeof loader>();
    const smAndDown = useMediaQuery('(max-width: 800px)');
    const formFieldsToUpdate = useState<FormFields>({
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
                                                project - {project.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{my: 1}} />

                                    {/* TODO: UPDATE FORM - on form submit (check updatedAt is updated) */}
                                    <Form method="post">
                                        <Stack spacing={1}>
                                            <input type="text" name={`field-${project.name}`} value={project.name} />
                                            <input type="text" name={`field-${project.type}`} value={project.type} />
                                            <input type="text" name={`field-${project.synopsis}`} value={project.synopsis} />
                                            <input type="text" name={`field-${project.description}`} value={project.description} />
                                            <input type="text" name={`field-${project.beginDate}`} value={`${project.beginDate}`} />
                                            <input type="text" name={`field-${project.endDate}`} value={`${project.endDate}`} />
                                            <input type="text" name={`field-${project.milestone}`} value={project.milestone} />
                                            <input type="text" name={`field-${project.name}`} value={project.name} />
                                            <input type="text" name={`field-${project.name}`} value={project.name} />

                                        </Stack>
                                        
                                    </Form>

                                    <Divider sx={{my: 1}} />
                                    <Typography variant="body1">tech stack:&nbsp;</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
                                        <br/>
                                        {
                                            project.techStack
                                            ? 
                                            project.techStack.split(",").map((tech: string, index: number) => (
                                                <Chip key={`tech-${index}`} label={tech} />
                                            ))
                                            :
                                            <Typography variant="body1" component="p" gutterBottom sx={{ m: 2 }}>
                                                There should be a stack here, but there isn't. Edit this project to add one!
                                            </Typography>
                                        }
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