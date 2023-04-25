import type {
    LoaderArgs
} from '@remix-run/node';
import {
    Link,
    useLoaderData,
    useParams,
    Outlet
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { Box, Typography, Paper,  Button, Stack, Chip, Divider, Grid, useMediaQuery} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { db } from "~/utils/db.server";
import { getProject } from "~/utils/project.server";
import { getProjectListWhereTeamLead } from "~/utils/project.server";
import { IconButton } from '@mui/joy';
// import { Grid2 } from '@mui/material/Unstable_Grid2';



export async function loader({ request }: LoaderArgs) {
    return await getProjectListWhereTeamLead(request)
}


const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
        mx: 2,
        my: 2,
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    // paper: {
    //     padding: "1rem 0 2rem 2rem",
    // }
};


export default function DashboardProjectRoute() {
    const data = useLoaderData<typeof loader>();
    const smAndDown = useMediaQuery('(max-width: 800px)');

    // console.log("dashboard-projects data: ", data)

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" component="h1" gutterBottom>
                Dashboard - Projects
            </Typography>
            <br />
            <Stack spacing={2}>
                    {
                        data.map((project: any) => (
                            project.map((indivProj: any, index: number) => (
                                <Paper key={`project-${index}`} sx={{ minWidth: 334 }}>
                                    <Box>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Box sx={{ p: 2 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                            <Typography variant="h6" gutterBottom>
                                                                project - {indivProj.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box 
                                                            sx={{ 
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
                                                                        variant="contained" 
                                                                        size="small" 
                                                                        color="success" 
                                                                        component={ Link }
                                                                        to={ `${indivProj.id}` }
                                                                        >
                                                                        view
                                                                    </Button>
                                                                    <Button 
                                                                        variant="contained" 
                                                                        size="small" 
                                                                        color="warning" 
                                                                        component={ Link }
                                                                        to={ `${indivProj.id}` }
                                                                        >
                                                                        update
                                                                    </Button>
                                                                    <Button 
                                                                        variant="contained" 
                                                                        size="small" 
                                                                        color="error"
                                                                        component={ Link } 
                                                                        to={ `${indivProj.id}` } 
                                                                        >
                                                                        delete
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    <Link to={ `${indivProj.id}` }>
                                                                        <VisibilityIcon color="success" />
                                                                    </Link>
                                                                    <Link to={ `${indivProj.id}` }>
                                                                        <EditIcon color="warning" />
                                                                    </Link>
                                                                    <Link to={ `${indivProj.id}` }>
                                                                        <DeleteForeverIcon color="error" />
                                                                    </Link>
                                                                </>
                                                            }
                                                        </Box>
                                                    </Box>
                                                    <Divider sx={{my: 1}} />

                                                    <Typography variant="body1">
                                                        type: &nbsp; {indivProj.type} 
                                                        <br /> 
                                                        synopsis: &nbsp; {indivProj.synopsis} 
                                                        <br/> 
                                                        dates: &nbsp; {indivProj.beginDate} to {indivProj.endDate}
                                                    </Typography>

                                                    <Divider sx={{my: 1}} />
                                                    <Typography variant="body1">tech stack:&nbsp;</Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
                                                        <br/>
                                                        {
                                                            indivProj.techStack.split(",").map((tech: string, index: number) => (
                                                                <Chip key={`tech-${index}`} label={tech} />
                                                            ))
                                                        }
                                                    </Box>

                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            ))
                        ))
                    }
                </Stack>
        </Box>
    );
}

export function ErrorBoundary() {
    const { data } = useParams();
    return (
        <div className="error-container">
            <h1>Something went wrong</h1>
            {`There was an error loading the data for ${data}.`}
            <Link to="/">Go home</Link>
        </div>
    );
}