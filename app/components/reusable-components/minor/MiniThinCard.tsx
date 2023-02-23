// import type {
//     LoaderArgs,
// } from "@remix-run/node";
// import { json } from "@remix-run/node"
import { Paper, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";



const flexRowStyle = { display: 'flex', flexBasis: "row", flexWrap: 'nowrap', justifyContent: 'space-between' }
const flexColumnStyle = { display: 'flex', flexBasis: 'column', flexWrap: 'nowrap', textAlign: 'center', verticalAlign: 'middle' }
const cardContainer = {
    p: 1,
    pl: 2,
    pr: 1.5,
    borderRadius: 2,
    minWidth: '350px'
}


const MiniThinCard = ({props}: any) => {
    return (
        <Paper id="small-card" elevation={4} sx={cardContainer}>
            <Box sx={flexRowStyle}>
                <Box sx={flexColumnStyle}>
                    <Typography variant="body2" sx={{my: 'auto'}}>
                        {props.heading}
                    </Typography>
                </Box>
                <div style={{display: 'block'}}>
                    <Typography variant="body2">
                        {props.data1}
                    </Typography>
                    <Typography variant="body2">
                        {props.data2}
                    </Typography>
                </div>
                <Box sx={{ display: 'flex', flexBasis: "row", flexWrap: 'nowrap', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Typography variant="body2" sx={{my: 'auto', mr: .5}}>
                        {props.availability}
                    </Typography>
                    <div style={{ fontSize: '12px', margin: 'auto 0' }}>
                        (switch)
                    </div>
                </Box>
            </Box>
        </Paper>
    )
}

export default MiniThinCard;