import type { LoaderArgs } from "@remix-run/node";
import { useState, useMemo } from "react";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { AppBar, Box, CssBaseline, Divider, Drawer, Toolbar, Typography, Tab, Tabs, IconButton } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import ErrorIcon from '@mui/icons-material/Error';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailIcon from '@mui/icons-material/Mail';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import { getUser } from "~/utils/session.server";



const drawerWidth = 240;

const navRoutes = ["dashboard", "projecthub", "memberhall", "fundingtree", "DIVIDER", "HEADING1", "messages", "documents", "news", "DIVIDER", "HEADER2", "create-project", "create-team"]
const nav = {
	primaryLinks: [
		{
			index: 0,
			name: "dashboard",
			path: "/dashboard",
			icon: <GridViewIcon />,
			enabled: true,
		},
		{
			index: 1,
			name: "project hub",
			path: "/projecthub",
			icon: <CategoryIcon />,
			enabled: true,
		},
		{
			index: 2,
			name: "member hall",
			path: "/memberhall",
			icon: <GroupsIcon />,
			enabled: true,
		},
		{
			index: 3,
			name: "funding tree",
			path: "/fundingtree",
			icon: <AttachMoneyIcon />,
			enabled: false,
		},
	],
	secondaryLinks: [
		{
			index: 4,
			name: "messages",
			path: "/messages",
			icon: <MailIcon />,
			enabled: false,
		},
		{
			index: 5,
			name: "documents",
			path: "/documents",
			icon: <HistoryEduIcon />,
			enabled: false,
		},
		{
			index: 6,
			name: "news",
			path: "/news",
			icon: <NewspaperIcon />,
			enabled: false,
		},
	],
	tertiaryLinks: [
		{
			index: 7,
			name: "new project",
			path: "/create-project-redo", // TODO: change this back to /create-project
			icon: <AddBoxIcon />,
			enabled: true,
		},
		{
			index: 8,
			name: "new team",
			path: "/create-team",
			icon: <AddCircleIcon />,
			enabled: true,
		},
	],
}

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
const navHeaderStyle = { 
	ml: 2, 
	mt: 2, 
	mb: 0,
	opacity: .2,
}

export const loader = async ({ request }: LoaderArgs) => {
	const user = await getUser(request);
	return json({ user });
};


const BuiltTab = ({props}: any) => {
	return (
		<Tab
			id={ props.link.name }
			component={ Link }
			// prefetch='intent'
			label={ props.link.name }
			iconPosition="start"
			icon={ props.link.icon }
			to={ props.link.path }
			disabled={ !props.link.enabled }
			sx={ tabStyles }
		/>
	)
}



export default function AppBarAndNav(props: any) {
	const data = useLoaderData<typeof loader>();
	const { window } = props;
	const container = (window !== undefined) ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = useState(false);
	
	const location = useLocation().pathname;
	const [pathValue, setPathValue] = useState("dashboard"); // for setting the TABs value/check against current path
	const [navTabValue, setNavTabValue] = useState(0);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setNavTabValue(newValue);
		if(mobileOpen)
			handleDrawerToggle();
	};

	useMemo(() => {
        setPathValue(location.split('/')[1]);
        let pathToValue = navRoutes.indexOf(pathValue);
        setNavTabValue(pathToValue !== navTabValue ? pathToValue : navTabValue);
    }, [location, navTabValue, pathValue]);


	const drawer = (
		<Box>
			<Toolbar />
			<Divider />
			<Tabs
				orientation="vertical"
				value={ navTabValue }
				onChange={ handleChange }
				aria-label="Primary Navigation Tabs"
				>
				{
					nav.primaryLinks.map((link, index) => (
						<BuiltTab key={ `tab-${props.index}` } props={{ link }} />
						)
					)
				}
				<Divider />
				<Typography variant="h6" sx={navHeaderStyle}>
					personal
				</Typography>
				{
					nav.secondaryLinks.map((link, index = nav.primaryLinks.length) => (
						<BuiltTab key={ `tab-${index}` } props={{ link }} />
						)
					)
				}
				<Divider />
				<Typography variant="h6" sx={navHeaderStyle}>
						create
				</Typography>
				{
					nav.tertiaryLinks.map((link, index = nav.primaryLinks.length + nav.secondaryLinks.length) => (
						<BuiltTab key={ `tab-${index}` } props={{ link }} />
						)
					)
				}
				{
					(!nav.primaryLinks ?? !nav.secondaryLinks ?? !nav.tertiaryLinks) 
					? 
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
		</Box>
	);
	

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
						dev foyer
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
												textDecoration: 'none',
												color: 'white',
												textTransform: 'none',
											}} 
											>
												logout
											</button>
									</form>
								</div> 
							) : (
								<Link 
									style={{
										marginLeft: 'auto', 
										textDecoration: 'none', 
										color: 'inherit',
									}} 
									to="/login"
									>
										login
								</Link>
							)
						}
						<Link 
							color="inherit" 
							style={{
								marginLeft: '1rem', 
								textDecoration: 'none', 
								color: 'inherit'
							}} 
							to="/account"
							>
								account
						</Link>
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
					width: { xs: `calc(100% - ${drawerWidth}px)` },
				}}
				>
				<Toolbar />
				
				{/* The main contents determined by the Nav links */}
				<Outlet />

			</Box>
		</Box>
	);
}



// {/* ORIGINAL DRAWER CODE 
// <Tabs
// 	orientation="vertical"
// 	value={navTabValue}
// 	onChange={handleChange}
// 	aria-label="Primary Navigation Tabs"
// 	>
// 	{
// 		navLinks.map((link, index) => (
// 			<Tab
// 				key={ `tab-${index}` }
// 				id={ link.name }
// 				label={ link.name }
// 				icon={ link.icon }
// 				iconPosition="start"
// 				component={ Link }
// 				to={ link.path }
// 				disabled={ !link.enabled }
// 				sx={ tabStyles }
// 			/>
// 			)
// 		)
// 	}
// 	{
// 		(!navLinks) ?
// 			<Tab
// 				key={ 'tab-empty' }
// 				id={ 'empty-tab' }
// 				label={ 'blank tap' }
// 				icon={ <ErrorIcon /> }
// 				iconPosition="start"
// 				component={ Link }
// 				to={ '/' }
// 				sx={ tabStyles }
// 			/>
// 		: null
// 	}
// </Tabs> */}