import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'
import { 
    Button, 
    Typography, 
    Box, 
    // Paper,
    TextField,
    Chip,
    // Slide,
    CardActionArea,
    Popper,
    Collapse, 
    Fade,
    useMediaQuery,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

import { useTheme } from '@mui/material/styles';
// import { blue } from '@mui/material/colors';

// import { Link } from "@remix-run/react";


interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(.5),
}));



const MessageCard = ({props}: any) => {
    const theme = useTheme();
    const mdAndDown = useMediaQuery(theme.breakpoints.down("sm"));
    const [expandValue, setExpandValue] = useState<boolean>(false);
    // const containerRef = useRef(null)

    // TODO: pass selected users' switch data to this component
    const [chipData, setChipData] = useState<ChipData[]>([
        { key: 0, label: 'username1' },
        { key: 1, label: 'username2' },
        { key: 2, label: 'username3' },
    ]);

    const listLength = chipData.length;
    let prevListLength = 0;

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleMessageCardClicked = () => {
        setExpandValue(!expandValue);
    }

    // useEffect(() => {
    //     if(listLength > 0) setExpandValue(true);
    //     else setExpandValue(false);
    // }, [listLength])


    // TODO: logic, action, and implementation for the form data (server side also)

    // styles
    const gridContainer = {
        display: 'flex',
        position: 'fixed',
        flexBasis: 'row',
        // top: '500px',
        bottom: 10, 
        // height: '200px',
        width: '100%',
        zIndex: 10,
        border: '1px solid red',
    }

    const cardContainerStyles = { 
        // display: 'flex', 
        // flexBasis: "column", 
        flexWrap: 'nowrap', 
        boxShadow: '1px 3px 13px black',
        p: 2,
        borderRadius: '22px 22px 0 22px',
        background: 'rgba(22, 22, 22, .8)',             // NOTE: dark glass effect
        // background: 'rgba(222, 222, 222, 0.2)',      // NOTE: light glass effect
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        width: mdAndDown ? '92%' : '30%',

        // Note: for position 
        position: 'fixed',
        bottom: 10,
        right: 20,
    }

    const chipContainer = {
        display: 'flex', 
        flexWrap: 'wrap', 
        listStyle: 'none', 
        p: .25, 
        m: 0,
        minHeight: '40px',  
    }

    const messageBoxStyles = {
        width: '100%', 
        mt: 1, 
        mb: 1,   
        '& .MuiFormLabel-root': {
            color: 'white',
        },
    }
    
    const messageHeaderStyles = { my: 'auto', color: 'white'}


    return (
        // <Box sx={gridContainer}>
        //     <Grid container spacing={1}>
        //         <Grid sm={8} sx={{ display: { xs: 'none', sm: 'block'} }}> 
        //             <Box flexGrow={1} sx={{ border: '1px dotted pink' }}><h5>This is the spacer</h5></Box>
        //         </Grid>
        //         <Grid xs={12} sm={4}>
                    <CardActionArea id={"message-card"} onClick={() => handleMessageCardClicked()} sx={{zIndex: 50}}>
                        <Popper open={true} keepMounted sx={{ zIndex: 5, opacity: 1}}>
                            <Box sx={cardContainerStyles}>
                                {
                                    !expandValue ? 
                                        <Fade in={!expandValue} timeout={{ enter: 700, exit: 10}} easing={{ enter: 'ease-in-out'}}>
                                            <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                                <Box sx={{display: 'inline-flex', flexWrap: 'nowrap'}}>
                                                    <Typography 
                                                        variant="body1" 
                                                        // sx={messageHeaderStyles}
                                                        >
                                                        send a message or invite
                                                    </Typography>
                                                    <MessageIcon color="primary" sx={{ my: 'auto', ml: '.5rem' }} />
                                                </Box>
                                            </Box>
                                        </Fade>
                                    : null
                                }
                            <Collapse in={ expandValue } easing={{ enter: 'ease-in-out', exit: 'ease-in-out' }} timeout={{ enter: 200, exit: 200 }}>
                                    <Fade in={ expandValue } timeout={{ enter: 200, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                                        <div>
                                            <div style={{display: 'inline-flex'}}>
                                                <Typography 
                                                    variant="body2" 
                                                    sx={messageHeaderStyles}
                                                    >
                                                    add members to connect
                                                </Typography>
                                            </div>
                                            <Box component="ul" sx={chipContainer}>
                                                {
                                                    chipData.map((data) => {                            
                                                        return (
                                                            <ListItem key={data.key}>
                                                                <Chip
                                                                    label={data.label}
                                                                    color="primary"
                                                                    size="small"
                                                                    onDelete={handleDelete(data)}
                                                                    />
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </Box>
                                            <form>
                                                <div>
                                                <TextField
                                                    id="message-input"
                                                    label="Message"
                                                    variant="outlined"
                                                    multiline
                                                    fullWidth
                                                    maxRows={4}
                                                    onClick={(e) => e.stopPropagation()}
                                                    InputLabelProps={{ color: 'primary' }}
                                                    InputProps={{ style: { color: 'white' } }}
                                                    sx={messageBoxStyles}
                                                    />
                                                </div>
                                            </form>
                                            <div style={{ display: 'flex', justifyContent: 'end'}}>
                                                <Button
                                                    variant="contained"
                                                    type="button"
                                                    // component={ Link }
                                                    // to={`/${props.toWhere}`}
                                                    >
                                                    send
                                                </Button>
                                            </div>
                                        </div>
                                    </Fade>
                                </Collapse>
                            </Box>
                        </Popper>
                    </CardActionArea>


        //         </Grid>
        //     </Grid>
        // </Box>
    )
};

export default MessageCard;
