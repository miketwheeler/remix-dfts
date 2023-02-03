import Grid2 from "@mui/material/Unstable_Grid2";
import {
	Box,
	Stack,
	Skeleton,
	Typography,
	Divider,
	Paper,
	makeStyles,
	createStyles,
    useTheme,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import React from "react";


interface PageProps<T> {
	title?: T;
	heading?: T;
	columnCount: number;
	rowCount: number;
	children?: React.ReactNode[];
}

const styles = {
    root: {
        flexGrow: 1,
        padding: 3,
		border: '1px dotted lightblue',
		height: '100%',
    },
    title: {
        marginBottom: 2,
    },
    heading: {
        marginBottom: 2,
    },
};


const GridColumn = ({ columnCount, rowCount, children }: { columnCount: number, rowCount: number, children: React.ReactNode[] }) => {
	// return (
		children.map((child, index) => {
			return (
				<Grid2 key={`grid-section-${index}`} xs={12 / columnCount}>
					{child}
				</Grid2>
			)
		})
	// );
};


// Generic Page Component
const GenericPage = <T extends string | number | []>({
        title,
        heading,
        columnCount,
        rowCount,
        children,
    }: PageProps<T>) => {
        // const theme = useTheme();

	return (
		<Box sx={styles.root}>
			{/* divide the entire body into columns & rows (as passed) */}
			
			{/* <Grid2 container spacing={3} sx={{border: '1px solid white'}}>
				{
					<GridColumn columnCount={columnCount} rowCount={rowCount} children={children} />
				}
			</Grid2>
			<Grid2 container spacing={3} sx={{border: '1px solid green'}}>
				<Grid2>
					<div>
						<p>This is a second section</p>
					</div>
				</Grid2>
			</Grid2> */}
			<Grid2 container spacing={3} xs={12} sx={{border: '1px solid red'}}>
			<Typography variant="h4" sx={styles.title}>{title}</Typography>
            <Typography variant="h5" sx={styles.heading}>{heading}</Typography>
				<Grid2 xs={6} sx={{border: '1px dotted white'}}>
					{/* {
						<GridColumn columnCount={columnCount} rowCount={rowCount} children={children} />
					} */}
				</Grid2>
				<Grid2 xs={6}  sx={{border: '1px dotted orange'}}>
					<p>This is a 2nd section</p>
				</Grid2>
			</Grid2>
		
		</Box>
	);
};

export default GenericPage;
