// import { Skeleton } from "@mui/material";
// import type { ActionArgs, LoaderArgs, MetaFunction } from "@ remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { 
	Typography, RadioGroup, Radio, FormControl, FormLabel, Box, FormControlLabel, Stack, Divider, 
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper
 } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Form, useCatch } from "@remix-run/react";
// import DetailsCard from "~/components/reusable-components/minor/DetailsCard";




export default function UsersTeamPicker({ props }: any) {
	const { newFormState, setNewFormState, loaderData }= props;
	// const assign = teamAssignment;
	const teamsUserIsLead = loaderData?.teamsUserIsLead;
	const userId = loaderData?.userId;
	console.log(`teams User Is Lead On: ${JSON.stringify(teamsUserIsLead)}}`)

	const usersTeams = loaderData.usersTeams.teams;

	console.log(`users associated Teams: ${JSON.stringify(usersTeams)}}`)

	const [selected, setSelected] = useState<readonly string[]>([]);

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];
	
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
	
		setSelected(newSelected);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

    
	return (
        <Box style={{ margin: 'auto 1rem'}}>
			<Typography variant="h4" component="h1" gutterBottom>
                {" "}
            </Typography>
            <Typography variant="h6" gutterBottom>
                select a team to assign to this new project
            </Typography>

			<Box sx={{ width: '100%' }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<TableContainer>
						<Table aria-labelledby="users-teams-table" size="medium">
							<TableBody>
								{
									usersTeams && userId 
									?
									usersTeams.map((team: any, index: number) => {
										const isTeamSelected = isSelected(team.id);
										const labelId = `table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, team.id)}
												role="checkbox"
												aria-checked={isTeamSelected}
												tabIndex={-1}
												key={team.id}
												selected={isTeamSelected}
												sx={{ cursor: 'pointer' }}
												>
												<TableCell padding="checkbox">
													<Checkbox
														color="primary"
														checked={isTeamSelected}
														inputProps={{
															'aria-labelledby': labelId,
														}}
													/>
												</TableCell>
												<TableCell component="th" id={labelId} scope="row" padding="none">
													{team.name}
												</TableCell>
												<TableCell align="right">{team.teamLeadId === userId ? "lead" : " "}</TableCell>

											</TableRow>
										)
									})
									: null
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>
            
			<Box sx={{ border: '1px solid lightgrey', width: '100%', borderRadius: 2, padding: 2, display: 'flex' }}>
				<Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="body1" sx={{ display: 'flex' }}> 
						select to assign your new project to a team: 
					</Typography>
					<Divider flexItem sx={{ mt: 1, mb: 2 }} />
					<Stack spacing={2}>
						<Typography variant="body1" gutterBottom>
							{
								usersTeams.map((team: any) => {
									let returnValue;
									if(team.teamLeadId === loaderData.userId) {
										returnValue = `* ${team.name}`
									}
									return returnValue;
								})
							}
						</Typography>
						<FormControl>
							<FormLabel id="project-active-radio-choice">connect team to this project?</FormLabel>
							<RadioGroup
								row
								aria-labelledby="project-active-radio-choice"
								name="project-active-radio-group"
								defaultValue={ true }
								aria-invalid={ false }
								>
								<FormControlLabel value="true" label="yes" control={ <Radio /> } />
								<FormControlLabel value="false" label="no" control={ <Radio /> } />
							</RadioGroup>
						</FormControl>
					</Stack>
				</Box>
				{/* <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> */}
				{/* <Box flexGrow={1} sx={{ dispaly: 'flex', flexDirection: 'column' }}>
					<Typography variant="body1" sx={{ display: 'flex'}}>
						Here's all the teams you're a member of:
					</Typography>
					<Box sx={{  }}>
						{
							usersTeams.map((team: any) => {
								return `${team.name}`
							})
						}
					</Box>
				</Box> */}
			</Box>
        </Box>
    )
}

export function CatchBoundary() {
	const caught = useCatch();
	// const params = useParams();
	switch (caught.status) {
		case 400: {
			return (
				<div className="error-container">
					What you're trying to do is not allowed.
				</div>
			);
		}
		case 404: {
			return (
				<div className="error-container">
					Seems that user does not exist.
				</div>
			);
		}
		case 403: {
			return (
				<div className="error-container">
					This asset does not belong to you.
				</div>
			);
		}
		default: {
			throw new Error(`Unhandled error: ${caught.status}`);
		}
	}
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	// const { id } = useParams();
	return (
		<div>
            {`There was an error loading that data. Please try again later.`}
        </div>
	);
}
