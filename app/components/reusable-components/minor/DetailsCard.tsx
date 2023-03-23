import type {
    LoaderArgs, 
} from "@remix-run/node";
import { Paper, Typography, Box, Divider, Stack, Rating } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';



const styles = {
    flexRowStyle: { 
        display: 'flex', 
        flexBasis: "row", 
        flexWrap: 'nowrap', 
        justifyContent: 'space-between',
    },
    flexColumnStyle: { 
        display: 'flex', 
        flexBasis: 'column', 
        flexWrap: 'nowrap', 
    },
    cardContainer: {
        p: 1,
        pl: 2,
        pr: 1.5,
        borderRadius: 2,
    },
    iconStyles: { mt: 'auto', pb: 0.2, ml: 1, justifySelf: 'flex-end' },
    detailsContentContainerStyles: { m: 0, p: 0 },
    detailsMainInfoContainerStyles: { my: 1.5 },
    detailsImageContainerStyles: { display: { sm: 'none', md: "flex"} },
    detailsImageAlignmentStyles: { flexGrow: 1, display: 'flex', justifyContent: 'center', verticalAlign: 'middle', pl: 1, py: 1 },
    detailsTempImagePlaceholderStyles: { margin: 'auto auto', background: '#121212', height: '100%', width: '100%' },
    detailsSkillsBioContainerStyles: { mb: 1.5 }, 
    detailsSkillsBioHeaderStyles: { mr: 3 },
}


const DetailsCard = (props: any) => {            
    const simpleDate = (`${props.activeSince.toString().slice(5,2).concat(props.activeSince.toString().slice(0,4))}`)

    const skillsList = props.skills.map((obj: any, i: any) => {
        return obj.name;
    })

    const availabilityStyles = {
        my: 'auto', 
        ml: 1, 
        opacity: props.availability === 'available' ? '100%' : '50%',
        display: 'flex',
    }


    return (
        <Paper id="small-card" elevation={4} sx={styles.cardContainer}>
            <Box flexGrow={1}>
                    <>
                        <Box sx={styles.flexRowStyle}>
                            <Typography variant="h6">
                                {props.heading}
                            </Typography>
                            <Typography 
                                variant="body2"
                                sx={availabilityStyles}>
                                {
                                    props.availability === 'available' 
                                    ? 'available' 
                                    : 'unavailable'
                                } 
                                {
                                    props.availability === 'available' 
                                    ? <PersonAddIcon fontSize="small" sx={styles.iconStyles} /> 
                                    : <PersonAddDisabledIcon fontSize="small" sx={styles.iconStyles} />
                                }
                            </Typography>
                        </Box>
                        <Divider />
                        <Grid container spacing={1} sx={styles.detailsContentContainerStyles}>
                            <Grid xs={12} md={7}>
                                <Stack direction="column" spacing={1} sx={styles.detailsMainInfoContainerStyles}>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">dev:</Typography>
                                        <Typography variant="body2">{props.devType.toLowerCase()}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">active since:</Typography>
                                        <Typography variant="body2">{simpleDate}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">total teams:</Typography>
                                        <Typography variant="body2">{props.teamsOn}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">total projects:</Typography>
                                        <Typography variant="body2">{props.projectsOn}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
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
                            <Grid md={5} sx={styles.detailsImageContainerStyles}>
                                <Box sx={styles.detailsImageAlignmentStyles}>
                                    <div style={styles.detailsTempImagePlaceholderStyles} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Stack direction="column" spacing={1.5} sx={styles.detailsSkillsBioContainerStyles}>
                            <Divider />
                            <Box sx={styles.flexRowStyle}>
                                <Box sx={styles.flexColumnStyle}>
                                    <Typography variant="body2" sx={styles.detailsSkillsBioHeaderStyles}>skills:</Typography>
                                </Box>
                                <Box sx={styles.flexColumnStyle}>
                                    <Typography variant="body2">{skillsList.join(', ').toLowerCase()}</Typography>
                                </Box>
                            </Box>
                            <Divider />
                            <Box sx={styles.flexRowStyle}>
                                <Box sx={styles.flexColumnStyle}>
                                    <Typography variant="body2" sx={styles.detailsSkillsBioHeaderStyles}>bio:</Typography>
                                </Box>
                                <Box sx={styles.flexColumnStyle}>
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