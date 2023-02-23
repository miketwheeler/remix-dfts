// import type {
//     LoaderArgs,
// } from "@remix-run/node";
// import { json } from "@remix-run/node"
import { Paper, Typography, Box, Divider, Stack } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";



const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.05)'
}
const flexColumnStyle = { 
    display: 'flex', 
    flexBasis: 'column', 
    flexWrap: 'nowrap', 
    // textAlign: 'center', 
    // verticalAlign: 'middle' 
}
const cardContainer = {
    p: 1,
    pl: 2,
    pr: 1.5,
    borderRadius: 2,
}

// const separator = {
//     whiteSpace: 'nowrap',
//     position: 'relative',
//     overflow: 'hidden',
//     "&:after": {
//         content: ".............................................",
//         letterSpacing: '4px',
//         color: 'grey',
//         opacity: '50%',
//         verticalAlign: "3px",
//         display: 'inline-block',
//     }
// }


const DetailsCard = ({props}: any) => {
    return (
        <Paper id="small-card" elevation={4} sx={cardContainer}>
            <Box flexGrow={1}>
                <Box sx={flexRowStyle}>
                    <Typography variant="h6" sx={{my: 'auto'}}>
                        {props.heading}
                    </Typography>
                    <Typography 
                        variant="body2"
                        sx={{
                            my: 'auto', 
                            ml: 1, 
                            color: `${props.availability === 'available'}`
                            }}>
                        {props.availability}
                    </Typography>
                </Box>
                <Divider />
                <Stack direction="column" spacing={1} sx={{ my: 1.5 }}>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">dev type</Typography>
                        <Typography variant="body2">{props.devType}</Typography>
                    </Box>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">active since</Typography>
                        <Typography variant="body2">{props.activeSince}</Typography>
                    </Box>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">total teams</Typography>
                        <Typography variant="body2">{props.teamsOn}</Typography>
                    </Box>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">total projects</Typography>
                        <Typography variant="body2">{props.projectsOn}</Typography>
                    </Box>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">total projects</Typography>
                        <Typography variant="body2">{props.projectsOn}</Typography>
                    </Box>
                    <Box sx={flexRowStyle}>
                        <Typography variant="body2">rating</Typography>
                        <Typography variant="body2">{props.rating}</Typography>
                    </Box>
                </Stack>
                <Stack direction="column" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Divider />
                    <Box sx={flexRowStyle}>
                        <Box sx={flexColumnStyle}>
                            <Typography variant="body2">skills</Typography>
                        </Box>
                        <Box sx={flexColumnStyle}>
                            <Typography variant="body2">{props.skills}</Typography>
                        </Box>
                    </Box>

                    <Divider />
                    <Box sx={flexRowStyle}>
                        <Box sx={flexColumnStyle}>
                            <Typography sx={{mr: 2}} variant="body2">bio</Typography>
                        </Box>
                        <Box sx={flexColumnStyle}>
                            <Typography variant="body2">{props.bio}</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    )
}

export default DetailsCard;