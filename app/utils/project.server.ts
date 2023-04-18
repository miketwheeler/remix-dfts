import { db } from './db.server';


type CreateProjectForm = {
    name: string;
    type: string;
    synopsis: string;
    description: string;
    techStack: string;
    beginDate: string;
    endDate: string;
    active: string;
    fundingGoal: number;
    teamId: string;
}


//  CREATE
export async function createProject({ 
    name, type, synopsis, description, techStack, beginDate, endDate, active, fundingGoal, teamId,
}: CreateProjectForm) {
    const newFundingGoal = Number(fundingGoal) * 1.00; // convert json string value to decimal
    const convertActive = ( active === "true" ? true : false )
	const project = await db.project.create({
		data: { 
            name, 
            type, 
            synopsis, 
            description, 
            techStack, 
            beginDate, 
            endDate, 
            active: convertActive, 
            fundingGoal: newFundingGoal, 
            // category,
            teamId
        },
	});

	return { id: project.id, name, message: `successfully created your new project ${name}!` };
}

// READ
export async function getProject(request: Request) {
    const { id } = await request.json();
    const project = await db.project.findUnique({
        where: { id: Number(id) },
    });

    return project;
}

// UPDATE
export async function updateProject(request: Request) {
    const { id, name, type, synopsis, description, techStack, beginDate, endDate, active, fundingGoal } = await request.json();
    const project = await db.project.update({
        where: { id: Number(id) },
        data: { name, type, synopsis, description, techStack, beginDate, endDate, active, fundingGoal },
    });

    // need to return project(?) and status success/failed
    return project;
}

// DELETE
export async function deleteProject(request: Request) {
    const { id } = await request.json();
    const project = await db.project.delete({
        where: { id: Number(id) },
    });

    return project.id;
}

