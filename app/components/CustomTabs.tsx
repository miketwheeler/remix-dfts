import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "@remix-run/react";

const links = [
	{
		name: "dashboard",
		path: "/dashboard",
	},
	{
		name: "tasks",
		path: "/dashboard/tasks",
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
	const [value, setValue] = React.useState("dashboard");
	const navi = useNavigate();

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleClick = (path: string) => {
		navi(path);
	}

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper", top: '100px'}}>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="secondary tabs example"
				centered
				sx={{ width: '100%' }}
			>
				{links.map((link, index) => (
					<Tab 
						key={ `tab-${index}` } 
						value={ link.name } 
						label={ link.name } 
						onClick={ () => handleClick(link.path) } 
						sx={{ textTransform: 'none' }}
						/>
				))}
				{/* <Tab value="one" label="Item One" />
				<Tab value="two" label="Item Two" />
				<Tab value="three" label="Item Three" /> */}
			</Tabs>
		</Box>
	);
}
