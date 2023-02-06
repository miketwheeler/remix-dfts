import React from "react";
// import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";



const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
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
                props.children.title ? <Typography variant="h4">{props.children.title}</Typography> : null
            }
            {
                props.children.heading ? <h5>{props.children.heading}</h5> : null
            }
			<Paper elevation={4} sx={{ padding: "1rem", borderRadius: 3 }}>
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
