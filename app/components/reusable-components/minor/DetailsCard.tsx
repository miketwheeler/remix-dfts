import type {
    LoaderArgs, 
} from "@remix-run/node";
import { useState, useEffect } from "react";
import { useLoaderData, useFetcher} from "@remix-run/react";
import { Paper, Typography, Box, Divider, Stack, Collapse, Slide, Skeleton, Rating } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

// import { getMember } from "~/utils/db.server";


// export async function loader({ request }: LoaderArgs ) {
//     // const displayUser = await getMember()
// }

const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between',
    // background: 'rgba(0, 0, 0, 0.05)'
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



const DetailsCard = (props: any) => {
    // const data = useLoaderData();
    // const { cardId } = useMultiselectContext();
    // const fetcher = useFetcher();
    // const [currentUser, setCurrentUser] = useState<any>(null);

    // setCurrentUser(cardId);
    // console.log(`currentUser set on load: ${currentUser}`)

    // useEffect(() => {
    //     if (currentUser !==  cardId) {
    //         setCurrentUser(cardId);
    //         // const getUser = fetcher.load()
    //         console.log(`currentUser cardId (context var) after change: ${cardId}`);
    //     }
    // }, [cardId, currentUser])
    // console.log(JSON.stringify(props.skills))
    // Object.entries(props.skills).map((key, value) => {
        //     return (
            //         console.log(`value: ${value}`)
            //     )
            // })
            // console.log(Object.values(props.skills))
            
    const simpleDate = (`${props.activeSince.toString().slice(5,2).concat(props.activeSince.toString().slice(0,4))}`)
    const skillsList = props.skills.map((obj: any, i: any) => {
        return obj.name
    })

    return (
        <Paper id="small-card" elevation={4} sx={cardContainer}>
            <Box flexGrow={1}>
                    <>
                        <Box sx={flexRowStyle}>
                            <Typography variant="h6" sx={{my: 'auto'}}>
                                {props.heading}
                            </Typography>
                            <Typography 
                                variant="body2"
                                sx={{
                                    my: 'auto', 
                                    ml: 1, 
                                    opacity: props.availability === 'available' ? '100%' : '50%',
                                    display: 'flex',
                                    }}>
                                {
                                    props.availability === 'available' 
                                    ? 'available' 
                                    : 'unavailable'
                                } 
                                {
                                    props.availability === 'available' 
                                    ? <PersonAddIcon fontSize="small" sx={{ mt: 'auto', pb: 0.2, ml: 1, justifySelf: 'flex-end' }} /> 
                                    : <PersonAddDisabledIcon fontSize="small" sx={{ mt: 'auto', pb: 0.2, ml: 1, justifySelf: 'flex-end' }} />
                                }
                            </Typography>
                        </Box>
                        <Divider />
                        <Grid container spacing={1} sx={{m: 0, p: 0}}>
                            <Grid xs={12} md={7}>
                                <Stack direction="column" spacing={1} sx={{ my: 1.5 }}>
                                    <Box sx={flexRowStyle}>
                                        <Typography variant="body2">dev:</Typography>
                                        <Typography variant="body2" sx={{textAlign: 'right'}}>{props.devType.toLowerCase()}</Typography>
                                    </Box>
                                    <Box sx={flexRowStyle}>
                                        <Typography variant="body2">active since:</Typography>
                                        <Typography variant="body2">{simpleDate}</Typography>
                                    </Box>
                                    <Box sx={flexRowStyle}>
                                        <Typography variant="body2">total teams:</Typography>
                                        <Typography variant="body2">{props.teamsOn}</Typography>
                                    </Box>
                                    <Box sx={flexRowStyle}>
                                        <Typography variant="body2">total projects:</Typography>
                                        <Typography variant="body2">{props.projectsOn}</Typography>
                                    </Box>
                                    <Box sx={flexRowStyle}>
                                        <Typography variant="body2">rating:</Typography>
                                        <Typography variant="body2">
                                            <Rating
                                                precision={0.25}
                                                readOnly
                                                value={props.rating}
                                                size="small"
                                                sx={{ color: 'secondary.main'}}
                                                />
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid md={5} sx={{ display: { sm: 'none', md: "flex"} }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', verticalAlign: 'middle', pl: 1, py: 1 }}>
                                    <div style={{ margin: 'auto auto', background: '#121212', height: '100%', width: '100%' }} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Stack direction="column" spacing={1.5} sx={{ mb: 1.5 }}>
                            <Divider />
                            <Box sx={flexRowStyle}>
                                <Box sx={flexColumnStyle}>
                                    <Typography variant="body2" sx={{mr: 3}}>skills:</Typography>
                                </Box>
                                <Box sx={flexColumnStyle}>
                                    <Typography variant="body2" sx={{textAlign: 'left'}}>{skillsList.join(', ').toLowerCase()}</Typography>
                                </Box>
                            </Box>

                            <Divider />
                            <Box sx={flexRowStyle}>
                                <Box sx={flexColumnStyle}>
                                    <Typography sx={{mr: 3}} variant="body2">bio:</Typography>
                                </Box>
                                <Box sx={flexColumnStyle}>
                                    <Typography variant="body2">{props.bio}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </>
            </Box>
        </Paper>
    )
}

export default DetailsCard;