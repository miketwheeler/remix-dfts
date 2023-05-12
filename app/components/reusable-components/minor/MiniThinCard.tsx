import { useState, useMemo, useEffect } from "react";
import { Paper, Typography, Box, Divider, useMediaQuery, Collapse } from "@mui/material";
import { PillSwitch } from "./PillSwitch";
import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Link, Outlet, useNavigate, useLocation } from "@remix-run/react";



const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between', 
}
const flexColumnHeaderStyle = { 
    display: 'flex',  
    textAlign: 'center', 
    minWidth: '70px',
    overflow: 'hidden',
    maxWidth: '100px',
}
const cardContainer = {
    p: 1,
    pl: 2,
    pr: 1.5,
    position: 'realative',
    borderRadius: 2,
    '&:hover': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, 1)' },
    '&.Mui-active': { boxShadow: '.5px .5px 3px 1px rgba(25,118,210, .8)' },
}
const typeAndSkillsSectionStyle = { 
    display: 'block', 
    textAlign: 'left',
    width: '100%',
    minWidth: '80px',
    overflow: 'hidden',
    marginRight: '12px',
}
const dataDisappearStyle = { 
    textOverflow: 'ellipsis', 
    maxWidth: '100%', 
    whiteSpace: 'nowrap', 
    overflow: 'hidden' 
}

const MiniThinCard = ({props}: any) => {
    // the unified context state between each member card and the message box
    const { cardId, setCardId, cardIdList, setCardIdList } = useMultiselectContext();
    // this member card's switch state
    const [checked, setChecked] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // const navigate = useNavigate();
    const location = useLocation();

    const mdAndDown = useMediaQuery('(max-width: 900px)');
    
    // const handleCardCollapse = () => {
    //     setIsOpen((prev) => !prev);
    // }

    // keeps track of the current hightlighted/selected card
    const handleCardClicked = (thisCardId: string) => {
        if(cardId !== thisCardId) {
            if(cardId !== "") {
                document.getElementById(`card-${cardId}`)?.classList.remove('Mui-active');
                mdAndDown && 
                setIsOpen(false);
            }
            document.getElementById(`card-${thisCardId}`)?.classList.add('Mui-active');
            setCardId(thisCardId);
            setIsOpen(true);
            // mdAndDown && 
            // handleCardCollapse();
        }
        else {
            document.getElementById(`card-${cardId}`)?.classList.remove('Mui-active');
            setCardId("")
            setIsOpen(false)
            // mdAndDown && 
            // handleCardCollapse();
        }
    }

    // SWITCH -> ADDs/REMOVES A CARD'S ID ONTO THE CONTEXT LIST ////////////////////////////
    // **calls add/remove card id to/from the context list
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setChecked(event.target.checked);
        handleCardSwitched(props.id, props.header);
    }
    // **remove an entry from the context list
    const handleRemoveSwitchId = async (idToDelete: string) => {
        const newCardIdList = [...cardIdList];                                          // copy the state array
        const deleteEntryIndex = cardIdList.findIndex(n => n.id === idToDelete);        // check if the entry exists
        if(deleteEntryIndex !== -1)                                                     // if it exists, remove it               
            newCardIdList.splice(deleteEntryIndex, 1);                                 

        setCardIdList(newCardIdList);                                                   // sets state array to the new array
    }
    // **add an entry to the context list
    const handleAddSwitchId = async (id: string, name: string) => {
        const newCardIdList = [...cardIdList];                                          // copy the state array
        const addEntryExist = cardIdList.findIndex(n => n.id === id);                   // check if the entry exists
        if(addEntryExist === -1)                                                        // if it doesn't exist, add it                  
            setCardIdList(newCardIdList.concat({ id, name }))                           // adds the new entry to the state array
    }
    // **keeps track of current cards selected by their switch
    const handleCardSwitched = async (switchId: string, cardName: string) => {
        if(cardIdList.length) {                                                         // if are entries in the state array  
            for(const n of cardIdList) {                                                // loop through entries
                n.id === switchId                                                       // if the entry.id matches the switch.id
                ? handleRemoveSwitchId(switchId)                                        // remove the entry from state array
                : handleAddSwitchId(switchId, cardName);                                // else, add the entry to state array
            }
        }
        else { handleAddSwitchId(switchId, cardName); }                                 // if no entries in state array, add it to state array
    }
    ////////////////////////////////////////////////////////////////////////////////////////
    
    // if the member is deleted from the message box, also set it's switch to false again
    useMemo(() => {
        cardIdList.findIndex(n => n.id === props.id) !== -1 ? setChecked(true) : setChecked(false);
    }, [cardIdList, props.id])

    // useMemo(() => {
    //     location.pathname === '/memberhall' ?? handleCardClicked(props.id)
    // }, [props.id, handleCardClicked, location.pathname])



    return (
        <Box sx={{ flexGrow: 1, m: 0, minWidth: '200px'}}>
            <Link 
                // to={props.id === cardId ? '/memberhall' : `/memberhall/${props.id}`} 
                to={ props.id } 
                id={`minicardlink-${props.id}`}
                key={`link-${props.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                preventScrollReset={true}
                replace={true}
                prefetch="render"
                onClick={() => handleCardClicked(props.id)}
                >
                <Paper elevation={4} sx={cardContainer} id={`card-${props.id}`}>
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
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
                        <Box sx={typeAndSkillsSectionStyle}>
                            {
                                props.data1 ?
                                    <Typography noWrap variant='body2' sx={dataDisappearStyle}>
                                        {props.data1.toLowerCase()}
                                    </Typography>
                                : null
                            }
                            {
                                props.data2 ? 
                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden'}}>
                                    <Typography noWrap variant='body2' sx={dataDisappearStyle}>
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
                            {
                                props.data3 ? 
                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflow: 'hidden'}}>
                                    <Typography noWrap variant='body2' sx={dataDisappearStyle}>
                                        { props.data3 }
                                    </Typography>
                                </Box>
                                : null
                            }
                        </Box>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
                        <Box sx={{ display: 'flex', flexBasis: "row", flexWrap: 'nowrap', textAlign: 'center', verticalAlign: 'middle' }}>
                            {
                                props.availability !== null || props.availability !== undefined ?
                                <Typography 
                                    variant="body2" 
                                    sx={{
                                        my: 'auto', 
                                        mr: .5, 
                                        opacity: props.availability === true ? 1 : .2
                                        }}
                                    >
                                    {
                                        props.availability === true 
                                        ? props.miniThinCardProps.miniThinCardType === 1 ? <PersonAddIcon fontSize="small" /> : <WorkspacesIcon fontSize="small" /> 
                                        : props.miniThinCardProps.miniThinCardType === 1 ? <PersonAddDisabledIcon fontSize="small" /> : <WorkspacesIcon fontSize="small" /> 
                                    }
                                </Typography>
                                : null
                            }
                            <Box style={{ fontSize: '12px', margin: 'auto 0' }}>
                                <PillSwitch 
                                    key={`${props.id}`}
                                    id={`switch-${props.id}`}
                                    onClick={(event: React.MouseEvent<HTMLElement>) => { event.stopPropagation() }}
                                    onChange={ handleChange }
                                    checked={ checked }
                                    />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Link>
            {
                mdAndDown && cardId === props.id
                ?
                <Collapse in={isOpen} collapsedSize={0}>
                    <Box sx={ mdAndDown ? { mt: 1.25 } : {mt: 0}} />
                    <Outlet context={ props.passContext } />
                </Collapse>     
                : null
            }
        </Box>
    )
}

export default MiniThinCard;