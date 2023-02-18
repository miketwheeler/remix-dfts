import * as React from "react";
import type { 
	LoaderArgs 
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Tab, Tabs } from "@mui/material";
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ErrorIcon from '@mui/icons-material/Error';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailIcon from '@mui/icons-material/Mail';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
// import Slide from '@mui/material/Slide';


// import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";



const drawerWidth = 240;
// const linksMain = undefined;
// const linksSecondary = undefined;
const primaryLinksEndIndex = 2;
const navLinks = [
    {
        name: "dashboard",
        path: "/dashboard",
		icon: <GridViewIcon />,
		enabled: true,
    },
    {
        name: "project hub",
        path: "/projecthub",
		icon: <CategoryIcon />,
		enabled: true,
    },
    {
        name: "member hall",
        path: "/memberhall",
		icon: <GroupsIcon />,
		enabled: true,
    },
	{
		name: "funding tree",
		path: "/fundingtree",
		icon: <AttachMoneyIcon />,
		enabled: false,
	},
	{
		name: "messages",
		path: "/messages",
		icon: <MailIcon />,
		enabled: false,
	},
	{
		name: "documents",
		path: "/documents",
		icon: <HistoryEduIcon />,
		enabled: false,
	},
	{
		name: "news",
		path: "/news",
		icon: <NewspaperIcon />,
		enabled: false,
	}
];

const tabStyles = {
	color: "primary",
	textTransform: 'none',
	mr: 'auto',
	minHeight: 55.98,
	width: "100%",
	justifyContent: 'flex-start',
	cursor: 'pointer',
	"& .MuiTab-iconWrapper": {
		mr: 3,
	},
}


export const loader = async ({ request }: LoaderArgs) => {
	const user = await getUser(request);

	return json({ user });
};



export default function AppBarAndNav(props: any) {
	// const user = useOptionalUser();
	const data = useLoaderData<typeof loader>();
	const { window } = props;
	const [navTabValue, setNavTabValue] = React.useState(0);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setNavTabValue(newValue);
		if(mobileOpen)
			handleDrawerToggle();
	};


	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<Tabs
				orientation="vertical"
				value={navTabValue}
				onChange={handleChange}
				aria-label="Primary Navigation Tabs"
				>
				{
					navLinks.map((link, index) => (
						<Tab
							key={ `tab-${index}` }
							id={ link.name }
							label={ link.name }
							icon={ link.icon }
							iconPosition="start"
							component={ Link }
							to={ link.path }
							disabled={ !link.enabled }
							sx={ tabStyles }
						/>
						)
					)
				}
				{
					(!navLinks) ?
						<Tab
							key={ 'tab-empty' }
							id={ 'empty-tab' }
							label={ 'blank tap' }
							icon={ <ErrorIcon /> }
							iconPosition="start"
							component={ Link }
							to={ '/' }
							sx={ tabStyles }
						/>
					: null
				}
			</Tabs>
		</div>
	);
	


	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `100%` },
					ml: { sm: `${drawerWidth}px` },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{marginLeft: '8px'}}>
						App Bar
					</Typography>

						{
							data.user ? (
								<div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
									<span style={{ marginRight: '1rem' }}>
										{`hi, ${data.user.username}`}
									</span>
									<div style={{ marginRight: '1rem', color: '#2d2d2d'}}>|</div>
									<form action="logout" method="post">
										<button 
											type="submit" 
											color="inherit" 
											style={{ 
												background: 'none',
												border: 'none',
												margin: '0',
												padding: '0',
												cursor: 'pointer',
												fontSize: '1rem',
												textDecoration: 'none' 
											}} 
											>
												logout
											</button>
									</form>
								</div> 
							) : (
								<Link color="inherit" style={{marginLeft: 'auto', textDecoration: 'none'}} to="login">login</Link>
							)
						}
						{/* <Link color="inherit" style={{marginLeft: 'auto', textDecoration: 'none'}} to="/login">login</Link>
						<Link color="inherit" style={{marginLeft: '1rem', textDecoration: 'none'}} to="/logout">logout</Link> */}
						<Link color="inherit" style={{marginLeft: '1rem', textDecoration: 'none'}} to="/">account</Link>
				
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 0,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
				>
				<Toolbar />
				
				{/* The main contents of the Nav links */}
				<Outlet />

			</Box>
		</Box>
	);
}
