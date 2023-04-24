// import { Skeleton } from "@mui/material";
// import type { ActionArgs, LoaderArgs, MetaFunction } from "@ remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { 
	Typography, Box,
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper,
} from "@mui/material";
import { 
	useState, 
	useMemo 
} from "react";
import { useCatch } from "@remix-run/react";



interface Data {
	name: string;
	dateCreated: string;
	teamLead: string;
}

interface EnhancedTableProps {
	numSelected: number;
	rowCount: number;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	alignLeft: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		alignLeft: true,
		disablePadding: true,
		label: "team name",
	},
	{
		id: "dateCreated",
		alignLeft: false,
		disablePadding: false,
		label: "date team created",
	},
	{
		id: "teamLead",
		alignLeft: false,
		disablePadding: false,
		label: "team lead",
	},
];

function EnhancedTableHead(props: EnhancedTableProps) {
	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
				
				</TableCell>
				{
					headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							align={headCell.alignLeft ? "left" : "right"}
							padding={headCell.disablePadding ? "none" : "normal"}
						>
							{headCell.label}
						</TableCell>
					))
				}
			</TableRow>
		</TableHead>
	);
}


export default function UsersTeamPicker({ props }: any) {
	const { newFormState, setNewFormState, loaderData } = props;
	const userId = loaderData?.userId;
	const usersTeams = loaderData?.usersTeams?.teams;
	const [selected, setSelected] = useState<string>("");


	const handleClick = (event: React.MouseEvent<unknown>, teamId: string) => {
		let newSelected: string;

		if(selected === teamId) newSelected = "";
		else newSelected = teamId;
	
		setSelected(newSelected);
		setNewFormState({ ...newFormState, team: { value: newSelected, error: null } })
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	// useMemo(() => {
	// 	console.log(`selected: ${selected}`)
	// }, [selected])

	return (
        <Box style={{border: '1px solid grey', borderRadius: 4, padding: '1rem' }}>
			<Typography variant="h4" component="h1" gutterBottom>
                {" "}
            </Typography>
            <Typography variant="body1" gutterBottom>
                select a team to assign to this new project
            </Typography>
			<Box sx={{ width: '100%' }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<input type="hidden" name="team" value={newFormState.team?.value} />
					<TableContainer>
						<Table aria-labelledby="users-teams-table" size="medium">
							<EnhancedTableHead
								numSelected={selected.length}
								rowCount={usersTeams.length}
							/>
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
												aria-checked={ isTeamSelected }
												tabIndex={-1}
												key={ team.id }
												selected={ isTeamSelected }
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
													{team.name.toLowerCase()}
												</TableCell>
												<TableCell align="right">
													{team.createdAt ? team.createdAt.slice(0,10) : " "}
													</TableCell>
												<TableCell align="right">
													{team.teamLeadId === userId ? "yes" : " "}
													</TableCell>
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
