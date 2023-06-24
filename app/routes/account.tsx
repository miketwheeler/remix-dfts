import type {
    ActionArgs,
    LoaderArgs,
} from "@remix-run/node";
import  DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, Stack, Button, Table, Rating, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import { json } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";


import { requireUserId } from "~/utils/session.server";



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

const loginInfo = [
    {
        name: 'email',
        type: 'email',
        value: 'email',
    },
    {
        name: 'password',
        type: 'password',
        value: 'password',
    },
    {
        name: 'confirm password',
        type: 'password',
        value: 'password',
    },
    {
        name: 'username',
        type: 'text',
        value: 'username',
    },
]


// requires the user to be logged in - 
//      on load, so is hack but works because of the order necessary 
//      within the login process
// TODO: account server side & loader requests need to be implemented - is spoof for now
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
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
    
    return (
        <Box flexGrow={1} sx={{height: '100%', m: 2, mt: 2.5}}>
            <Typography variant="h4" component="h1" gutterBottom>
                my account
            </Typography>
            <Grid container spacing={2} sx={{height: '100%', mt: 1.5}}>
                <Grid xs={12} md={6} sx={{maxWidth: 600, mx: 'auto'}}>
                    <div>
                        <Typography variant="h6" component="h2" gutterBottom >
                            current account settings
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>field</TableCell>
                                        <TableCell align="right">value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        personalInfo.map((row) => (

                                            // ROW TITLE
                                            <TableRow 
                                                key={row.name}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }}
                                                    }>
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.name === "available" 
                                                        ? `${row.name}`
                                                        : row.name
                                                    }
                                                </TableCell>

                                                {/* ROW VALUE */}
                                                <TableCell align="right" scope="row" sx={{mr: 0, pr: 0}}>
                                                    {
                                                        row.name === "rating"
                                                        ? 
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={Number(row.value)}
                                                                precision={0.1} 
                                                                readOnly  
                                                            />
                                                        : row.name === "available"
                                                        ?
                                                            <Typography 
                                                                variant="body2" 
                                                                sx={{ color: row.value === true ? 'success.main' : 'error.main'}}
                                                                >
                                                                    {row.value.toString()}
                                                            </Typography>
                                                        :
                                                        <Typography 
                                                            variant="body2" 
                                                            // sx={{ width: '88%'}}
                                                            >
                                                                {row.value}
                                                        </Typography>
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