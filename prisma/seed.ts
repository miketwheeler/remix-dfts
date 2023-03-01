import { PrismaClient } from '@prisma/client';
const prismadb = new PrismaClient();


async function seed() {
    const alice = await prismadb.user.upsert({
        where: { email: 'awonder@gmail.com' },
        update: {},
        create: {
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'awonder@gmail.com',
            username: "awonder",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Full Stack Developer",
            available: true,
            bio: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
            skills: {
                create: { name: "JavaScript" }
            },
            teams: {
                create: { 
                    name: "Zoolab",
                    projects: {
                        create: {
                            name: "Solarbreeze",
                            type: "iOS App",
                            synopsis: "Lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet",
                            description: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat duis nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam",
                            techStack: "C, Swift, html, css, Python",
                            beginDate: new Date("2023-08-27 12:00:00"),
                            endDate: new Date("2024-01-01 12:00:00"),
                            active: true,
                            milestone: 1,
                            deployed: false,
                            funded: false,
                            fundingGoal: 1048234.00,
                            fundingCurrent: 0.00,
                            category: {
                                create: [
                                    { name: "Mobile App" },
                                    { name: "iOS" },
                                ]
                            }
                        }
                    },
                }
            },
            posts: {
                create: [
                    { 
                        title: "Prisma Day 2020", 
                        body: "This is a post body for prisma day post!" 
                    },
                    {
                        title: "How to write a Prisma schema",
                        body: "This is a post body for prisma schema 'how to write' post!"
                    }
                ]
            }
        },
    })
    console.log({ alice })
}

seed()
    .then(async () => {
        await prismadb.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismadb.$disconnect();
        process.exit(1);
    });