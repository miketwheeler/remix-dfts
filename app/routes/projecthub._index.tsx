import { Box, Skeleton, Stack } from "@mui/material";
import { useCatch } from "@remix-run/react";


const styles = {
    skeletonContainerStyles: { display: { sm: 'none' , md: 'flex'} },
    skeletonHeaderStyles: { fontSize: '2rem', borderRadius: 2 },
    skeletonFistSectionStyles: { display: 'flex', flexBasis: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' },
    skeletonHalfRectangleStyles: { width: '60%', borderRadius: 2 },
    skeletonRectangleStyles: { borderRadius: 2}
}


export default function MemberhallIndexRoute() {
	return (
		<Stack spacing={1} sx={styles.skeletonContainerStyles} >
			<Skeleton animation={false} variant="text" sx={styles.skeletonHeaderStyles} />
			<Box sx={styles.skeletonFistSectionStyles}>
				<Skeleton animation={false} variant="rectangular" height={120} sx={styles.skeletonHalfRectangleStyles}/>
				<Skeleton animation={false} variant="circular" width={120} height={120} />
			</Box>
			<Skeleton animation={false} variant="rectangular" height={100} sx={styles.skeletonRectangleStyles}/>
			<Skeleton animation={false} variant="rectangular" height={100} sx={styles.skeletonRectangleStyles}/>
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
