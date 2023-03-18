import { Skeleton } from "@mui/material";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";

import DetailsCard from "~/components/reusable-components/minor/DetailsCard";

import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

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
    const skillList = await db.skills.findMany({
        where: { 
            users : { 
                some: { id: params.id  }    
            } 
        },
        select: { name: true },
    })

    const teamList = await db.team.findMany({
        where: { members : { some: { id: params.id } } },
        select: { name: true, id: true, projects: true },
    })

    // const teamIdList = teamList.map(team => team.id);
    // const quantityProjects = ;

    // TODO: finish query for the user's projects (look up the fluentAPI for single pass unique queries!)
    // const latestProject = await db.project.findMany({
    //     where: { 
    //         team: { 
    //             is: { id: teamIdList[-1] } 
    //         } 
    //     },
    // });

	const user = await db.user.findUnique({
		where: { id: params.id },
        select: { 
            username: true, 
            available: true, 
            devType: true, 
            createdAt: true, 
            rating: true, 
            bio: true,
        }
	});
	if (!user) {
		throw new Response("What a joke! User not found.", { status: 404 });
	}
	return json({ 
        user, 
        skillList, 
        teamList, 
        // quantityProjects, 
        // latestProject 
    });
};

// export const action = async ({ params, request }: ActionArgs) => {
// 	const user = await db.user.findUnique({
// 		where: { id: params.memberId },
// 	});
// 	if (!user) {
// 		throw new Response("Can't delete what does not exist", {
// 			status: 404,
// 		});
// 	}

// 	return redirect("/memberhall");
// };

export default function MemberIdRoute() {
	const data = useLoaderData<typeof loader>();

	return ( 
        <DetailsCard 
            heading={data.user.username}
            availability={data.user.available}
            devType={data.user.devType}
            activeSince={data.user.createdAt}
            teamsOn={data.teamList.length}
            // projectsOn={data.}
            rating={data.user.rating}
            skills={data.skillList}
            bio={data.user.bio}
        />
    )
}

export function CatchBoundary() {
	const caught = useCatch();
	const params = useParams();
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
	const { id } = useParams();
	return (
		<div>
            {`There was an error loading that user's info. Please try again later.`}
        </div>
	);
}
