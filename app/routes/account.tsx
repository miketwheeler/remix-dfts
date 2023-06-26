import type {
    ActionArgs,
    LoaderArgs,
} from "@remix-run/node";
import  DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, Stack, Button, Table, Rating, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import { json } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData, useLoaderData } from "@remix-run/react";
import { convertHeader, convertAttribute } from "~/components/functions/display-data";

import { requireUserId } from "~/utils/session.server";
import { getUserData, getUserAffiliated } from "~/utils/userData.server";


const personalInfo = [
    {
        name: 'first name',
        type: 'text',
        value: 'firstname',
    },
    {
        name: 'last name',
        type: 'text',
        value: 'lastname',
    },
    {
        name: 'dev type',
        type: 'text',
        value: 'devType',
    },
    {
        name: 'available',
        type: 'boolean',
        value: false,
    },
    {
        name: 'bio',
        type: 'text',
        value: 'ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis',
    },
    {
        name: 'skills (comma separated)',
        type: 'text',
        value: "Javascript, Typescript, CSS, HTML, React, Bootstrap,Ruby, Rust, SQL",
    },
    {
        name: 'rating',
        type: 'number',
        value: 3.5,
    },
]

// const loginInfo = [
//     {
//         name: 'email',
//         type: 'email',
//         value: 'email',
//     },
//     {
//         name: 'password',
//         type: 'password',
//         value: 'password',
//     },
//     {
//         name: 'confirm password',
//         type: 'password',
//         value: 'password',
//     },
//     {
//         name: 'username',
//         type: 'text',
//         value: 'username',
//     },
// ]


// requires the user to be logged in - 
//      on load, so is hack but works because of the order necessary 
//      within the login process
// TODO: account server side & loader requests need to be implemented - is spoof for now
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

    const userAcctData = await getUserData(request);
    const userTeams = await getUserAffiliated(request);


	return json({ userAcctData, userTeams });
}

// ACTION
export const action = async ({ request, params }: ActionArgs) => {
    // invariant(params.id, "no id provided yet");
    const form = await request.formData();

    if(form.get("_action") === "delete") {
        // return await deleteAccount(params.id);
        return null;
    }
    else {
        throw new Response(`no action provided for ${params.id}`, {status: 404})
    }
}


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function AccountRoute() {   
    const loadedData = useLoaderData();

    // const userData = Object.entries(loadedData.userAcctData);
    // const userData = JSON.stringify(loadedData.userAcctData, null, 2)
    // console.log(loadedData.userAcctData)
    const userData = Object.entries(loadedData.userAcctData);

    console.log(userData)


    // console.log(`user account loadedData: ${JSON.stringify(loadedData, null, 2)}`)
    // console.log(`parsed usersInfo: ${usersInfo}`)

    return (
        <Box flexGrow={1} sx={{height: '100%', m: 2, mt: 2.5}}>
            <Typography variant="h4" component="h1" gutterBottom>
                my account
            </Typography>
            <Grid container spacing={2} sx={{height: '100%', mt: 1.5}}>
                <Grid xs={12} md={6} sx={{maxWidth: 600, mx: 'auto'}}>
                    <div>
                        <Typography variant="h6" component="h2" gutterBottom >
                            account settings
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
                                    <TableRow>
                                        <TableCell sx={{ pr: 6, fontSize: '1rem' }}>setting</TableCell>
                                        <TableCell  sx={{ pr: 0, fontSize: '1rem' }}>current value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        userData.map(([key, value]) => (
                                            
                                            <TableRow 
                                                key={`keyItem-${Math.random()}`}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    '&:nth-of-type(odd)': { backgroundColor: 'rgba(255, 255, 255, 0.02)'} 
                                                    }}>
                                                {/* UserData: Attribute Name (is key) */}
                                                <TableCell component="th" scope="row">
                                                    { convertHeader(key) }
                                                </TableCell>

                                                {/* UserData: Attribute Value */}
                                                <TableCell  scope="row" sx={{mr: 0, pr: 0}}>
                                                    {/* { typeof value } */}
                                                    {
                                                        typeof value === 'object' 
                                                        ? null
                                                        : key === 'rating'
                                                        ? <Rating name="read-only" value={value && Number(value)} readOnly />
                                                        : convertAttribute(value && value.toString())
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box 
                            flexGrow={1} 
                            sx={{ 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'flex-end', 
                                py: 2,
                                }}>
                            <Button variant="outlined" sx={{ m:2 }} color="secondary" startIcon={<DeleteForeverIcon />}>
                                delete account
                            </Button>
                            <Button variant="contained" sx={{ m:2 }} endIcon={<EditIcon />} href='/edit-account'>
                                edit account
                            </Button>
                        </Box>
                    </div>
                </Grid>
                
                {/* NEED TO ADD SECTIONS FOR PROJECTS/TEAMS CURRENTLY INVOLVED WITH */}
                <Grid xs={12} md={6}>
                    <Stack spacing={2} sx={{width: '100%'}}>
                        <Paper sx={{p: 2}} elevation={1}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                projects
                            </Typography>
                        </Paper>
                        <Paper sx={{p: 2}} elevation={1}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                teams
                            </Typography>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        
    );
}