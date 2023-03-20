import Grid from "@mui/material/Unstable_Grid2";
import {
	Box,
	Stack,
	Skeleton,
	Typography,
	Divider,
} from "@mui/material";
// import type { Theme } from "@mui/material/styles";
import React from "react";
import GridColumn from "./LayoutGridColumn";



// Specs column widths and children to render - passed to column component as props
interface PageProps {
	// title?: string;
	// heading?: string;
	columnWidths: number[];
	children: Array<any> | [[any]];
}

// styles for the root page's container - all content (and grid) will be contained within this
const styles = {
    root: {
        flexGrow: 1,
        padding: '.5rem',
		paddingLeft: '1rem', // added due to negative margins on grid container (w/o it, leading edge is butted to menu)
    },
};


// Page Component Layout
const LayoutPage: React.FC<PageProps> = ({ columnWidths, children }) => {
	return (
		<Box sx={styles.root}>
			<Grid container xs={12} spacing={2} sx={{ mx: 'auto'}}>
				{
					children[0][0] !== undefined
					?
					// if children are separate components altogether, children will be an array dataset arrays
					columnWidths.map((columnWidth, index) => (
						<Grid key={`column-${index}`} xs={12} md={columnWidth}>
							<GridColumn children={children[index][0]} />
						</Grid>
					))
					:
					children 
					?
					columnWidths.map((columnWidth, index) => (
						<Grid key={`column-${index}`} xs={12} md={columnWidth}>
							<GridColumn children={children[index]} />
						</Grid>
					))
					:
					<Box sx={styles.root}>
						<Typography variant="h4">Loading...</Typography>
					</Box>
				}
			</Grid>
		</Box>
	);
};

export default LayoutPage;
