import { Box, Skeleton, Stack } from "@mui/material";


const styles = {
    skeletonContainerStyles: { display: { sm: 'none' , md: 'flex'} },
    skeletonHeaderStyles: { fontSize: '2rem', borderRadius: 2 },
    skeletonFistSectionStyles: { display: 'flex', flexBasis: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' },
    skeletonHalfRectangleStyles: { width: '60%', borderRadius: 2 },
    skeletonRectangleStyles: { borderRadius: 2}
}


export default function SkeletonDetails() {
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
