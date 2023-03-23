import type { LoaderArgs } from "@remix-run/node";
// import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { json } from "@remix-run/node"
import ListAndDetailMain from "~/components/reusable-components/major/ListAndDetailMain";
// import { Stack, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";
// import MiniThinCard from "~/components/reusable-components/minor/MiniThinCard";
// import RedirectQButton from "~/components/reusable-components/minor/RedirectQButton";
// import MessageCard from "~/components/reusable-components/minor/MessageCard";

import { getMemberList } from "~/utils/display.server";

import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



type SelectedObject = {
    id: string,
    name: string,
}

// get the pre-defined number of members to display (req on server)
export async function loader({ request }: LoaderArgs) {
    const displayMembers = await getMemberList(request);

    return json(displayMembers);
}

// const styles = {
//     gridLayoutStyles: { m: 2, mt: 2.5, zIndex: 3 },
//     headerContainerStyles: {
//         display: 'flex', 
//         flexDirection: 'row', 
//         justifyContent: 'space-between', 
//         position: 'sticky',
//         top: 80,
//         zIndex: 3,
//     },
//     mainHeaderStyles: { ml: .25, mt: '.auto', mb: .5 },
//     secondaryHeaderStyles: { mr: .25, mt: 'auto', mb: 1 },
//     gridLayoutSecondaryColumnStyles: {
//         display: {
//             xs: 'none',
//             sm: "none",
//             md: "block",
//             zIndex: 3
//         }
//     },
//     detailsHeaderContainerStyles: {
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'nowrap',
//         width: '100%',
//         justifyContent: 'space-between'
//     },
//     detailsHeaderStyles: { ml: .25, mb: .5 },
//     detailsSectionStyles: {position: 'sticky', top: 80, zIndex: 3},
//     detailsContentContainerStyles: { display: 'block' },
//     messageBoxContainerStyles: { zIndex: 4 },
// }

const membersSpecificProps = {
    mainHeaders: {
        main: "members",
    },
    miniThinCardProps: {
        miniThinCardType: 1,
    }, 
    redirectQButtonProps: {
        message: "assembling a new crew?",
        redirectToValue: "team",
    },
    messageBoxProps: {
        messageBoxType: 1,
        primaryHeader: "send a message to connect",
        secondaryHeader: "select members to message",
        redirectToValue: "/dashboard", // TODO: change to dispatch to current project(s)' owner
    },
    detailsCardProps: {
        detailsCardType: 1,
    }
}


// export async function action({ request }: ActionArgs) {
//     const retMember = await getMember(request);
//     return json(retMember);
// }

// exports the 'index' member hall route - the parent of subsequent member hall content
export default function MemberHallRoute() {    
    // const theme = useTheme();
    // const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));
    // const data = useLoaderData<typeof loader>();

    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<SelectedObject[]>([]);

    // glass-header background - needs access to dynamic media query 
    // const glassHeaderBackgroundComponent = {
    //     display: 'flex', 
    //     position: 'sticky', 
    //     top: smAndDown ? 56 : 62, 
    //     height: 60, 
    //     marginBottom: '-60px', 
    //     flexGrow: 1,
    //     zIndex: 3,
    //     backdropFilter: 'blur(4px)',
    //     background: 'rgba(18, 18, 18, 0.63)',
    // }


    return (
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>
            <ListAndDetailMain props={membersSpecificProps} />
        </MultiselectProvider>
    );
}



//  <Box sx={glassHeaderBackgroundComponent} />
//             <Grid2 container spacing={2} sx={styles.gridLayoutStyles}>
//                 <Grid2 xs={12} md={7}>
//                     <Box sx={styles.headerContainerStyles}>
//                         <Typography variant="h5" sx={styles.mainHeaderStyles}>members</Typography>
//                         <Typography variant="body2" sx={styles.secondaryHeaderStyles}>select to add</Typography>
//                     </Box>
//                     <Stack direction="column" spacing={1.5}> 
//                         {
//                             data.map((item: any) => (
//                                 <MiniThinCard 
//                                     key={`card-${item.id}`}
//                                     props={{
//                                         id: item.id,
//                                         header: item.username,
//                                         data1: item.devType,
//                                         data2: item.skills,
//                                         availability: item.available,
//                                     }}
//                                     />
//                                 )
//                             )
//                         }
//                     </Stack>
//                 </Grid2>
//                 <Grid2 md={5} sx={styles.gridLayoutSecondaryColumnStyles}>
//                     <Box sx={styles.detailsSectionStyles}>
//                         <Box sx={styles.detailsHeaderContainerStyles}>
//                             <Typography variant="h5" sx={styles.detailsHeaderStyles}>
//                                 details
//                             </Typography>
//                         </Box>
//                         <Box sx={styles.detailsContentContainerStyles}>
//                             <Stack direction="column" spacing={2}>
//                                 {/* Render the details card of the selected minicard */}
//                                 {/* <Outlet />
//                                 <RedirectQButton 
//                                     props={{
//                                         redirectHeader: "assembling a new crew?", 
//                                         toWhere: "team"
//                                     }} 
//                                     />
//                             </Stack>
//                         </Box>
//                     </Box>
//                 </Grid2>
//             </Grid2>
//             <Box sx={styles.messageBoxContainerStyles}>
//                 <MessageCard />
//             </Box>