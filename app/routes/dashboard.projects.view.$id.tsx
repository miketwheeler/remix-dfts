import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { useEffect, useState } from 'react';
import {
    Link,
    useLoaderData,
    useActionData,
    Form,
    Outlet,
    useTransition
    // useParams,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { 
    Box, Typography, Paper, Button, Chip, Divider, Grid,
    useMediaQuery, Breadcrumbs, Link as MuiLink, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditProjectDialog from '~/components/dialogs/EditProjectDialog';

import { getProject, deleteProject, updateProject, getProjectListWhereTeamLead } from "~/utils/project.server";
// import { getUserId } from "~/utils/session.server";
import invariant from "tiny-invariant";



// LOADER
export const loader = async ({ params, request }: LoaderArgs) => {
    invariant(params.id, "no id provided yet");
    
    const associatedProjects = await getProjectListWhereTeamLead(request)
    const isProjectOwner = associatedProjects.filter((project: any) => project.id === params.id) !== null;
    const project = await getProject(params.id);

    if(!project) throw new Response(`no id provided for ${params.id}`, { status: 404 })

    return json({ isOwner: isProjectOwner, project });
}

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
    invariant(params.id, "no id provided yet");
    const form = await request.formData();

    if(form.get("_action") === "delete") {
        return await deleteProject(params.id.toString());
    }
    else if(form.get("_action") === "update") {
        const project = await updateProject(request);
        return json({ project });
    }
    else {
        throw new Response(`no action provided for ${params.id}`, {status: 404})
    }
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
    const { project, isOwner } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const smAndDown = useMediaQuery('(max-width: 800px)');
    const [modalOpen, setModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({} as any);
    // let transition = useTransition();

    // let actionIsDeleting = transition.state === "submitting" && transition.submission.method === "DELETE";

    // modal ops
    // const handleClose = () => setModalOpen(false);
    const handleClickOpen = async () => {
        setModalOpen(true)
        // return (<EditProjectDialog props={{ modalOpen, setModalOpen, project}} />)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const areYouSure = await window.confirm("Are you sure you want to permanently delete this record?");

        if(areYouSure) {
            setIsDeleting(true);
            
            if(actionData) setIsDeleting(false);
        }
    }

    useEffect(() => {
        // if(actionIsDeleting) {
        //     setIsDeleting(true);
        // }
        console.log(isOwner.toString());
    }, [isOwner])

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" component="h1" gutterBottom>
                viewing project
            </Typography>
            
            <Breadcrumbs aria-label="projects breadcrumbs"sx={{ pl: 1}}>
                <MuiLink underline="hover" color="inherit" component={Link} to={'..'} sx={ {'&:hover': { color: 'primary.main' }} }>projects</MuiLink>
                <Typography color="text.primary">view</Typography>
            </Breadcrumbs>
            <br />
            {
                isDeleting && <EditProjectDialog props={{ modalOpen, setModalOpen, project}} />
            }
            
            {
                !project
                ?
                <Typography variant="body1" component="p" gutterBottom sx={{ m: 2 }}>
                    Oops, there was nothing found here for some reason. <Link to={'..'} >go back</Link>
                </Typography>
                :
                <Paper key={`project-${project.name}`} sx={{ minWidth: 334 }}>
                    {
                        modalOpen && <Outlet context={{ modalOpen, setModalOpen, project }} />
                    }
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="h6" gutterBottom>
                                                project name: {project.name}
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
                                                    {/* <Form method="post"> */}
                                                        <Button variant="contained" size="small" color="warning" component={ Link } to={ `../update/${project.id}` }>
                                                            update
                                                        </Button>
                                                    {/* </Form> */}
                                                    <Form method="post">
                                                        {/* <input type="hidden" name="id" value={project.id} /> */}
                                                        <Button 
                                                            variant="contained" size="small" color="error" 
                                                            // onSubmit={handleSubmit}
                                                            name="_action" 
                                                            value="delete" 
                                                            disabled={!isOwner}
                                                            >
                                                            delete
                                                        </Button>
                                                    </Form>
                                                </>
                                                :
                                                <>
                                                    <Link to={ `../update/${project.id}` }>
                                                        <EditIcon color="warning" />
                                                    </Link>
                                                    <Link to={ `../delete/${project.id}` }>
                                                        <DeleteForeverIcon color="error" />
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