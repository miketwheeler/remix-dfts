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



const styles = {
    container: {
        flexGrow: 1,
        // padding: '.5rem',
        borderRadius: '4px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,.1)',
        // backgroundColor: 'background.paper',
    },
}

const RowData = ({ props }: any) => {
    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'nowrap', 
            justifyContent: 'space-between'
            }}> 
            <Typography variant="body2">{props.what}</Typography>
            <Typography variant="body2">{props.data.toString().toLowerCase()}</Typography>
        </div>
    )
}

function AcctOverviewCard({props}: any) {
    // const userData = props.userdata;
    const userCurrentTeam = props.userAffiliated.usersTeams.teams[0];
    const userCurrentProject = userCurrentTeam.projects[0];

    // console.log(props.userAffiliated.usersTeams.teams[0].name)
    return (
        <Box sx={styles.container}>
            <Typography variant="h6">{userCurrentProject.name.toLowerCase()}</Typography>
            <Divider sx={{my:.5}} />
            <Stack spacing={.5}>
                {/* <p>This is acct card</p> */}
                <RowData props={{what: "team: ", data: userCurrentTeam.name}} />
                <RowData props={{ what: "app type: ", data: userCurrentProject.type }} />
                <RowData props={{ what: "active: ", data: userCurrentProject.active }} />
                <RowData props={{ what: "milestone: ", data: userCurrentProject.milestone }} />
                <RowData props={{ what: "deployed: ", data: userCurrentProject.deployed }} />
                <RowData props={{ what: "funded: ", data: userCurrentProject.fundingCurrent }} />
                <RowData props={{ what: "fund. goal: ", data: userCurrentProject.fundingGoal }} />
            </Stack>
        </Box>
    )
}

export default AcctOverviewCard;