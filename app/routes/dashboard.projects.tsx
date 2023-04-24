import type {
    LoaderArgs
} from '@remix-run/node';
import {
    Link,
    useLoaderData,
    useParams,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { Box, Typography, Paper,  Button, Stack, Chip, Divider, Grid} from '@mui/material';

import { db } from "~/utils/db.server";
import { getProject } from "~/utils/project.server";
import { getProjectListWhereTeamLead } from "~/utils/project.server";
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
    paper: {
        padding: "1rem 2rem 2rem",
    }
};


export default function DashboardProjectRoute() {
    const data = useLoaderData<typeof loader>();

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
                                <Paper sx={styles.paper} key={`project-${index}`}>
                                    <Box >
                                        <Grid container spacing={1}>
                                            <Grid item xs={8.9}>
                                                <Typography variant="h6" gutterBottom>
                                                    project - {indivProj.name}
                                                </Typography>
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
                                            </Grid>
                                            <Grid item xs={.2}>
                                                <Divider orientation="vertical" flexItem sx={{height: '100%', justifyContent: 'center', mx: 1}} />
                                            </Grid>
                                            <Grid item xs={2.9}>
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        flexDirection: 'column', 
                                                        gap: 1, 
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height:'100%' 
                                                        }}
                                                        >
                                                    <Typography variant="body1">view or edit this project</Typography>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="success" 
                                                        href={`/dashboard/projects/${indivProj.id}`}
                                                        >
                                                            view
                                                    </Button>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="warning" 
                                                        href={`/dashboard/projects/${indivProj.id}`}
                                                        >
                                                            update
                                                    </Button>
                                                    <Typography variant="body1"></Typography>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="error" 
                                                        href={`/dashboard/projects/${indivProj.id}`}
                                                        >
                                                            delete
                                                    </Button>
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