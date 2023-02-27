// import type {
//     LoaderArgs,
// } from "@remix-run/node";
// import { json } from "@remix-run/node"
import { useState } from "react";
import { Paper, Typography, Box, CardActionArea } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PillSwitch } from "./PillSwitch"


const flexRowStyle = { display: 'flex', flexBasis: "row", flexWrap: 'nowrap', justifyContent: 'space-between' }
const flexColumnStyle = { display: 'flex', flexBasis: 'column', flexWrap: 'nowrap', textAlign: 'center', verticalAlign: 'middle' }
const cardContainer = {
    p: 1,
    pl: 2,
    pr: 1.5,
    borderRadius: 2,
    minWidth: '350px',
    // border: 'none',
    '&:hover': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, 1)' },
    '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
}


const MiniThinCard = ({props}: any) => {
    const [currentSelected, setCurrentSelected] = useState<number>(-1);
    const [switchList, setSwitchList] = useState<any[]>([]);

    const handleCardClicked = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.preventDefault();
        if(currentSelected !== id) {
            document.getElementById(`card-${id}`)?.classList.add('Mui-active');
            if(currentSelected !== -1)
                document.getElementById(`card-${currentSelected}`)?.classList.remove('Mui-active');
            }

        setCurrentSelected(id);
    }

    // function handleCardChecked(switchId) {
    //     // membersCheckBoxSelected.includes(switchId) ? dispatch(memberRemove(switchId)) : dispatch(memberAdd(switchId))

    // }

    return (
        <Box sx={{ flexGrow: 1, m: 0 }}>
            <CardActionArea id={`card-${props.id}`} onClick={(event) => handleCardClicked(event, props.id)}>
                <Paper elevation={4} sx={cardContainer} id={`card-inneer-${props.id}`}>
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
                                <PillSwitch 
                                    // label="select-user"
                                    key={`${props.id}`}
                                    id={`switch-${props.id}`}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { 
                                        event.stopPropagation();
                                        // handleCardChecked(props.id);
                                    }}
                                    onMouseDown={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                                    />
                            </div>
                        </Box>
                    </Box>
                </Paper>
            </CardActionArea>
        </Box>
    )
}

export default MiniThinCard;