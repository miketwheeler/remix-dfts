import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "@remix-run/react";


const drawerWidth = 240;

const links = [
	{
		name: "dashboard",
		path: "/dashboard",
	},
	{
		name: "teams",
		path: "/dashboard/teams",
	},
	{
		name: "messages",
		path: "/dashboard/messages",
	},
	{
		name: "schedule",
		path: "/dashboard/schedule",
	},
];

export default function CustomTabs() {
	const [dashTabValue, setDashTabValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setDashTabValue(newValue);
	};

	// TESTING
	// React.useEffect(() => {
	// 	console.log(`dashTab current value: ${dashTabValue}`)
	// })

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper", top: '100px'}}>
			<Tabs
				value={dashTabValue}
				onChange={handleChange}
				aria-label="nested tabs"
				centered
				>
				{
					links.map((link, index) => (
						<Tab 
							key={ `tab-${index}` } 
							id={ link.name }
							label={ link.name } 
							component={Link}
							to={link.path}
							sx={{ textTransform: 'none' }}
						/>
					))
				}
			</Tabs>
		</Box>
	);
}
