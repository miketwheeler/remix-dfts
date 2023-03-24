import { useCatch } from "@remix-run/react";
import SkeletonDetails from "~/components/reusable-components/minor/SkeletonDetails";



export default function MemberhallIndexRoute() {
	return (
		<SkeletonDetails />
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	if (caught.status >= 401) {
		return (
			<div className="error-container">
				There are no users to display.
			</div>
		);
	}
	throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// error boundary handles errors in the Joke index route
export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	return <div className="error-container">I did a whoopsies.</div>;
}
