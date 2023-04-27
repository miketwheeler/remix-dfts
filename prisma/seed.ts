import { PrismaClient } from '@prisma/client';

const prismadb = new PrismaClient();



async function seed() {
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

    const role1 = await prismadb.category.create({ 
        data: { name: 'Web Application' }
    })
    const role2 = await prismadb.category.create({ 
        data: { name: 'OS' }
    })
    const role3 = await prismadb.category.create({ 
        data: { name: 'Mobile Application' }
    })
    const role4 = await prismadb.category.create({ 
        data: { name: 'Database' }
    })
    const role5 = await prismadb.category.create({ 
        data: { name: 'Other' }
    })
    const role6 = await prismadb.category.create({ 
        data: { name: 'Website' }
    })
    const role7 = await prismadb.category.create({ 
        data: { name: 'Game' }
    })
    const role8 = await prismadb.category.create({ 
        data: { name: 'Desktop Application' }
    })
    const role9 = await prismadb.category.create({ 
        data: { name: 'API' }
    })
    const role10 = await prismadb.category.create({ 
        data: { name: 'Data Software' }
    })
    const role11 = await prismadb.category.create({ 
        data: { name: 'Security' }
    })
    const role12 = await prismadb.category.create({ 
        data: { name: 'Cloud' }
    })
    const role13 = await prismadb.category.create({ 
        data: { name: 'DevOps' }
    })
    const role14 = await prismadb.category.create({ 
        data: { name: 'Testing' }
    })
    const role15 = await prismadb.category.create({ 
        data: { name: 'Dashboard' }
    })
    const role17 = await prismadb.category.create({ 
        data: { name: 'Machine Learning' }
    })
    const role18 = await prismadb.category.create({ 
        data: { name: 'AI' }
    })
    const role19 = await prismadb.category.create({ 
        data: { name: 'AR' }
    })
    const role20 = await prismadb.category.create({ 
        data: { name: 'VR' }
    })
    const role21 = await prismadb.category.create({ 
        data: { name: 'IoT' }
    })
    const role22 = await prismadb.category.create({ 
        data: { name: 'Blockchain' }
    })
    const role23 = await prismadb.category.create({ 
        data: { name: 'Robotics' }
    })
    const role24 = await prismadb.category.create({ 
        data: { name: 'Hardware' }
    })
    const role25 = await prismadb.category.create({ 
        data: { name: 'Firmware' }
    })
    const role26 = await prismadb.category.create({ 
        data: { name: 'Embedded' }
    })
    const role27 = await prismadb.category.create({ 
        data: { name: 'SaaS' }
    })
    const role28 = await prismadb.category.create({ 
        data: { name: 'PaaS' }
    })
    const role29 = await prismadb.category.create({ 
        data: { name: 'CMS' }
    })
    const role30 = await prismadb.category.create({ 
        data: { name: 'LLM plugin' }
    })
    const role31 = await prismadb.category.create({ 
        data: { name: 'LLM' }
    })


    const skill1 = await prismadb.skill.create({ 
        data: { name: 'React' }
    })
    const skill2 = await prismadb.skill.create({ 
        data: { name: 'javascript' }
    })
    const skill3 = await prismadb.skill.create({ 
        data: { name: 'python' }
    })
    const skill4 = await prismadb.skill.create({ 
        data: { name: 'frontend' }
    })
    const skill5 = await prismadb.skill.create({ 
        data: { name: 'backend' }
    })
    const skill6 = await prismadb.skill.create({ 
        data: { name: 'full stack' }
    })
    const skill7 = await prismadb.skill.create({ 
        data: { name: 'SQL' }
    })
    const skill8 = await prismadb.skill.create({ 
        data: { name: 'C#' }
    })
    const skill9 = await prismadb.skill.create({ 
        data: { name: 'typescript' }
    })
    const skill10 = await prismadb.skill.create({ 
        data: { name: 'Rust' }
    })
    const skill11 = await prismadb.skill.create({ 
        data: { name: 'golang' }
    })
    const skill12 = await prismadb.skill.create({ 
        data: { name: 'game dev' }
    })
    const sklll13 = await prismadb.skill.create({ 
        data: { name: 'remix' }
    })
    const sklll14 = await prismadb.skill.create({ 
        data: { name: 'project management' }
    })
    const sklll15 = await prismadb.skill.create({ 
        data: { name: 'UI' }
    })
    const sklll16 = await prismadb.skill.create({ 
        data: { name: 'UX/EX' }
    })
    const sklll17 = await prismadb.skill.create({ 
        data: { name: 'HTML' }
    })
    const sklll18 = await prismadb.skill.create({ 
        data: { name: 'CSS' }
    })
    const sklll19 = await prismadb.skill.create({ 
        data: { name: 'SASS/Preprocessors' }
    })
    const sklll20 = await prismadb.skill.create({ 
        data: { name: 'Material UI' }
    })
    const sklll21 = await prismadb.skill.create({ 
        data: { name: 'Bootstrap' }
    })
    const sklll22 = await prismadb.skill.create({ 
        data: { name: 'React Native' }
    })
    const sklll23 = await prismadb.skill.create({ 
        data: { name: 'Flutter' }
    })
    const sklll24 = await prismadb.skill.create({ 
        data: { name: 'Swift' }
    })
    const sklll25 = await prismadb.skill.create({ 
        data: { name: 'Android' }
    })


    console.log({ 
        haily, scheffield, ezra, osgood, audrey, adele, kasey, hi, dulcie, sofie, odele, kizzie, luelle, claybourne, oliver, roselle,
        role1, role2, role3, role4, role5, role6, role7, role8, role9, role10, role11, role12, role13, role14, role15, role17, role18, role19, role20, role21, role22, role23, role24, role25, role26, role27, role28, role29, role30, role31,
        skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, sklll13, sklll14, sklll15, sklll16, sklll17, sklll18, sklll19, sklll20, sklll21, sklll22, sklll23, sklll24, sklll25
    })
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



