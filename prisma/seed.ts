import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();


async function seed() {
    await Promise.all(
        getUsers().map((user) => db.user.create({ data: user }))
    );
    await Promise.all(
        getProjects().map((project) => db.project.create({ data: project }))
    )
}


seed();

function getUsers() {
    return [
        {
            name: 'Alice',
            email: 'alice@wonderland.com',
            password: 'password',
        },
        {
            name: 'Bob',
            email: 'bob@gmail.com',
            password: 'password2',
        },
        {
            name: 'Charlie',
            email: 'charlierubble@gmail.com',
            password: 'password3',
        },
    ];
};

function getProjects() {
    return [
        {
            name: 'Project 1',
            description: 'This is a project - #1',
            synopsis: 'This is a synopsis for project 1',
            active: false,
            progress: 0,
        }
    ];
};