// import type {
//     LoaderArgs,
// } from "@remix-run/node";
// import { json } from "@remix-run/node"
import { useState, useContext, useMemo } from "react";
import { Paper, Typography, Box, CardActionArea } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";
import { PillSwitch } from "./PillSwitch";
// import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
// import { MultiselectContext } from "~/components/client-context/MultiselectContext";
import { useMultiselectContext } from "~/components/client-context/MultiselectContext";


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

    const { cardId, cardIdList, setCardId, setCardIdList } = useMultiselectContext();
    const [currentSelected, setCurrentSelected] = useState<string>(cardId);
    // const [switchList, setSwitchList] = useState<any[]>(cardIdList);


    // keeps track of the current hightlighted card
    const handleCardClicked = (event: React.MouseEvent<HTMLButtonElement>, thisCardId: string) => {
        event.preventDefault();
        if(currentSelected !== thisCardId) {
            document.getElementById(`card-${thisCardId}`)?.classList.add('Mui-active');
            if(currentSelected !== "")
                document.getElementById(`card-${currentSelected}`)?.classList.remove('Mui-active');
            }
        setCurrentSelected(thisCardId);
        setCardId(thisCardId);
    }

    // helper: removes the id from the list of selected cards
    const handleRemoveId = (id: string) => {
        let i = cardIdList.indexOf(id);
        if(i !== -1) {
            setCardIdList([...cardIdList.slice(0, i), ...cardIdList.slice(i, cardIdList.length-1 )]);
        }
    }

    // keeps track of current cards selected by their switch
    const handleCardSwitched = (switchId: string) => {
        cardIdList.includes(switchId) 
        ? handleRemoveId(switchId) // is there already? remove it
        : setCardIdList([...cardIdList, switchId]) // else add the cardId to the list
    }

    useMemo(() => {
        console.log(`cardId: ${cardId}`)
        console.log(`cardIdList: ${cardIdList}`)
    }, [cardId, cardIdList])

    // TODO:
    // try/catch block for retrieving data for selected card and/or switch and then operating on their respective roles

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
                                <PillSwitch 
                                    // label="select-user"
                                    key={`${props.id}`}
                                    id={`switch-${props.id}`}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { 
                                        event.stopPropagation();
                                        handleCardSwitched(props.id);
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