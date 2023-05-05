import type {
    LoaderArgs
} from '@remix-run/node';
import {
    Link,
    // useLoaderData,
    useParams,
    Outlet
} from '@remix-run/react';
// import { json } from '@remix-run/node';
// import { Box, Typography, Paper,  Button, Stack, Chip, Divider, Grid, useMediaQuery} from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// import { db } from "~/utils/db.server";
// import { getProject } from "~/utils/project.server";
// import { getProjectListWhereTeamLead } from "~/utils/project.server";
// import { IconButton } from '@mui/joy';
// import { Grid2 } from '@mui/material/Unstable_Grid2';



// export async function loader({ request }: LoaderArgs) {
//     return await getProjectListWhereTeamLead(request)
// }


// const styles = {
// 	container: {
// 		flexGrow: 1,
// 		padding: ".5rem",
// 		borderRadius: "4px",
//         mx: 2,
//         my: 2,
// 		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
// 	},
//     // paper: {
//     //     padding: "1rem 0 2rem 2rem",
//     // }
// };


export default function DashboardProjectRoute() {
    // const data = useLoaderData<typeof loader>();
    // // const data = [] as any;
    // const smAndDown = useMediaQuery('(max-width: 800px)');

    // console.log("dashboard-projects data: ", data)

    return (
        <Outlet />
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