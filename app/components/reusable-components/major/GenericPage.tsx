import Grid from "@mui/material/Unstable_Grid2";
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
import GridColumn from "./GridColumn";



interface PageProps {
	title?: string;
	heading?: string;
	columnWidths: number[];
	children: Array<any>;
}


const styles = {
    root: {
        flexGrow: 1,
        padding: '3rem',
		// border: '1px dotted lightblue',
		height: '100%',
		width: '100%',
		border: '1px dashed yellow'
    },
    title: {
        marginBottom: 2,
    },
    heading: {
        marginBottom: 2,
    },
};


// Generic Page Component
const GenericPage: React.FC<PageProps> = ({ title, heading, columnWidths, children }) => {
	return (
		<>
			{
				columnWidths.map((columnWidth, index) => (
					<React.Fragment key={`column-${index}`}>
						<h5>Hello</h5>
						<GridColumn columnWidth={columnWidth} children={children[index]} />
						{/* <p>{children[0].title}</p> */}
					</React.Fragment>
				))
			}
		</>
		// <Box sx={styles.root}>
		// {/* <div style={{height: '100%', width: '100%', border: '1px solid yellow', padding: '3rem'}}> */}
		// 	<h4>{title}</h4>
		// 	<h5>{heading}</h5>
		// 	<Grid container xs={4} spacing={3} sx={{border: '1px solid white'}}>
		// 		<GridColumn columnWidth={columnWidth} children={children} />
		// 		<GridColumn columnWidth={columnWidth} children={children} />
		// 	</Grid>
		// {/* </div> */}
		// </Box>
	);
};


export default GenericPage;
