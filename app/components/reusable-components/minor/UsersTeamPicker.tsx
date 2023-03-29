// import { Skeleton } from "@mui/material";
// import type { ActionArgs, LoaderArgs, MetaFunction } from "@ remix-run/node";
// import { json, redirect } from "@remix-run/node";
import { Form, useCatch } from "@remix-run/react";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";




export default function UsersTeamPicker({ props }: any) {
	const usersTeamData = props;
    
	return ( 
        <Form method="get">
            <div style={{ display: 'flex', position: 'fixed', top: 100, right: 40, maxWidth: 300,}}> 
                This is returned from the TEAMS PICK component:
                { JSON.stringify(usersTeamData, null, 4)}
            </div>
        </Form>
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
