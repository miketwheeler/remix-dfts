// import { Params } from '@remix-run/react';
import { db } from './db.server';
// import { requireUserSession } from './session.server';
import { getUserId } from './session.server';

// GET MEMEBER DATA
export async function getMemberList(request: Request) {
    const memberList = await db.user.findMany({
        take: 16,
        select: { id: true, username: true, devType: true, skills: true, available: true },
    });
    return memberList;
}

export async function getMember( params: { id: string }) {
    const member = await db.user.findUnique({
        where: { id: params.id },
        select: { id: true, username: true, devType: true, skills: true, available: true },
    });
    return member;
}

// GET PROJECT DATA
export async function getProjectList(request: Request) {
    const projectList = await db.project.findMany({
        take: 16,
        select: { id: true, name: true, type: true, synopsis: true, techStack: true, active: true, beginDate: true, endDate: true },
    });
    return projectList;
}

export async function getProject( params: { id: number }) {
    const project = await db.project.findUnique({
        where: { id: Number(params.id) },
        select: { id: true, name: true, type: true, synopsis: true, techStack: true, active: true, beginDate: true, endDate: true },
    }); 
    return project;
}

// GET TEAM DATA
export async function getUsersTeamData(request: Request) {
    const userId = await getUserId(request);
    let usersTeams;
    let teamsUserIsLead;
    // console.log("userId: ", userId)
    if(userId) {
        usersTeams = await db.user.findUnique({
            where: { id: userId },
            select: { username: true, teams: true }
        });
    }
    if (usersTeams) {
        teamsUserIsLead = await getTeamLeadInfo(usersTeams);
    }
    return ({usersTeams, teamsUserIsLead, userId});
}

async function getTeamLeadInfo(usersTeams: any) {
    let teamsAssociated: any[] = [];
    let asLeadUsername;

    for (let i = 0; i < usersTeams.teams.length; i++) {
        const teamIdWhereUsernameIsTeamLead = usersTeams.teams[i].teamLeadId;
        const asLeadTeamName = usersTeams.teams[i].name;
        asLeadUsername = await db.user.findUnique({
            where: { id: teamIdWhereUsernameIsTeamLead },
            select: { username: true }
        })
        teamsAssociated.push({asLeadTeamName, asLeadUsername});
    }
    return {teamsAssociated};
}

// async function setProjectTeam( id: string ) {
//     const project = await db.project.findUnique({
//         where: { id },
//         select: { teamLeadId: id }
//     });
//     return team;
// }