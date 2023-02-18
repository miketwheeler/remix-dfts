import { redirect } from '@remix-run/node';
import { db } from './db.server';


import { getUser, getUserId } from './session.server';


export async function getUserData(request: Request) {
	const userId = await getUserId(request);
	if (typeof userId !== "string") return null;
	try {
		const userData = await db.user.findUnique({
			where: { id: userId },
			select: { 
                username: true, 
                devType: true, 
                available: true, 
                skills: true 
            },
		});
		return { userData };
	} catch {
		console.log("There was an error fetching user data");
	}
}

// returns this user's teams and projects
export async function getUserAffiliated(request: Request) {
    const user = await getUser(request);
    const usersTeams = await db.user.findUnique({
        where: { id: user?.id },
        select: { 
            teams: { 
                select: { 
                    id: true, 
                    name: true, 
                    projects:  true,
                    teamLead: true,
                } 
            },
        },
    })

    return { usersTeams }    
}