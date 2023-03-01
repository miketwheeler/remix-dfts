

import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useSearchParams, Form, useActionData } from "@remix-run/react";


import { requireUserId } from "~/utils/session.server";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function AccountRoute() {    
    return (
        <Box flexGrow={1} sx={{height: '100%', m: 2, mt: 2.5}}>
            <Typography variant="h4" component="h1" gutterBottom>
                my account
            </Typography>
            <Grid container spacing={2} sx={{height: '100%', mt: 1.5}}>
                <Grid xs={12} md={6}>
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
                                    <TableRow></TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                    <Paper sx={{p: 2}} elevation={2}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            edit account
                        </Typography>
                        <Form method="post">
                            <Stack spacing={2}>
                            <TextField
                                label="first name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />
                            <TextField
                                label="last name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />
                            <TextField
                                label="email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />
                            <TextField
                                label="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />
                            <TextField
                                label="confirm password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />
                                <TextField
                                label="username"
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                />

                            </Stack>
                        </Form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        
    );
}