import { Box, Paper, Stack, Button, Table, Rating, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";
import { grey } from "@mui/material/colors";


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
        name: 'skills',
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

const username = "username"

// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function EditAccountRoute() {    
    return (
        <Box flexGrow={1} sx={{height: '100%', m: 2, mt: 2.5}}>
            <Typography variant="h4" component="h1" gutterBottom>
                edit your account
            </Typography>
            <Grid container spacing={2} sx={{height: '100%', mt: 1.5}}>
                <Grid xs={12} md={6} sx={{p: 2}}>
                    <div>
                        <Typography variant="h6" component="h2" gutterBottom>
                            make changes to your account information
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>account info</TableCell>
                                        <TableCell align="right">set value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        personalInfo.map((row) => (
                                            <TableRow 
                                                key={row.name} 
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }}
                                                    }>
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.name === "available" 
                                                        ? `${row.name.toString()}`
                                                        : row.value === "skills" 
                                                        ? `${row.name} (comma separated)`
                                                        : row.value === "devType" 
                                                        ? `${row.name} (1 main focus)`
                                                        : row.name
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {
                                                        row.name === "rating"
                                                        ? 
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={Number(row.value)}
                                                                precision={0.1} 
                                                                readOnly  
                                                            />
                                                        : row.name === "bio"
                                                        ? 
                                                            <TextField 
                                                                variant="outlined" 
                                                                size="small"
                                                                multiline
                                                                rows={4}
                                                                type={row.type} 
                                                                defaultValue={row.value}
                                                                sx={{ width: '100%' }}
                                                                />
                                                        : row.name === "available"
                                                        ? 
                                                            <RadioGroup defaultValue="false" name="radio-group" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                                <FormControlLabel value="false" control={<Radio />} label="false" />
                                                                <FormControlLabel value="true" control={<Radio />} label="true" />
                                                            </RadioGroup>
                                                        :
                                                            <TextField 
                                                                variant="outlined" 
                                                                size="small"
                                                                type={row.type} 
                                                                defaultValue={row.value}
                                                            />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>

                <Grid xs={12} md={6} sx={{ p: 2}}>
                    <div>
                        <Typography variant="h6" component="h2" gutterBottom align="right">
                            login settings
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>login info</TableCell>
                                        <TableCell align="right">value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loginInfo.map((row) => (
                                            <TableRow 
                                                key={row.name} 
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 }
                                                }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.name === "available" 
                                                        ? `${row.name.toString()}`
                                                        : row.name
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField 
                                                        variant="outlined" 
                                                        size="small"
                                                        type={row.type} 
                                                        // label={row.name} 
                                                        defaultValue={row.value}
                                                        />
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
                                // border: '1px solid pink'
                                }}>
                            <div>
                                <Button href="/account" startIcon={<ArrowBackIcon  />}>
                                    go back
                                </Button>
                                <Button variant="contained" sx={{ m:2 }} type="submit" >
                                    save edits
                                </Button>
                            </div>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Box>
        
    );
}