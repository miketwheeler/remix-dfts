import type {
    LoaderArgs, 
} from "@remix-run/node";
import { Paper, Typography, Box, Divider, Stack, Rating, Fade } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import WorkspacesIcon from '@mui/icons-material/Workspaces';



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


const DetailsCard = ({props}: any) => {    
    // const { specProps, allData } = props;
    // const { deliverProps, detailsCardType, data } = props;
    
    const simpleDate = (date: any) => {
        const mo = date.slice(5, 7);
        const yr = date.slice(0, 4);
        return (`${mo}/${yr}`)
    }

    const skillsList = props.skills?.map((obj: any) => {
        return obj.name;
    })

    const availabilityStyles = {
        my: 'auto', 
        ml: 1, 
        opacity: props.availability === true ? '100%' : '50%',
        display: 'flex',
    }
    
    // console.log('props details card: ', props)


    return (
        <Paper id="small-card" elevation={4} sx={styles.cardContainer}>
            <Fade in={true} timeout={1200}>
            <Box flexGrow={1}>
                {
                    props.type === "member"   // member type card
                    ?
                    <>
                    <Box sx={styles.flexRowStyle}>
                            <Typography variant="h6">
                                {props.heading}
                            </Typography>
                            <Typography 
                                variant="body2"
                                sx={availabilityStyles}>
                                <>
                                    {
                                        props.availability
                                        ? 'available' 
                                        : 'unavailable'
                                    }
                                    {
                                        props.availability
                                        ? <PersonAddIcon fontSize="small" sx={styles.iconStyles} /> 
                                        : <PersonAddDisabledIcon fontSize="small" sx={styles.iconStyles} />
                                    }
                                </>
                            </Typography>
                        </Box>
                        <Divider />
                        <Grid container spacing={1} sx={styles.detailsContentContainerStyles}>
                            <Grid xs={12} md={7}>
                                <Stack direction="column" spacing={1} sx={styles.detailsMainInfoContainerStyles}>
                                    <Box sx={styles.flexRowStyle}>
                                        {
                                            props.devType 
                                            ? 
                                            <>
                                                <Typography variant="body2">dev:</Typography>
                                                <Typography variant="body2">{props.devType.toLowerCase()}</Typography>
                                            </> 
                                            : <Typography variant="body2">nothing to display</Typography>
                                        }
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">active since:</Typography>
                                        <Typography variant="body2">{simpleDate(props.activeSince)}</Typography>
                                    </Box>
                                    <>  
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
                                                    value={Number(props.rating)}
                                                    size="small"
                                                    sx={{ color: 'secondary.main'}}
                                                    />
                                            </Typography>
                                        </Box>
                                    </>
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
                                <>
                                    <Box sx={styles.flexColumnStyle}>
                                        <Typography variant="body2" sx={styles.detailsSkillsBioHeaderStyles}>skills:</Typography>
                                    </Box>
                                    <Box sx={styles.flexColumnStyle}>
                                        <Typography variant="body2">
                                            {
                                                props.skills.length
                                                ?
                                                skillsList.join(', ').toLowerCase()
                                                : 'n/a: no skills listed'
                                            }
                                        </Typography>
                                    </Box>
                                </>
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

                    : // else is project type card
                    <>
                        <Box sx={styles.flexRowStyle}>
                            <Typography variant="h6">
                                {props.heading}
                            </Typography>
                            <Typography 
                                variant="body2"
                                sx={availabilityStyles}>
                                <>
                                    {
                                        props.availability
                                        ? 'active' 
                                        : 'inactive'
                                    }
                                    {
                                        props.availability
                                        ? <WorkspacesIcon fontSize="small" sx={styles.iconStyles} /> 
                                        : <WorkspacesIcon fontSize="small" sx={styles.iconStyles} />
                                    }
                                </>
                            </Typography>
                        </Box>
                        <Divider />
                        <Grid container spacing={1} sx={styles.detailsContentContainerStyles}>
                            <Grid xs={12} md={7}>
                                <Stack direction="column" spacing={1} sx={styles.detailsMainInfoContainerStyles}>
                                    <Box sx={styles.flexRowStyle}>
                                        {
                                            props.projectType
                                            ? 
                                            <>
                                                <Typography variant="body2">type:</Typography>
                                                <Typography variant="body2">{props.projectType.toLowerCase()}</Typography>
                                            </>
                                            : <Typography variant="body2">nothing to display</Typography>
                                        }
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">begins:</Typography>
                                        <Typography variant="body2">{simpleDate(props.beginDate)}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">ends:</Typography>
                                        <Typography variant="body2">{simpleDate(props.beginDate)}</Typography>
                                    </Box>
                                    <Box sx={styles.flexRowStyle}>
                                        <Typography variant="body2">milestone:</Typography>
                                        <Typography variant="body2">{props.milestone}</Typography>
                                    </Box>
                                    {
                                        props.type === "project"  // is project type card
                                        ? 
                                        <>
                                        
                                        </>
                                        : <Typography variant="body2">nothing to display</Typography>
                                    }
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
                                {
                                    props.type === "project"  // is project type card
                                    ?
                                    <>
                                        <Box sx={styles.flexColumnStyle}>
                                            <Typography variant="body2" sx={styles.detailsSkillsBioHeaderStyles}>stack:</Typography>
                                        </Box>
                                        <Box sx={styles.flexColumnStyle}>
                                            <Typography variant="body2">{props.stack}</Typography>
                                        </Box>
                                    </>
                                    : <Typography variant="body2">nothing to display</Typography>
                                }
                            </Box>
                            <Divider />
                            <Box sx={styles.flexRowStyle}>
                                <Box sx={styles.flexColumnStyle}>
                                    <Typography variant="body2" sx={styles.detailsSkillsBioHeaderStyles}>dscr:</Typography>
                                </Box>
                                <Box sx={styles.flexColumnStyle}>
                                    <Typography variant="body2">{props.description}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </>
                }
            </Box>
            </Fade>
        </Paper>
    )
}

export default DetailsCard;