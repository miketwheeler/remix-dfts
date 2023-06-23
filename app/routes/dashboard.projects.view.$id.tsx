import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { useEffect, useState } from 'react';
import {
    Link,
    useLoaderData,
    useActionData,
    Form,
    Outlet,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { 
    Box, Typography, Paper, Button, Divider, Grid,
    useMediaQuery, Breadcrumbs, Link as MuiLink,
    Table, TableBody, TableCell, TableContainer, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteInterruptDialog from '~/components/dialogs/DeleteInterruptDialog';
import { convertAttribute, convertHeader } from '~/components/functions/display-data';

import { getProject, deleteProject, getProjectListWhereTeamLead } from "~/utils/project.server";
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

    // if(form.get("_action") === "delete") {
    if(form.get("_action") === "delete") {
        return await deleteProject(params.id);
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

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
    };
    const handleDelete = async () => {
        await actionData;
        setShowConfirmation(false);
    };

    // useEffect(() => {
    //     console.log(`isOwner value: ${isOwner.toString()}`);
    // }, [isOwner])

    return (
        <Box sx={styles.container}>
            <DeleteInterruptDialog props={{showConfirmation, setShowConfirmation, handleDelete}} />

            <Typography variant="h5" component="h1" gutterBottom>
                viewing project
            </Typography>
            
            <Breadcrumbs aria-label="projects breadcrumbs"sx={{ pl: 1}}>
                <MuiLink underline="hover" color="inherit" component={Link} to={'..'} sx={ {'&:hover': { color: 'primary.main' }} }>projects</MuiLink>
                <Typography color="text.primary">view</Typography>
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
                                                {project.name}
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
                                                        to={".."} 
                                                        startIcon={<ArrowBackIcon />}
                                                        sx={{mr: 1}}
                                                        >
                                                        back
                                                    </Button>
                                                    <Button variant="contained" size="small" color="warning" component={ Link } to={ `../update/${project.id}` }>
                                                        update
                                                    </Button>
                                                    <Form method="post">
                                                        <Button 
                                                            variant="contained" size="small" color="error" 
                                                            onClick={handleDeleteConfirmation}
                                                            type="button"
                                                            // type="submit"
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
                                                    <Link to={".."}>
                                                        <ArrowBackIcon color="primary" />
                                                    </Link>
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

                                    <TableContainer component={Box}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableBody>
                                            {
                                                project && Object.entries(project).map((attr) => (
                                                    <TableRow
                                                        key={`project-attribute-${attr[0]}`}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: 'rgba(255, 255, 255, 0.02)'} }}
                                                        >
                                                            {
                                                                (attr[0] !== "id" && attr[0] !== "teamId")
                                                                &&
                                                                (
                                                                    <>
                                                                        <TableCell component="th" scope="row" sx={{opacity: .75}}>
                                                                            {convertHeader(attr[0])}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {convertAttribute(attr[1]?.toString())}
                                                                        </TableCell>
                                                                    </>
                                                                )
                                                            }
                                                    </TableRow>
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            }
        </Box>
        
    )
}