import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import {
	Box,
	Paper,
	Stack,
	Button,
	Table,
	Rating,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Chip,
	Divider
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { json } from "@remix-run/node";
import {
	Link,
	useSearchParams,
	Form,
	useActionData,
	useLoaderData,
} from "@remix-run/react";
import {
	convertHeader,
	convertAttribute,
} from "~/components/functions/display-data";

import { requireUserId } from "~/utils/session.server";
import { getUserData, getUserAffiliated } from "~/utils/userData.server";
import { useState } from "react";
import DeleteInterruptDialog from "~/components/dialogs/DeleteInterruptDialog";

const personalInfo = [
	{
		name: "first name",
		type: "text",
		value: "firstname",
	},
	{
		name: "last name",
		type: "text",
		value: "lastname",
	},
	{
		name: "dev type",
		type: "text",
		value: "devType",
	},
	{
		name: "available",
		type: "boolean",
		value: false,
	},
	{
		name: "bio",
		type: "text",
		value: "ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis",
	},
	{
		name: "skills (comma separated)",
		type: "text",
		value: "Javascript, Typescript, CSS, HTML, React, Bootstrap,Ruby, Rust, SQL",
	},
	{
		name: "rating",
		type: "number",
		value: 3.5,
	},
];

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

// ACTION -- TODO: needs backend implementation
export const action = async ({ request, params }: ActionArgs) => {
	const form = await request.formData();

	if (form.get("_action") === "delete") {
		// return await deleteAccount(params.id);
		return null;
	} else {
		throw new Response(`no action provided for ${params.id}`, {
			status: 404,
		});
	}
};

// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function AccountRoute() {
	const loadedData = useLoaderData();
	const actionData = useActionData<typeof action>()
	const userData = Object.entries(loadedData.userAcctData);
	const userTeams = loadedData.userTeams.teams;
	const deleteDialogSubject = `Are you sure you want to permanently delete your account? By deleting your account, any teams and projects you created will also be deleted. If you are leaving a project or team, please transfer ownership in the according tab before ending engagement. There is no going back from this.`;


	const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
    };
    const handleDelete = async () => {
        await actionData;
        setShowConfirmation(false);
    };

	// console.log(userTeams);

	// console.log(`user account loadedData: ${JSON.stringify(loadedData, null, 2)}`)
	// console.log(`parsed usersInfo: ${usersInfo}`)

	return (
		<Box flexGrow={1} sx={{ height: "100%", m: 2, mt: 2.5 }}>
			<DeleteInterruptDialog props={{showConfirmation, setShowConfirmation, handleDelete, deleteDialogSubject}} />

			<Typography variant="h4" component="h1" gutterBottom>
				my account
			</Typography>
			<Grid container spacing={2} sx={{ height: "100%", mt: 1.5 }}>
				<Grid xs={12} md={6} sx={{ maxWidth: 600, mx: "auto" }}>
					<div>
						<Typography variant="h6" component="h2" gutterBottom>
							account settings
						</Typography>
						<TableContainer>
							<Table>
								<TableHead
									sx={{
										backgroundColor:
											"rgba(255, 255, 255, 0.25)",
									}}
								>
									<TableRow>
										<TableCell
											sx={{ pr: 6, fontSize: "1rem" }}
										>
											setting
										</TableCell>
										<TableCell
											sx={{ pr: 0, fontSize: "1rem" }}
										>
											current value
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{userData.map(([key, value]) => (
										<TableRow
											key={`keyItem-${Math.random()}`}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
												"&:nth-of-type(odd)": { backgroundColor: "rgba(255, 255, 255, 0.02)" },
											}}
										>
											{/* UserData: Attribute Name (is key) */}
											<TableCell
												component="th"
												scope="row"
											>
												{convertHeader(key)}
											</TableCell>

											{/* UserData: Attribute Value */}
											<TableCell
												scope="row"
												sx={{ mr: 0, pr: 0 }}
											>
												{
													typeof value === "object" ? ( // if it's an object, its the skills
														value &&
														Object.values(value).map(
															(item) => (
																<Chip
																	key={`skill-chip-${item.id}`}
																	label={
																		item.name.toLowerCase()
																	}
																	sx={{ m: 0.5 }}
																/>
															)
														)
													) : key === "rating" ? (
														<Rating
															name="read-only"
															value={
																value &&
																Number(value)
															}
															readOnly
														/>
													) : (
														convertAttribute(value && value.toString())
													)
												}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box
							flexGrow={1}
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "flex-end",
								py: 2,
							}}
							>

							<Form method="post">
								<Button
									variant="outlined" color="error" 
									startIcon={<DeleteForeverIcon />}
									onClick={handleDeleteConfirmation}
									name="_action"
									value="delete"
									>
									delete account
								</Button>
							</Form>
							<Button
								variant="contained"
								sx={{ m: 2 }}
								endIcon={<EditIcon />}
								component={ Link }
								to="/account/edit"
								>
								edit account
							</Button>
						</Box>
					</div>
				</Grid>

				{/* NEED TO ADD SECTIONS FOR PROJECTS/TEAMS CURRENTLY INVOLVED WITH */}
				<Grid xs={12} md={6}>
				<Typography variant="h6" component="h2" gutterBottom>
						my teams
					</Typography>
					<Stack spacing={2} sx={{ width: "100%" }}>
						<Paper sx={{ p: 2 }} elevation={1}>
							{
								userTeams && userTeams.map((item: any) => (
									<Chip
										key={`team-chip-${item.name}`}
										label={ item.name }
										icon={ <WorkIcon /> }
										component={ Link }
										to={ `../dashboard/projects/view/${item.id}` }
										color="primary"
										sx={{ m: 0.5, px: 2  }}
									/>
								))
							}
						</Paper>
					</Stack>
					<Divider sx={{mt: 2, mb: 1}} />
					<Typography variant="h6" component="h2" gutterBottom>
						my projects
					</Typography>
					<Stack spacing={2} sx={{ width: "100%" }}>
						<Paper sx={{ p: 2 }} elevation={1}>
							{
								userTeams && userTeams.map((item: any) => (
									item.projects && Object.values(item.projects).map((project: any) => (
										<Chip
											key={`team-chip-${project.name}`}
											label={ project.name }
											icon={ <WorkIcon /> }
											component={ Link }
											to={ `../dashboard/projects/view/${project.id}` }
											color="primary"
											sx={{ m: 0.5, px: 2 }}
										/>
									))
								))
							}
						</Paper>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
