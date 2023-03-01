import type {
    LoaderArgs,
} from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node"
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MiniThinCard from "~/components/reusable-components/minor/MiniThinCard";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";
import RedirectQButton from "~/components/reusable-components/minor/RedirectQButton";
import MessageCard from "~/components/reusable-components/minor/MessageCard";

import { requireUserId } from "~/utils/session.server";

import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);
	return json({});
}

// TODO: DATA: get 12; for each user that is != this user: get username, get devtype, get skills, get availability values... get next 12... etc.
// or get +12 on button --action


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function MemberHallRoute() {    
    const theme = useTheme();
    const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<string[]>([]);


    return (
        <>
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>

            <div style={{
                display: 'flex', 
                position: 'sticky', 
                top: smAndDown ? 56 : 62, 
                height: 60, 
                marginBottom: '-60px', 
                width: '100%', 
                background: 'linear-gradient(0deg, rgba(18,18,18,0.2667191876750701) 0%, rgba(18,18,18,0.6252626050420168) 14%, rgba(18,18,18,1) 42%, rgba(18,18,18,1) 75%)'
                }} 
            />
            <Grid2 container spacing={2} sx={{height: '100%', m: 2, mt: 2.5}}>
                <Grid2 xs={12} md={7}>
                    {/* Container for the heading on the 'sticky-header' with scrollable content children */}
                    <div style={{
                        display: 'flex', 
                        flexBasis: 'row', 
                        justifyContent: 'space-between', 
                        position: 'sticky',
                        top: 80,
                        // borderBottom: '1px solid lightblue',
                        background: 'linear-gradient(0deg, rgba(18,18,18,0.2667191876750701) 0%, rgba(18,18,18,0.6252626050420168) 14%, rgba(18,18,18,0.84375) 42%, rgba(18,18,18,1) 75%)'
                        }}>
                        <Typography variant="h5" sx={{ml: .25, mt: '.auto', mb: .5}}>members</Typography>
                        <Typography variant="body2" sx={{mr: .25, mt: 'auto', mb: .8}}>select to add</Typography>
                    </div>
                    
                    <Stack direction="column" spacing={1.5}>
                        {/* TODO: FUTURE: assemble the components, pasing the loader data via props/prop names */}
                        <MiniThinCard props={{id: 0, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 1, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 2, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 3, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 4, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 5, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 6, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 7, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 8, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 9, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 10, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 11, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 12, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 13, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 14, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 15, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 16, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 17, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 18, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 19, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 20, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                        <MiniThinCard props={{id: 21, heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    </Stack>
                </Grid2>
                <Grid2 md={5} sx={{ display: { xs: 'none', sm: "none", md: "block"}}}>
                    <div style={{position: 'sticky', top: 80}}>
                        <div style={{display: 'flex', flexBasis: 'row', flexWrap: 'nowrap', width: '100%', justifyContent: 'space-between'}}>
                            <Typography variant="h5" sx={{ ml: .25 }}>
                                details
                            </Typography>
                        </div>
                        <div style={{display: 'block'}}>
                            <Stack direction="column" spacing={2}>

                                <DetailsCard props={{
                                    heading: 'username',
                                    availability: 'available', 
                                    devType: 'devtype', 
                                    activeSince: "11/01/23", 
                                    teamsOn: '3', 
                                    projectsOn: '2', 
                                    rating: '4.5',
                                    skills: "skill1, skill2, skill3, skill4, skill5",
                                    bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat."
                                }}
                                />

                                <RedirectQButton props={{redirectHeader: "assembling a new crew?", whereTo: "team"}} />                                
                            </Stack>
                        </div>
                    </div>
                </Grid2>

                <MessageCard />

            </Grid2>
            </MultiselectProvider>
        </>
    );
}