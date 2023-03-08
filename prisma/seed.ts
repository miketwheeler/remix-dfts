import { PrismaClient } from '@prisma/client';
const prismadb = new PrismaClient();


// async function seed() {
//     const alice = await prismadb.user.upsert({
//         where: { email: 'awonder@gmail.com' },
//         update: {},
//         create: {
//             firstName: 'Alice',
//             lastName: 'Wonder',
//             email: 'awonder@gmail.com',
//             username: "awonder",
//             // this is a hashed version of "twixrox"
//             passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
//             devType: "Full Stack Developer",
//             available: true,
//             bio: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
//             skills: {
//                 create: { name: "JavaScript" }
//             },
//             teams: {
//                 create: { 
//                     name: "Zoolab",
//                     projects: {
//                         create: {
//                             name: "Solarbreeze",
//                             type: "iOS App",
//                             synopsis: "Lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet",
//                             description: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat duis nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam",
//                             techStack: "C, Swift, html, css, Python",
//                             beginDate: new Date("2023-08-27 12:00:00"),
//                             endDate: new Date("2024-01-01 12:00:00"),
//                             active: true,
//                             milestone: 1,
//                             deployed: false,
//                             funded: false,
//                             fundingGoal: 1048234.00,
//                             fundingCurrent: 0.00,
//                             category: {
//                                 create: [
//                                     { name: "Mobile App" },
//                                     { name: "iOS" },
//                                 ]
//                             }
//                         }
//                     },
//                 }
//             },
//             posts: {
//                 create: [
//                     { 
//                         title: "Prisma Day 2020", 
//                         body: "This is a post body for prisma day post!" 
//                     },
//                     {
//                         title: "How to write a Prisma schema",
//                         body: "This is a post body for prisma schema 'how to write' post!"
//                     }
//                 ]
//             }
//         },
//     })
//     console.log({ alice })
// }

// seed()
//     .then(async () => {
//         await prismadb.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prismadb.$disconnect();
//         process.exit(1);
//     });

async function seedUsers() {
    const roselle = await prismadb.user.upsert({
        where: { email: 'rantoniazzi0@comcast.net' },
        update: {},
        create: {
            firstName: 'Roselle',
            lastName: 'Antoniazzi',
            email: 'rantoniazzi0@comcast.net',
            username: "rantoniazzi0",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "VP Accounting",
            available: false,
            bio: "ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const claybourne = await prismadb.user.upsert({
        where: { email: 'csnufflebottom1@desdev.cn' },
        update: {},
        create: {
            firstName: 'Claybourne',
            lastName: 'Snufflebottom',
            email: 'csnufflebottom1@desdev.cn',
            username: "csnufflebottom1",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Sales Representative",
            available: true,
            bio: "dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const luelle = await prismadb.user.upsert({
        where: { email: 'lbolingbroke2@bizjournals.com' },
        update: {},
        create: {
            firstName: 'Luelle',
            lastName: 'Bolingbroke',
            email: 'lbolingbroke2@bizjournals.com',
            username: "lbolingbroke2",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "VP Accounting",
            available: true,
            bio: "orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const oliver = await prismadb.user.upsert({
        where: { email: 'opostins3@state.gov' },
        update: {},
        create: {
            firstName: 'Oliver',
            lastName: 'Postins',
            email: 'opostins3@state.gov',
            username: "opostins3",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Account Executive",
            available: true,
            bio: "vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const kizzie = await prismadb.user.upsert({
        where: { email: 'kjordine4@wikia.com' },
        update: {},
        create: {
            firstName: 'Kizzie',
            lastName: 'Jordine',
            email: 'kjordine4@wikia.com',
            username: "kjordine4",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Nuclear Power Engineer",
            available: true,
            bio: "nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const odele = await prismadb.user.upsert({
        where: { email: 'oheyfield5@shutterfly.com' },
        update: {},
        create: {
            firstName: 'Odele',
            lastName: 'Heyfield',
            email: 'oheyfield5@shutterfly.com',
            username: "oheyfield5",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Sales Representative",
            available: true,
            bio: "molestie lorem quisque ut erat curabitur gravida nisi at nibh in",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const sofie = await prismadb.user.upsert({
        where: { email: 'sgaunson6@blogspot.com' },
        update: {},
        create: {
            firstName: 'Sofie',
            lastName: 'Gaunson',
            email: 'sgaunson6@blogspot.com',
            username: "sgaunson6",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Staff Scientist",
            available: true,
            bio: "nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const dulcie = await prismadb.user.upsert({
        where: { email: 'dpraten7@google.es' },
        update: {},
        create: {
            firstName: 'Dulcie',
            lastName: 'Praten',
            email: 'dpraten7@google.es',
            username: "dpraten7",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Sales Representative",
            available: true,
            bio: "vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const hi = await prismadb.user.upsert({
        where: { email: 'hminguet8@sakura.ne.jp' },
        update: {},
        create: {
            firstName: 'Hi',
            lastName: 'Minguet',
            email: 'hminguet8@sakura.ne.jp',
            username: "hminguet8",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Sales Representative",
            available: true,
            bio: "varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const kasey = await prismadb.user.upsert({
        where: { email: 'kourtic9@geocities.jp' },
        update: {},
        create: {
            firstName: 'Kasey',
            lastName: 'Ourtic',
            email: 'kourtic9@geocities.jp',
            username: "kourtic9",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Associate Professor",
            available: true,
            bio: "orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const haily = await prismadb.user.upsert({
        where: { email: 'hcrona@elegantthemes.com' },
        update: {},
        create: {
            firstName: 'Haily',
            lastName: 'Cron',
            email: 'hcrona@elegantthemes.com',
            username: "hcrona",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Sales Representative",
            available: true,
            bio: "nam nulla integer pede justo lacinia eget tincidunt eget tempus",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const scheffield = await prismadb.user.upsert({
        where: { email: 'ssmerdonb@imageshack.us' },
        update: {},
        create: {
            firstName: 'Sheffield',
            lastName: 'Smerdon',
            email: 'ssmerdonb@imageshack.us',
            username: "ssmerdonb",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Editor",
            available: true,
            bio: "vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const ezra = await prismadb.user.upsert({
        where: { email: 'ekieranc@bigcartel.com' },
        update: {},
        create: {
            firstName: 'Ezra',
            lastName: 'Kieran',
            email: 'ekieranc@bigcartel.com',
            username: "ekieranc",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Marketing Assistant",
            available: true,
            bio: "interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const osgood = await prismadb.user.upsert({
        where: { email: 'oescudierd@europa.eu' },
        update: {},
        create: {
            firstName: 'Osgood',
            lastName: 'Escudier',
            email: 'oescudierd@europa.eu',
            username: "oescudierd",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Editor",
            available: true,
            bio: "aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const audrey = await prismadb.user.upsert({
        where: { email: 'aliggette@paypal.com' },
        update: {},
        create: {
            firstName: 'Audrey',
            lastName: 'Liggett',
            email: 'aliggette@paypal.com',
            username: "aliggette",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Editor",
            available: false,
            bio: "ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    const adele = await prismadb.user.upsert({
        where: { email: 'asotworthf@barnesandnoble.com' },
        update: {},
        create: {
            firstName: 'Adele',
            lastName: 'Sotworth',
            email: 'asotworthf@barnesandnoble.com',
            username: "asotworthf",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Editor",
            available: true,
            bio: "dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus",
            // rating: 1.0,
            // skills: ASSSIGN
        },
    })
    console.log({ haily, scheffield, ezra, osgood, audrey, adele, kasey, hi, dulcie, sofie, odele, kizzie, luelle, claybourne, oliver, roselle })
}

seedUsers()
    .then(async () => {
        await prismadb.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismadb.$disconnect();
        process.exit(1);
    });



