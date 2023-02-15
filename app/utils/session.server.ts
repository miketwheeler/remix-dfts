import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { db } from "./db.server";
// import { getUserById } from '~/utils/user.server';

type LoginForm = {
	username: string;
	password: string;
};

// register a new user
export async function register({ username, password }: LoginForm) {
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await db.user.create({
		data: { username, passwordHash },
	});
	return { id: user.id, username };
}

// login an existing user
export async function login({ username, password }: LoginForm) {
	const user = await db.user.findUnique({
		where: { username },
	});
	if (!user) return null;

	const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
	if (!isCorrectPassword) return null;

	return { id: user.id, username };
}

// session management
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

// session cookie storage
const storage = createCookieSessionStorage({
	cookie: {
		name: "RJ_session",
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30,
		path: "/",
		sameSite: "lax",
		secrets: [sessionSecret],
		// normally you want this to be `secure: true`
		// but that doesn't work on localhost for Safari
		// https://web.dev/when-to-use-local-https/
		secure: process.env.NODE_ENV === "production", // not in production ? false : true
	},
});

// get the current user session
async function getUserSession(request: Request) {
	return storage.getSession(request.headers.get("Cookie"));
}

// get the current user id
export async function getUserId(request: Request) {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") return null;

	return userId;
}

// check the current user is logged in and admit them if session is valid
export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") {
		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
		throw redirect(`/login?${searchParams}`);
	}
	return userId;
}

// export async function requireUser(request: Request) {
// 	const userId = await requireUserId(request);

// 	const user = await getUserId(userId);
// 	if (user) return user;

// 	throw await logout(request);
// }

// get the current user
export async function getUser(request: Request) {
	const userId = await getUserId(request);
	if (typeof userId !== "string") {
		return null;
	}

	try {
		const user = await db.user.findUnique({
			where: { id: userId },
			select: { id: true, username: true },
		});
		return user;
	} catch {
		throw await logout(request);
	}
}

// logout the current user
export async function logout(request: Request) {
	const session = await getUserSession(request);
	return redirect("/login", {
		headers: {
			"Set-Cookie": await storage.destroySession(session),
		},
	});
}

// create a new user session
export async function createUserSession(userId: string, redirectTo: string) {
	const session = await storage.getSession();
	session.set("userId", userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await storage.commitSession(session),
		},
	});
}
