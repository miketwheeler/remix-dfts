// import { Skeleton } from "@mui/material";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";

import { getProjectDetail } from "~/utils/display.server";

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
    const project = await getProjectDetail({ id: params.id ?? ""});

    // if the project does not exist, throw a 404 error
	if (!project) {
		throw new Response("No projects found! Create one!", { status: 404 });
	}
    
	return json({ project });
};

export default function ProjectIdRoute({ props }: any) {
	const data = useLoaderData<typeof loader>();
    const { detailsCardType } = useOutletContext<{ detailsCardType: string }>();
	const deliverProps = props;

	return ( 
        <DetailsCard 
			props={{ 
				type: detailsCardType,
				heading: data.project.name,
				availability: data.project.active,
				projectType: data.project.type,
				beginDate: data.project.beginDate,
				endDate: data.project.endDate,
				stack: data.project.techStack,
				description: data.project.description,
				milestone: data.project.milestone,
			}}
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
					Seems that project does not exist.
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
