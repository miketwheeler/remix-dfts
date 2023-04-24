import * as React from "react";
import { useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useLocation } from "@remix-run/react";


// const drawerWidth = 240;

const dashRoutes = ["dashboard", "teams", "projects", "messages", "schedule"]

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
		name: 'projects',
		path: '/dashboard/projects',
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
	const location = useLocation().pathname;
	const [dashTabValue, setDashTabValue] = React.useState(0);
	const [pathValue, setPathValue] = React.useState('dashboard');
	

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setDashTabValue(newValue);
	};

	useMemo(() => {
        setPathValue(
			location.split('/')[2] ? location.split('/')[2] : location.split('/')[1]
		);
        let pathToValue = dashRoutes.indexOf(pathValue);
        setDashTabValue(pathToValue !== dashTabValue ? pathToValue : dashTabValue);
    }, [location, dashTabValue, pathValue]);


	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper", top: '100px'}}>
			<Tabs
				value={ dashTabValue }
				onChange={ handleChange }
				aria-label="nested tabs"
				centered
				>
				{
					links.map((link, index) => (
						<Tab 
							key={ `${link.name}-dash-tab-${index}` } 
							id={ link.name }
							label={ link.name } 
							component={ Link }
							to={ link.path }
							sx={{ textTransform: 'none' }}
						/>
					))
				}
			</Tabs>
		</Box>
	);
}
