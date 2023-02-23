import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Button, 
    Typography, 
    Box, 
    // Paper,
    TextField,
    Chip,
    Slide,
    useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

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

    // TODO: pass selected users' switch data to this component
    const [chipData, setChipData] = useState<ChipData[]>([
        { key: 0, label: 'username1' },
        { key: 1, label: 'username2' },
        { key: 2, label: 'username3' },
    ]);

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };


    // TODO:  need logic for card click to shrink and expand 
    //          as well as logic for whether there are username chips being displayed
    //          and slide-in animation for chips

    // TODO: logic, action, and implementation for the form data (server side also)

    // styles
    const containerStyle = { 
        display: 'block', 
        flexBasis: "column", 
        flexWrap: 'nowrap', 
        boxShadow: '1px 3px 13px black',
        p: 2,
        borderRadius: '22px 22px 0 22px',
        background: 'white',
        position: 'fixed',
        bottom: 10,
        right: 20,
        width: mdAndDown ? '92%' : '340px',
    }

    const chipContainer = {
        display: 'flex', 
        flexWrap: 'wrap', 
        listStyle: 'none', 
        p: .25, 
        m: 0,
        minHeight: '40px',  
    }


    return (
        <Box sx={containerStyle}>
            <div style={{display: 'block'}}>
                <Typography 
                    variant="body2" 
                    sx={{my: 'auto', mr: 2, color: 'black'}}
                    >
                    send a message or invite to:
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
                                    onDelete={handleDelete(data)} 
                                    // sx={{ cursor: 'pointer'}}
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
                    label="Multiline"
                    InputLabelProps={{ color: 'primary' }}
                    multiline
                    maxRows={4}
                    variant="standard"
                    sx={{ width: '100%', mt: 1, mb: 1, border: '1px solid black', boxShadow: 'inset 0px 0px black' }}
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
        </Box>
    )
};

export default MessageCard;
