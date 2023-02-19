import React from "react";
// import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";



const Item = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	borderRadius: 6,
	//   textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface PassedData {
	title?: string;
	heading?: string;
	elements?: Array<any> | [[any]];
}

interface Props {
	title?: string;
	heading?: string;
	children: PassedData;
}


// Column Component Layout - assembles a columnar Stack of elements passed to it, gives it a header and/or title if passed
const LayoutGridColumn: React.FC<Props> = (props) => {
	return (
		<>
            {
                props.children.title ? 
					<Typography variant="h6" sx={{ml: .25}}>
						{props.children.title}
					</Typography> 
					: null
            }
            {
                props.children.heading ? <>{props.children.heading}</> : null
            }
			<Paper elevation={4} sx={{ px: ".25rem", borderRadius: 2 }}>
				<Stack direction="column" spacing={2}>
					{props.children.elements ? (
						props.children.elements.map((element, index) => (
							<Item key={`column-element-${index}`}>
								{element}
							</Item>
						))
					) : (
						<Item>There is nothing to render here, or there was a problem loading data!</Item>
					)}
				</Stack>
			</Paper>
		</>
	);
};

export default LayoutGridColumn;
