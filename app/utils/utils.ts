import { useMatches, useRouteLoaderData } from "@remix-run/react";

import type { User } from "~/models/user.server";

function isUser(user: any): user is User {
	return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
	const data = useRouteLoaderData("root");
	if (!data || !isUser(data.user)) {
		return undefined;
	}
	return data.user;
}
