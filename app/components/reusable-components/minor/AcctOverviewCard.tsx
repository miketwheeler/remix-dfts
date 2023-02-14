import Grid from "@mui/material/Unstable_Grid2";
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
	Box,
	Stack,
	Skeleton,
	Typography,
	Divider,
} from "@mui/material";

// import for data from DB
import { db } from "~/utils/db.server";


// export const loader = async () => {
//     const user = await db.user.findUnique({
//         where: { username: 'awonder' },
//         select: { username: true, email: true, name: true, id: true, },
//     });
//     if(!user) {
//         throw new Error('User not found');
//     }
//     console.log(`the data returned from the loader is: ${JSON.stringify(user)}`)
//     return json(user);
// }

const styles = {
    container: {
        flexGrow: 1,
        // padding: '.5rem',
        borderRadius: '4px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,.1)',
        // backgroundColor: 'background.paper',
    },

}

const AcctOverviewCard = () => {
    // const data = useLoaderData<typeof loader>();
    // console.log(`the data returned from the loader is: ${JSON.stringify(data)}`)

    return (
        <Box sx={styles.container}>
            <Typography variant="h6">Account Overview</Typography>
            <Divider />
            <Stack spacing={1}>
                <p>This is acct card</p>
                {/* <Typography variant="body1">Hi, {data.user.username}!</Typography>
                <Typography variant="body1">Email: {data.user.email}</Typography> */}
            </Stack>
        </Box>

    )
}

export default AcctOverviewCard;