// import { Skeleton } from "@mui/material";
// import type { ActionArgs, LoaderArgs, MetaFunction } from "@ remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { Typography, Grid, RadioGroup, Radio, FormControl, FormLabel, Box, FormControlLabel } from "@mui/material";
import { Form, useCatch } from "@remix-run/react";
// import DetailsCard from "~/components/reusable-components/minor/DetailsCard";




export default function UsersTeamPicker({ props, teamAssignment }: any) {
	const data = props;
	const assign = teamAssignment;

	const usersTeams = data.loaderData.userTeams.teams;
    
	return ( 
        <Form method="get" style={{ margin: 'auto 1rem'}}>
			<Typography variant="h4" component="h1" gutterBottom>
                {" "}
            </Typography>
            <Typography variant="h5" gutterBottom>
                select a team to tie to this project
            </Typography>
            
			<Box sx={{ border: '1px solid lightgrey', width: '100%', borderRadius: 2, padding: 2 }}>
				<Typography variant="body1" sx={{ display: 'flex'}}> 
					Looks like you are the lead on these team(s): 
				</Typography>
				<br/>
				<Typography variant="body1" gutterBottom>
					{
						usersTeams.map((team: any) => {
							if(team.teamLeadId === data.loaderData.userId) {
								return `* ${team.name}`
							}
						})
					}
				</Typography>
				<br />
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
				<br />
				<br />
			</Box>
			<Typography variant="h5" gutterBottom>
                here's all the teams you're a member of
            </Typography>
			<Typography variant="body1" gutterBottom>
				{
					usersTeams.map((team: any) => {
						return `${team.name}`
					})
				}
			</Typography>
        </Form>
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
