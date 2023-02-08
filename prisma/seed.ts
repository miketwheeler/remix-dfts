import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();


async function seed() {
    // await Promise.all(
    //     getRoles().map((role) => db.role.create({ data: role }))
    // );
    await Promise.all(
        getUsers().map((user) =>  db.user.create({ data: user }))
    );
    await Promise.all(
        getProjects().map((project) => db.project.create({ data: project }))
    )
    // await Promise.all(
    //     getTeams().map((team) => db.team.create({ data: team }))
    // )
}


seed();

// function getRoles() {
//     return [
//         {
//             name: 'Admin',
//         },
//         {
//             name: 'User',
//         },
//         {
//             name: 'Guest',
//         },
//     ];
// }

// function getTeams() {
//     return [
//         {
//             name: "Zoolab",
//         },
//         {
//             name: "Veritas",
//         },
//     ]
// }


function getUsers() {
    return [
        {
            name: 'Alice',
            email: 'alice@wonderland.com',
            username: "aliwonder",
            // this is a hashed version of "twixrox"
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Full Stack Developer",
            available: true,
            bio: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
        },
        {
            name: 'Bob',
            email: 'bob@gmail.com',
            username: "bobbob",
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Full Stack Developer",
            available: true,
            bio: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
        },
        {
            name: 'Charlie',
            email: 'charlierubble@gmail.com',
            username: "charlubble",
            passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
            devType: "Full Stack Developer",
            available: true,
            bio: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis",
        },
    ];
};

function getProjects() {
    return [
        {
            name: "Solarbreeze",
            type: "iOS App",
            synopsis: "Lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet",
            description: "Ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris",
            techStack: "WINS",
            beginDate: "10/10/2023",
            endDate: "09/07/2024",
            active: true,
            milestone: 4,
            deployed: true,
            funded: false,
            fundingGoal: "685421.20",
            fundingCurrent: "6420.00",
            category: "Security Solution",
        },
        {
            name: "Lam Tam",
            type: "Platform Ambiguous",
            synopsis: "Facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit",
            description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus",
            techStack: "LAMP",
            beginDate: "03/13/2023",
            endDate: "11/21/2023",
            active: true,
            milestone: 3,
            deployed: false,
            funded: false,
            fundGoal: "700453.08",
            fundingCurrent: "0.00",
            category: "Application"
        },
        {
            name: "Ital",
            type: "DevOps Solution",
            synopsis: "Et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent",
            description: "Congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa",
            techStack: "LAMP",
            beginDate: "04/28/2023",
            endDate: "09/07/2023",
            active: false,
            milestone: 0,
            deployed: false,
            funded: false,
            fundingGoal: "0.00",
            fundingCurrent: "0.00",
            category: "Application"
        },
        {
            name: "Zathin",
            type: "Security Solution",
            synopsis: "Consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus",
            description: "Sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo",
            techStack: "MERN",
            beginDate: "09/30/2021",
            endDate: "05/23/2022",
            active: true,
            milestone: 1,
            deployed: false,
            funded: false,
            fundingGoal: "1893726.53",
            fundingCurrent: "1043.20",
            category: "Application"
        },
        {
            name: "Alphazap",
            type: "Package",
            synopsis: "Aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh",
            description: "Orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
            techStack: "MERN",
            beginDate: "07/20/2022",
            endDate: "12/08/2021",
            active: false,
            milestone: 1,
            deployed: false,
            funded: true,
            fundingGoal: "992737.46",
            fundingCurrent: "0.00",
            category: "Framework"
        },
        {
            name: "Holdlamis",
            type: "Website",
            synopsis: "Enim leo rhoncus sed vestibulum sit amet cursus id turpis",
            description: "Aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus",
            techStack: "MEAN",
            beginDate: "04/06/2022",
            endDate: "06/25/2022",
            active: true,
            milestone: 1,
            deployed: false,
            funded: true,
            fundingGoal: "1996860.22",
            fundingCurrent: "22430.10",
            category: "Website"
        },
        {
            name: "Lotlux",
            type: "Language",
            synopsis: "Quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
            description: "Urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis",
            techStack: "MEAN",
            beginDate: "07/02/2021",
            endDate: "03/25/2022",
            active: true,
            milestone: 3,
            deployed: false,
            funded: false,
            fundingGoal: "1133386.50",
            fundingCurrent: "33005.32",
            category: "Website"
        },
        {
            name: "Alpha",
            type: "Windows OS app",
            synopsis: "Velit id pretium iaculis diam erat fermentum justo nec condimentum neque",
            description: "Aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus",
            techStack: "WINS",
            beginDate: "08/15/2022",
            endDate: "05/12/2022",
            active: false,
            milestone: 2,
            deployed: false,
            funded: true,
            fundingGoal: "1706600.76",
            fundingCurrent: "0.00",
            category: "Application"
        },
        {
            name: "Greenlam",
            type: "Android",
            synopsis: "Penatibus et magnis dis parturient montes nascetur ridiculus mus",
            description: "Duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna",
            techStack: "MERN",
            beginDate: "12/12/2021",
            endDate: "06/16/2022",
            active: true,
            milestone: 1,
            deployed: true,
            funded: false,
            fundingGoal: "484611.99",
            fundingCurrent: "44.65",
            category: "Tooling"
        },
        {
            name: "Biodex",
            type: "Framework",
            synopsis: "Vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor",
            description: "Morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer",
            techStack: "MEAN",
            beginDate: "02/17/2022",
            endDate: "11/11/2021",
            active: true,
            milestone: 2,
            deployed: true,
            funded: true,
            fundingGoal: "1855606.69",
            fundingCurrent: "506782.93",
            category: "Application"
        },
    ];
};

