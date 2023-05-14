import type {
    LoaderArgs
} from '@remix-run/node';
import { useState } from 'react';
import {
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { db } from "~/utils/db.server";
import { getProject } from "~/utils/project.server";
import invariant from "tiny-invariant";


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
		// borderRadius: "4px",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};


export default function DashboardViewProjectIdRoute() {
    const { project } = useLoaderData<typeof loader>();
    const smAndDown = useMediaQuery('(max-width: 800px)');

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" component="h1" gutterBottom>
                deleting project
            </Typography>
            <Breadcrumbs aria-label="projects breadcrumbs"sx={{ pl: 1}}>
                <MuiLink underline="hover" color="inherit" component={Link} to={'..'} sx={{'&:hover': {color: 'primary.main'}}}>projects</MuiLink>
                <Typography color="text.primary">delete</Typography>
            </Breadcrumbs>
            {/* <Typography variant="h5" component="h1" gutterBottom>
                viewing project: {project.name}
            </Typography> */}
            {/* <Button 
                component={Link} 
                to={'..'} 
                variant="text" 
                sx={{ marginBottom: '1rem'}}
                startIcon={<ArrowBackIcon />}
                >
                    back to projects
            </Button>
            <Typography variant="h5" component="h1" gutterBottom>
                DELETE project: {project.name}
            </Typography> */}
            
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
                                                    <Button variant="contained" size="small" color="success" component={ Link } to={ `../view/${project.id}` }>
                                                        view
                                                    </Button>
                                                    <Button variant="contained" size="small" color="warning" component={ Link } to={ `../update/${project.id}` }>
                                                        update
                                                    </Button>
                                                </>
                                                :
                                                <>
                                                    <Link to={ `../view/${project.id}` }>
                                                        <VisibilityIcon color="success" />
                                                    </Link>
                                                    <Link to={ `../update/${project.id}` }>
                                                        <EditIcon color="warning" />
                                                    </Link>
                                                </>
                                            }
                                        </Box>
                                    </Box>
                                    <Divider sx={{my: 1}} />

                                    <Typography variant="body1">
                                        type: &nbsp; {project.type} 
                                        <br /> 
                                        synopsis: &nbsp; {project.synopsis} 
                                        <br/> 
                                        dates: &nbsp; {project.beginDate} to {project.endDate}
                                    </Typography>

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

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            }
        </Box>
    )
}