import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node"

import { requireUserId } from "~/utils/session.server";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function AccountRoute() {    
    return (
        <div>Account Page</div>
    );
}