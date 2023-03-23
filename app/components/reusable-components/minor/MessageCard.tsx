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

const styles = {
    popperStyles: {
        zIndex: 5,
        opacity: 1,
    },
    initialHeaderContainerStyles: {
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-around' 
    },
    headerStyles: {display: 'inline-flex', flexWrap: 'nowrap'},
    messageIconStyles: { my: 'auto', mx: '.5rem' },
    chipContainer: {
        display: 'flex', 
        flexWrap: 'wrap', 
        listStyle: 'none', 
        p: .25, 
        m: 0,
        minHeight: '40px',  
    },
    messageBoxStyles: {
        width: '100%', 
        mt: 1, 
        mb: 1,   
        '& .MuiFormLabel-root': {
            color: 'white',
        },
    }
}

const standardTimeoutVals = { enter: 200, exit: 10}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(.5),
}));


const MessageCard = ({props}: any) => {
    const { primaryHeader, secondaryHeader, redirectToValue, messageBoxType } = props;
    const theme = useTheme();
    const mdAndDown = useMediaQuery(theme.breakpoints.down("md"));
    const smAndDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { cardIdList, setCardIdList } = useMultiselectContext();
    const [expandValue, setExpandValue] = useState<boolean>(false);
    const listLength = cardIdList.length;

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
    const buttonContainerStyles = { display: 'flex', justifyContent: cardIdList.length ? 'space-between' : 'end'}


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



    

    // TODO: make this a REMIX Form for submitting message to members in cardIdList context state variable
    return (
        <CardActionArea id={"message-card"} onClick={() => handleMessageCardClicked()} sx={{zIndex: 50}}>
            <Popper open={true} keepMounted sx={styles.popperStyles}>
                <Box sx={cardContainerStyles}>
                    {
                        !expandValue ? 
                            <Fade in={!expandValue} timeout={{ enter: 700, exit: 10}} easing={{ enter: 'ease-in-out'}}>
                                <Box sx={styles.initialHeaderContainerStyles}>
                                    <Box sx={styles.headerStyles}>
                                        <Typography variant="body1">
                                            {primaryHeader}
                                        </Typography>
                                        <MessageIcon color="primary" sx={styles.messageIconStyles} />
                                    </Box>
                                </Box>
                            </Fade>
                        : null
                    }
                <Collapse in={ expandValue } easing={{ enter: 'ease-in-out', exit: 'ease-in-out' }} timeout={{ enter: 200, exit: 200 }}>
                        <Fade in={ expandValue } timeout={{ enter: 600, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                            <Box>
                                <Box sx={styles.headerStyles}>
                                    <Typography variant="body2" >
                                        {secondaryHeader}
                                    </Typography>
                                </Box>
                                <Box component="ul" sx={styles.chipContainer}>
                                    {
                                        cardIdList.map((data) => (
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
                                                            timeout={standardTimeoutVals} 
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
                                        ))
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
                                        sx={styles.messageBoxStyles}
                                        />
                                    </div>
                                </form>
                                <Box sx={buttonContainerStyles}>
                                    {
                                        cardIdList.length
                                        ? 
                                        <Fade in={cardIdList.length > 0} timeout={standardTimeoutVals} easing={{ enter: 'ease-in-out' }}>
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
                                        // to={`/${redirectToValue}`}
                                        >
                                        send
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    </Collapse>
                </Box>
            </Popper>
        </CardActionArea>
    )
};

export default MessageCard;
