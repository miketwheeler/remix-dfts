import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node"
import { Stack, Paper, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MiniThinCard from "~/components/reusable-components/minor/MiniThinCard";
import DetailsCard from "~/components/reusable-components/minor/DetailsCard";

// server-side imports
import { requireUserId } from "~/utils/session.server";
import RedirectQButton from "~/components/reusable-components/minor/RedirectQButton";

import MessageCard from "~/components/reusable-components/minor/MessageCard";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}

// TODO: DATA: get 12; for each user that is != this user: get username, get devtype, get skills, get availability values... get next 12... etc.
// or get +12 on button --action


// exports the 'index' page of the member hall route - the parent of subsequent member hall content
export default function MemberHallRoute() {    
    // TODO: get the loader data and save to local variable

    return (
        <Grid2 container spacing={2} sx={{height: '100%', m: 2, mt: 2.5}}>
            <Grid2 
                xs={12}
                md={7} 
                // sx={{border: '1px dotted lightblue'}}
                >
                <div style={{
                        display: 'flex', 
                        flexBasis: 'row', 
                        flexWrap: 'nowrap', 
                        justifyContent: 'space-between', 
                        marginBottom: 1,
                        position: 'sticky',
                        top: 80,
                        boxShadow: '0px 0px 8px 2px rgba(23,23,23,0.85)',
                        background: 'rgba(23,23,23,0.85)',
                        // background: 'linear-gradient(0deg, rgba(23,23,23,0.14627100840336138) 0%, rgba(23,23,23,0.6084558823529411) 14%, rgba(23,23,23,0.7961309523809523) 42%, rgba(23,23,23,0.8605567226890756) 75%)'                        
                        }}>
                    <Typography variant="h5" sx={{ml: .25}}>members</Typography>
                    <Typography variant="body2" sx={{mr: .25, mt: 'auto', mb: .5}}>select to add</Typography>
                </div>
                
                <Stack direction="column" spacing={1.5}>
                    {/* TODO: FUTURE: assemble the components, pasing the loader data via props/prop names */}
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                    <MiniThinCard props={{heading: 'username', data1: 'devtype', data2: 'skill1, skill2...+4 more', availability: 'available'}} />
                </Stack>
            </Grid2>
            <Grid2 md={5} sx={{display: { xs: 'none', sm: "none", md: "block"}, border: '1px dotted pink'}}>
                <div style={{position: 'sticky', top: 80}}>
                    <div style={{display: 'flex', flexBasis: 'row', flexWrap: 'nowrap', width: '100%', justifyContent: 'space-between'}}>
                        <Typography variant="h5" sx={{ml: .25}}>details</Typography>
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
    );
}