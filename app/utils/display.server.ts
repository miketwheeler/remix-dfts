// import { Params } from '@remix-run/react';
import { db } from './db.server';
// import { requireUserSession } from './session.server';


export async function getMemberList(request: Request) {
    const memberList = await db.user.findMany({
        take: 16,
        select: { id: true, username: true, devType: true, skills: true, available: true },
    });
    return memberList;
}

export async function getMember( params: { id: any; }) {
    const member = await db.user.findUnique({
        where: { id: params.id },
        select: { id: true, username: true, devType: true, skills: true, available: true },
    });
    return member;
}


export async function getProjectList(request: Request) {
    const projectList = await db.project.findMany({
        take: 16,
        select: { id: true, name: true, type: true, synopsis: true, techStack: true, active: true, beginDate: true, endDate: true },
    });
    return projectList;
}
