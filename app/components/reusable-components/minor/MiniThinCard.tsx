import { useState, useContext, useMemo, useEffect } from "react";
import { Paper, Typography, Box, CardActionArea, Divider, useTheme } from "@mui/material";
import { PillSwitch } from "./PillSwitch";
import { useMultiselectContext } from "~/components/client-context/MultiselectContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Link } from "@remix-run/react";

// TODO:  fix the this component, wip pass selected to details card and switch to message card!!!!!!


const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'space-between', 
}
// const flexColumnStyle = { display: 'flex', flexBasis: 'column', flexWrap: 'nowrap',  verticalAlign: 'middle' }
const flexColumnHeaderStyle = { 
    display: 'flex',  
    textAlign: 'center', 
    minWidth: '60px',
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


const MiniThinCard = ({props}: any) => {
    // const { cardId, cardIdList, setCardId, setCardIdList } = useMultiselectContext();
    const { cardId, setCardId, cardIdList, setCardIdList } = useMultiselectContext();
    const [currentSelected, setCurrentSelected] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(false);
    
    const theme = useTheme();
    // const [switchList, setSwitchList] = useState<any[]>(cardIdList);

    // keeps track of the current hightlighted card
    const handleCardClicked = (thisCardId: string) => {
        // event.preventDefault();
        if(cardId !== thisCardId) {
            if(cardId !== "") {
                document.getElementById(`card-${cardId}`)?.classList.remove('Mui-active');
            }
            document.getElementById(`card-${thisCardId}`)?.classList.add('Mui-active');
        }
        setCurrentSelected(thisCardId);
        setCardId(thisCardId);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setChecked(event.target.checked);
        handleCardSwitched(props.id, props.header);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // SET A CARD ID TO THE CONTEXT LIST ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    const handleRemoveSwitchId = async (idToDelete: string) => {
        const newCardIdList = cardIdList;
        const deleteEntry = cardIdList.findIndex(n => n.id === idToDelete);
        // console.log(`found index: ${cardIdList.findIndex(n => n.id === idToDelete)}`)
        setCardIdList(newCardIdList.splice(deleteEntry, 1));

        console.log(`len on delete: ${cardIdList.length}`)
    }

    const handleAddSwitchId = async (id: string, name: string) => {
        const newCardIdList = cardIdList;
        setCardIdList(newCardIdList.concat({ id, name }));

        console.log(`len on add: ${cardIdList.length}`)

    }

    // keeps track of current cards selected by their switch
    const handleCardSwitched = async (switchId: string, userName: string) => {
        if(cardIdList.length) {
            for(const n of cardIdList) {
                if(n.id === switchId ) {
                    handleRemoveSwitchId(switchId);
                } else {
                    handleAddSwitchId(switchId, userName);
                }
            }
        } else {
            handleAddSwitchId(switchId, userName);
        }
        console.log(`cardIdList: ${JSON.stringify(cardIdList, null, 4)}`)
    }
    // /////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////


    return (
        <Box sx={{ flexGrow: 1, m: 0, minWidth: '200px'}}>
            {/* <CardActionArea id={`card-${props.id}`} onClick={(event) => handleCardClicked(event, props.id)}> */}
            <Link 
                to={props.id} 
                id={`minicardlink-${props.id}`}
                key={`link-${props.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                preventScrollReset={true}
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
                        <div 
                            style={{ 
                                display: 'block', 
                                textAlign: 'left',
                                width: '100%',
                                minWidth: '80px',
                                overflow: 'hidden',
                                marginRight: '12px',
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
                                        ? <PersonAddIcon fontSize="small" /> 
                                        : <PersonAddDisabledIcon fontSize="small" />
                                    }
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
                                        // handleCardSwitched(props.id, props.header);
                                    }}
                                    // onChange={ handleChange }
                                    // checked={checked}
                                    />
                            </div>
                        </Box>
                    </Box>
                </Paper>
            </Link>
            {/* </CardActionArea> */}
        </Box>
    )
}

export default MiniThinCard;