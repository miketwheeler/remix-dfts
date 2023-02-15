import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node"
import { Outlet } from "@remix-run/react";
import CustomTabs from "~/components/CustomTabs";
// import { Button } from "@mui/material";

import { requireUserId } from "~/utils/session.server";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


// exports the 'index' page of the Dashboard route - the parent of subsequent Dashboard content & routes within the Dashboard
export default function DashboardRoute() {
	return (
		<div>
			<CustomTabs />
			<Outlet />
			{/* <br />
            <br />
            <Button type='button' onClick={handleBackButton}>Go Back</Button> */}
		</div>
	);
}
