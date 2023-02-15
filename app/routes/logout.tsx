import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/utils/session.server";


// IMPORTANT!
// The reason that we're using an action (rather than a loader) is 
// because we want to avoid CSRF problems by using a POST request rather 
// than a GET request. This is why the logout button is a form and not a link.
export const action = async ({ request }: ActionArgs) => {
	return logout(request);
};

export const loader = async () => {
	return redirect("/");
};
