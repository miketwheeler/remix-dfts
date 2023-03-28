// import { Skeleton } from "@mui/material";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";

import { getUsersTeamData } from "~/utils/display.server";
import { getUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";




export const loader = async ( { request }: LoaderArgs) => {
    const userId = await getUserId(request);
    let userTeamData;
    if(userId)
        userTeamData = await getUsersTeamData(userId);
    // if the user does not have any associate teams or there isn't a userId,
    //      throw a 404 error --> needs to send back error message only
	if (!userId || !userTeamData) {
		throw new Response("You don't have any teams right now, be sure to assign the team you're on or you've created to get this project rolling.", { status: 404 });
	}
    
	return json({ userId, userTeamData });
};



export default function UsersTeamPicker({ props }: any) {
	const data = useLoaderData<typeof loader>();
    const { detailsCardType } = useOutletContext<{ detailsCardType: number }>();

	return ( 
        <>
            <div> 
                This is returned from the TEAMS PICK component:
                { JSON.stringify(data, null, 4)}
            </div>
        </>
        // <DetailsCard 
        //     type={detailsCardType}
        //     heading={data.project.name}
        //     active={data.project.active}
        //     projectType={data.project.type}
        //     activeSince={data.project.beginDate}
        //     stack={data.project.techStack}
        //     bio={data.project.synopsis}
        // />
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
            {`There was an error loading that data. Please try again later.`}
        </div>
	);
}
