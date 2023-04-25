import type {
    LoaderArgs
} from '@remix-run/node';
import {
    // Link,
    useLoaderData,
    // useParams,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { 
    Box, Typography, Paper,  
    // Button, Stack, Chip, Divider, Grid
} from '@mui/material';

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
		// padding: ".5rem",
		// borderRadius: "4px",
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};


export default function DashboardProjectIdRoute() {
    const { project } = useLoaderData<typeof loader>();

    return (
        <Box sx={styles.container}>
            <Typography variant="body1" component="p" gutterBottom>
                description: {project.description}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                {project.synopsis}
            </Typography>
        </Box>
    )
}