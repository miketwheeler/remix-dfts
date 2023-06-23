import { db } from './db.server';
import { getUserId } from './session.server';
import { json, redirect } from '@remix-run/node';



type CreateProjectForm = {
    name: string;
    type: string;
    synopsis: string;
    description: string;
    techStack: string;
    beginDate: string;
    endDate: string;
    active: string;
    fundingGoal: string;
    teamId: string;
}

type UpdateProjectForm = {
    id: string;
    name: string;
    type: string;
    synopsis: string;
    description: string;
    techStack: string;
    beginDate: string;
    endDate: string;
    milestone: number;
    deployed: boolean;
    funded: boolean;
    fundingGoal: number;
    active: boolean;
}


//  CREATE
export async function createProject({ 
    name, type, synopsis, description, techStack, beginDate, endDate, active, fundingGoal, teamId,
}: CreateProjectForm) {
    const newFundingGoal = Number(fundingGoal.slice(1)) * 1.00; // remove $ from string, cast to number
    const convertActive = ( active === "true" ? true : false )
    const convertDate = ( date: string ) => {
        const dateArr = date.split("/");
        const newDate = new Date(parseInt(dateArr[2]), parseInt(dateArr[1]), parseInt(dateArr[0]));
        const returnDate = (newDate.toISOString());
        return returnDate;
    }

	const project = await db.project.create({
		data: { 
            name, 
            type, 
            synopsis, 
            description, 
            techStack, 
            beginDate: convertDate(beginDate), 
            endDate: convertDate(endDate), 
            active: convertActive, 
            fundingGoal: newFundingGoal, 
            team: {
                connect: { id: teamId }
            }
        },
	});

    if(teamId) {
        await db.team.update({
            where: {
                id: teamId
            },
            data: {
                projects: {
                    connect: { id: project.id }
                }
            }
        })
    }

	return { 
        id: project.id, 
        // teamUpdatedProjectId: updatedTeamProjects.id, 
        name, 
        message: `successfully created your new project ${name}!` 
    };
}

export async function getProjectListWhereTeamLead( request: Request ) {
    const userId = await getUserId(request);
    const associatedProjects = [] as any;
    const teams = await db.team.findMany({
        where: { 
            teamLeadId: userId
        },
    });

    if(teams) {
        for(const team of teams) {
            associatedProjects.push(await db.project.findMany({
                where: { 
                    teamId: team.id
                },
                select: {
                    id: true, name: true, type: true, synopsis: true, description: true, techStack: true, beginDate: true, endDate: true, active: true, fundingGoal: true, teamId: true
                },
                orderBy: { createdAt: "desc" },
            }))
            // return associatedProjects;
        }
    }

    return associatedProjects;
}

// READ
export async function getProject(id: string) {
    const project = db.project.findUnique({
        where: { id },
    })
    if(!project) { 
        throw new Response("no id provided", { status: 404 })
    }

    return project;
}


export async function updateProject({
    id, name, type, synopsis, description, techStack, beginDate, endDate, milestone, deployed, funded, fundingGoal, active
}: UpdateProjectForm) {

    const newFundingGoal = fundingGoal * 1.00; // remove $ from string, cast to number

    const project = await db.project.update({
        where: { id },
        data: { 
            name, 
            type, 
            synopsis, 
            description, 
            techStack,
            beginDate,
            endDate, 
            milestone: Number(milestone), 
            deployed, 
            funded, 
            fundingGoal: newFundingGoal,
            active
        },
    });

    // need to return project(?) and status success/failed
    return { 
        project,
        message: `successfully updated project ${name}!` 
    };
}



// DELETE
export async function deleteProject(id: string) {
    // const { id } = await request.json();
    const project = await db.project.delete({
        where: { id },
    });

    console.log(`deleted project ${project.id}`);

    return redirect("/dashboard/projects");
}

