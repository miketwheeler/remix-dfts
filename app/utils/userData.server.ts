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
                skills: true,
                firstName: true,
                lastName: true,
                email: true,
                bio: true,
                createdAt: true,
                rating: true,
            },
		});
		return userData ;
	} catch {
		return { message: "There was an error fetching that account data or you do not have permissions to access.", status: 402 };
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
                    // teamLead: true,
                } 
            },
        },
    })

    //TODO: should add distinct attribute to db.project -> projectCreator: userId
    // const usersProjects = await db.user.findUnique({
    //     where: { id: user?.id },
    //     select: {
    //         projects: {
    //             select: {

    //             }
    //         }
    // })

    return usersTeams;  
}