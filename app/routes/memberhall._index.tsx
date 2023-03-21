import { Box, Skeleton, Stack } from "@mui/material";
import { useCatch } from "@remix-run/react";
// import DetailsCard from "~/components/reusable-components/minor/DetailsCard";



export default function MemberhallIndexRoute() {
	return (
		<Stack spacing={1} sx={{ display: { sm: 'none' , md: 'flex'} }} >
			<Skeleton animation={false} variant="text" sx={{ fontSize: '2rem', borderRadius: 2 }} />
			<Box sx={{ display: 'flex', flexBasis: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
				<Skeleton animation={false} variant="rectangular"  height={120} sx={{ width: '60%', borderRadius: 2 }}/>
				<Skeleton animation={false} variant="circular" width={120} height={120} />
			</Box>
			<Skeleton animation={false} variant="rectangular"  height={100} sx={{ borderRadius: 2 }}/>
			<Skeleton animation={false} variant="rectangular"  height={100} sx={{ borderRadius: 2 }}/>
		</Stack>
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
