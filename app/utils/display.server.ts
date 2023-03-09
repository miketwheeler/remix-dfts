import { db } from './db.server';
// import { requireUserSession } from './session.server';


export async function getMemberList(request: Request) {
    const memberList = await db.user.findMany({
        take: 16,
        select: { id: true, username: true, devType: true, skills: true, available: true },
    });
    return memberList;
}

// export async function getMember(request: Request) {
//     const member = await db.user.findUnique({
//         where: { id: request.params.id },
//         select: { id: true, username: true, devType: true, skills: true, available: true },
//     });
//     return member;
// }