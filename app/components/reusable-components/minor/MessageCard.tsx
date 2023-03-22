import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Button, 
    Typography, 
    Box, 
    TextField,
    Chip,
    CardActionArea,
    Popper,
    Collapse, 
    Fade,
    useMediaQuery,
    Slide,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import ClearIcon from '@mui/icons-material/Clear'
import { useMultiselectContext } from '~/components/client-context/MultiselectContext';

import { useTheme } from '@mui/material/styles';




interface ChipData {
    id: string;
    name: string;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(.5),
}));


const MessageCard = ({props}: any) => {
    const theme = useTheme();
    const mdAndDown = useMediaQuery(theme.breakpoints.down("md"));
    const smAndDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { cardIdList, setCardIdList } = useMultiselectContext();

    const [expandValue, setExpandValue] = useState<boolean>(false);
    // const containerRef = useRef(null)

    const listLength = cardIdList.length;

    const handleDelete = (chipToDelete: ChipData) => () => {
        const newCardIdList = [...cardIdList];
        const removeIndex = cardIdList.findIndex(n => n.id === chipToDelete.id);
        if(removeIndex !== -1) 
            newCardIdList.splice(removeIndex, 1);

        setCardIdList(newCardIdList);
    };

    const handleMessageCardClicked = () => {
        setExpandValue(!expandValue);
    }

    const cancelAll = () => {
        setCardIdList([]);
    }

    // if the memebers selected are greater than 0, expand the card - else collapse it
    useMemo(() => {
        if(listLength > 0) 
            setExpandValue(true);
        else 
            setExpandValue(false);
    }, [listLength])


    const cardContainerStyles = { 
        flexWrap: 'nowrap', 
        boxShadow: '1px 3px 13px black',
        p: 2,
        borderRadius: '22px 22px 0 22px',
        background: 'rgba(22, 22, 22, .8)',  // NOTE: dark glass effect
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        width: smAndDown ? '96%' : mdAndDown ? '58%' : '30%',
        // Note: these on down for position 
        position: 'fixed',
        bottom: 0,
        right: 0,
        mx: '10px',
        my: '20px',
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

    // TODO: make this a REMIX Form for submitting message to members in cardIdList context state variable
    

    return (
        <CardActionArea id={"message-card"} onClick={() => handleMessageCardClicked()} sx={{zIndex: 50}}>
            <Popper open={true} keepMounted sx={{ zIndex: 5, opacity: 1}}>
                <Box sx={cardContainerStyles}>
                    {
                        !expandValue ? 
                            <Fade in={!expandValue} timeout={{ enter: 700, exit: 10}} easing={{ enter: 'ease-in-out'}}>
                                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <Box sx={{display: 'inline-flex', flexWrap: 'nowrap'}}>
                                        <Typography variant="body1">
                                            send a message or invite
                                        </Typography>
                                        <MessageIcon color="primary" sx={{ my: 'auto', mx: '.5rem' }} />
                                    </Box>
                                </Box>
                            </Fade>
                        : null
                    }
                <Collapse in={ expandValue } easing={{ enter: 'ease-in-out', exit: 'ease-in-out' }} timeout={{ enter: 200, exit: 200 }}>
                        <Fade in={ expandValue } timeout={{ enter: 600, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                            <div>
                                <div style={{display: 'inline-flex'}}>
                                    <Typography 
                                        variant="body2" 
                                        sx={{my: 'auto'}}
                                        >
                                        add members to connect
                                    </Typography>
                                </div>
                                <Box component="ul" sx={chipContainer}>
                                    {
                                        cardIdList.map((data) => {                            
                                            return (
                                                <ListItem key={data.id}>
                                                    {
                                                        cardIdList.length === 1
                                                        ? 
                                                            <Slide 
                                                                direction="left" 
                                                                in={ expandValue } 
                                                                timeout={{ enter: 300, exit: 10 }} 
                                                                easing={{ enter: 'ease-in-out' }}
                                                                >
                                                                <Chip
                                                                    label={data.name}
                                                                    color="primary"
                                                                    size="small"
                                                                    onDelete={handleDelete(data)}
                                                                    />
                                                            </Slide>
                                                        : 
                                                            <Slide 
                                                                direction="left" 
                                                                in={ expandValue } 
                                                                timeout={{ enter: 200, exit: 10 }} 
                                                                easing={{ enter: 'ease-in-out' }}
                                                                >
                                                                <Chip
                                                                    label={ data.name }
                                                                    color="primary"
                                                                    size="small"
                                                                    onDelete={ handleDelete(data) }
                                                                    />
                                                            </Slide>
                                                    }
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
                                <Box style={{ display: 'flex', justifyContent: cardIdList.length ? 'space-between' : 'end'}}>
                                    {
                                        cardIdList.length
                                        ? 
                                        <Fade in={cardIdList.length > 0} timeout={{ enter: 200, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                                            <Button 
                                                color="secondary" 
                                                variant="text" 
                                                type="button" 
                                                onClick={ () => cancelAll() }
                                                endIcon={<ClearIcon fontSize='small'/>}
                                                >
                                                dismiss all
                                            </Button>
                                        </Fade>
                                        : null
                                    }
                                    
                                    <Button
                                        variant="contained"
                                        type="button"
                                        // component={ Link }
                                        // to={`/${props.toWhere}`}
                                        >
                                        send
                                    </Button>
                                </Box>
                            </div>
                        </Fade>
                    </Collapse>
                </Box>
            </Popper>
        </CardActionArea>
    )
};

export default MessageCard;
