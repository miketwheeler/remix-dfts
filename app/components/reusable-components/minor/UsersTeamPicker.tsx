// import { Skeleton } from "@mui/material";
// import type { ActionArgs, LoaderArgs, MetaFunction } from "@ remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { Typography, RadioGroup, Radio, FormControl, FormLabel, Box, FormControlLabel, Stack, Divider } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Form, useCatch } from "@remix-run/react";
// import DetailsCard from "~/components/reusable-components/minor/DetailsCard";




export default function UsersTeamPicker({ props }: any) {
	const { newFormState, setNewFormState, loaderData }= props;
	// const assign = teamAssignment;

	const usersTeams = loaderData.userTeams.teams;

	console.log(`teampicker Passed data: ${JSON.stringify(usersTeams)}}`)
    
	return (
        <Box style={{ margin: 'auto 1rem'}}>
			<Typography variant="h4" component="h1" gutterBottom>
                {" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
                select a team to assign to this project
            </Typography>
            
			<Box sx={{ border: '1px solid lightgrey', width: '100%', borderRadius: 2, padding: 2, display: 'flex' }}>
				<Box flexGrow={1} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Stack spacing={2}>
						<Typography variant="body1" sx={{ display: 'flex'}}> 
							Looks like you are the lead on these team(s): 
						</Typography>
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
				<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
				<Box flexGrow={1} sx={{ dispaly: 'flex', flexDirection: 'column' }}>
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
				</Box>
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
