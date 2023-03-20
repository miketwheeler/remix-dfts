import type {
    // ActionArgs,
    LoaderArgs,
} from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { json } from "@remix-run/node"
import { Stack, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MiniThinCard from "~/components/reusable-components/minor/MiniThinCard";
// import DetailsCard from "~/components/reusable-components/minor/DetailsCard";
import RedirectQButton from "~/components/reusable-components/minor/RedirectQButton";
import MessageCard from "~/components/reusable-components/minor/MessageCard";

import { getMemberList, getMember } from "~/utils/display.server";

import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



// get the pre-defined number of members to display (req on server)
export async function loader({ request }: LoaderArgs) {
    const displayMembers = await getMemberList(request);

    return json(displayMembers);
}

// export async function action({ request }: ActionArgs) {
//     const retMember = await getMember(request);
//     return json(retMember);
// }

// exports the 'index' member hall route - the parent of subsequent member hall content
export default function MemberHallRoute() {    
    const theme = useTheme();
    const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));
    const data = useLoaderData<typeof loader>();


    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<string[]>([]);

    // console.log(`data: ${JSON.stringify(data, null, 4)}`)


    // const [currentUser, setCurrentUser] = useState<any>(null);

    // useEffect(() => {
    //     if (cardId || cardId !== currentUser) {
    //         // console.log(`currentUser cardId (context var) after change: ${cardId}`);
    //     }
    // }, [cardId, currentUser, data])



    return (
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>
            <Box sx={{
                display: 'flex', 
                position: 'sticky', 
                top: smAndDown ? 56 : 62, 
                height: 60, 
                marginBottom: '-60px', 
                flexGrow: 1,
                zIndex: 2,
                backdropFilter: 'blur(4px)',
                background: 'rgba(18, 18, 18, 0.63)',
                // display: 'block', 
                // width: '100%', 
                // border: '1px solid lightblue',
                }} 
            />
            <Grid2 
                container 
                spacing={2} 
                sx={{
                    // height: '100%', 
                    m: 2, 
                    mt: 2.5, 
                    zIndex: 3
                }}>
                <Grid2 xs={12} md={7}>
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        position: 'sticky',
                        top: 80,
                        zIndex: 2,
                        }}>
                        <Typography variant="h5" sx={{ml: .25, mt: '.auto', mb: .5}}>members</Typography>
                        <Typography variant="body2" sx={{mr: .25, mt: 'auto', mb: 1}}>select to add</Typography>
                    </div>
                    <Stack direction="column" spacing={1.5} sx={{zIndex: 0}}> 
                        {
                            data.map((member: any) => (
                                <MiniThinCard 
                                    key={`card-${member.id}`}
                                    props={{
                                        id: member.id,
                                        header: member.username,
                                        data1: member.devType,
                                        data2: member.skills,
                                        availability: member.available,
                                    }}
                                    />
                                )
                            )
                        }
                    </Stack>
                </Grid2>
                <Grid2 md={5} sx={{ display: { xs: 'none', sm: "none", md: "block", zIndex: 3}}}>
                    <div style={{position: 'sticky', top: 80, zIndex: 3}}>
                        <div style={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                flexWrap: 'nowrap', 
                                width: '100%', 
                                justifyContent: 'space-between'
                            }}>
                            <Typography variant="h5" sx={{ ml: .25, mb: .5 }}>
                                details
                            </Typography>
                        </div>
                        <div style={{display: 'block'}}>
                            <Stack direction="column" spacing={2}>
                                <Box flexGrow={1}>
                                    {/* The details card */}
                                    <Outlet />
                                </Box>
                                <RedirectQButton 
                                    props={{
                                        redirectHeader: "assembling a new crew?", 
                                        toWhere: "team"
                                    }} 
                                    />
                            </Stack>
                        </div>
                    </div>
                </Grid2>
            </Grid2>
            <div style={{zIndex: 4}}>
                <MessageCard />
            </div>
            
            </MultiselectProvider>
        
    );
}