// import { Skeleton } from "@mui/material";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";

import { getProject } from "~/utils/display.server";

import { db } from "~/utils/db.server";


// export const meta: MetaFunction<typeof loader> = ({ data }) => {
// 	if (!data) {
// 		return {
// 			title: "No User Here",
// 			description: "No users found",
// 		};
// 	}
// 	return {
// 		title: `"${data.joke.name}" joke`,
// 		description: `Enjoy the "${data.joke.name}" joke and much more`,
// 	};
// };

export const loader = async ({ params }: LoaderArgs) => {
    // all project data
    const project = await getProject({ id: Number(params.id) });
	
    // var teamMembersList;
    
    // if the project does not exist, throw a 404 error
	if (!project) {
		throw new Response("What a joke! User not found.", { status: 404 });
	}
    // else: try to get the rest of this project's info for display
    // else {
    //     try {
    //         // project's team members: retrieve the members of this project's team
    //         const getTeamMembersList = await db.project.findUnique({
    //             where: { id: Number(params.id) },
    //             select: { 
    //                 team: {
    //                     select: {
    //                         members: {
    //                             select: {
    //                                 username: true,
    //                             }
    //                         },
    //                     }
    //                 }
    //             },
    //         });
    //         teamMembersList = getTeamMembersList
    //         // teamMembersList = (getTeamMembersList !== null) ? getTeamMembersList : ["No team members found"];
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }        
    // }
    
	return json({ 
        project, 
        // teamMembersList, 
    });
};

export default function ProjectIdRoute() {
	const data = useLoaderData<typeof loader>();

	return ( 
        <DetailsCard 
            heading={data.project.name}
            active={data.project.active}
            devType={data.project.type}
            activeSince={data.project.beginDate}
            // teamsOn={data.teamList.length}
            // projectsOn={data.teamList.map(team => team.projects.length).reduce((a, b) => a + b, 0)}
            // rating={data.user.rating}
            stack={data.project.techStack}
            bio={data.project.synopsis}
        />
    )
}

export function CatchBoundary() {
	const caught = useCatch();
	// const params = useParams();
	switch (caught.status) {
		case 400: {
			return (
				<div className="error-container">
					What you're trying to do is not allowed.
				</div>
			);
		}
		case 404: {
			return (
				<div className="error-container">
					Seems that user does not exist.
				</div>
			);
		}
		case 403: {
			return (
				<div className="error-container">
					This asset does not belong to you.
				</div>
			);
		}
		default: {
			throw new Error(`Unhandled error: ${caught.status}`);
		}
	}
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	// const { id } = useParams();
	return (
		<div>
            {`There was an error loading that user's info. Please try again later.`}
        </div>
	);
}
