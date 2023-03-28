
import type { Decimal } from '@prisma/client/runtime';
import { db } from './db.server';


type CreateProjectForm = {
    name: string;
    type: string;
    synopsis: string;
    description: string;
    techStack: string;
    beginDate: string;
    endDate: string;
    active: boolean;
    fundingGoal: number;
    // category: any[];
    // team: string;
}



export async function createProject({ 
    name, type, synopsis, description, techStack, beginDate, endDate, active, fundingGoal,
}: CreateProjectForm) {
	// const passwordHash = await bcrypt.hash(password, 10);
    const newFundingGoal = Number(fundingGoal) * 1.00;
	const project = await db.project.create({
		data: { 
            name, 
            type, 
            synopsis, 
            description, 
            techStack, 
            beginDate, 
            endDate, 
            active, 
            fundingGoal: newFundingGoal, 
            // category,
            // team
        },
	});

	return { id: project.id, name };
}