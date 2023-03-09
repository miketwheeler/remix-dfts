import { useState, useContext, useMemo } from "react";
import { Paper, Typography, Box, CardActionArea, Divider } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";
import { PillSwitch } from "./PillSwitch";
import { useMultiselectContext } from "~/components/client-context/MultiselectContext";


// TODO:  fix the this component, wip pass selected to details card and switch to message card!!!!!!


const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between', 
    // border: '1px dotted pink' 
}
// const flexColumnStyle = { display: 'flex', flexBasis: 'column', flexWrap: 'nowrap',  verticalAlign: 'middle' }
const flexColumnHeaderStyle = { 
    display: 'flex',  
    textAlign: 'center', 
    minWidth: '100px',
    // border: '1px dotted red'
}
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

    // useMemo(() => {
    //     console.log(`cardId: ${cardId}`)
    //     console.log(`cardIdList: ${cardIdList}`)
    // }, [cardId, cardIdList])

    return (
        <Box sx={{ flexGrow: 1, m: 0, minWidth: '300px'}}>
            <CardActionArea id={`card-${props.id}`} onClick={(event) => handleCardClicked(event, props.id)}>
                <Paper elevation={4} sx={cardContainer} id={`card-inner-${props.id}`}>
                    <Box sx={flexRowStyle}>
                        <Box sx={flexColumnHeaderStyle}>
                            {
                                props.header ?
                                <Typography variant="body2" sx={{my: 'auto'}}>
                                    {props.header.toLowerCase()}
                                </Typography>
                                : null
                            }
                        </Box>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ml: 1, mr: 2}} />
                        <div 
                            style={{ 
                                display: 'block', 
                                textAlign: 'left',
                                width: '100%',
                                minWidth: '100px',
                                overflow: 'hidden',
                                marginRight: '12px',
                                // border: '1px solid red',
                            }}
                            >
                            {
                                props.data1 ?
                                    <Typography noWrap variant='body2' sx={{textOverflow: 'ellipsis', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {props.data1.toLowerCase()}
                                    </Typography>
                                : null
                            }
                            {
                                props.data2 ? 
                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden'}}>
                                    <Typography noWrap variant='body2' sx={{textOverflow: 'ellipsis', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {
                                            props.data2.map((skill: any, index: number) => {
                                                return (
                                                    skill.name.toLowerCase() + 
                                                    `${index < props.data2.length -1 ? ", " : ""}`
                                                )
                                            })
                                        }
                                    </Typography>
                                </Box>
                                : null
                            }
                        </div>
                        <Box sx={{ display: 'flex', flexBasis: "row", flexWrap: 'nowrap', textAlign: 'center', verticalAlign: 'middle' }}>
                            {
                                props.availability !== null || props.availability !== undefined ?
                                <Typography 
                                    variant="body2" 
                                    // color={props.availability === true ? 'theme.palette.success' : 'theme.palette.warning'}
                                    sx={{
                                        my: 'auto', 
                                        mr: .5, 
                                        opacity: props.availability === true ? 1 : .2
                                        }}
                                    >
                                    {props.availability === true ? "available" : "unavailable"}
                                </Typography>
                                : null
                            }
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