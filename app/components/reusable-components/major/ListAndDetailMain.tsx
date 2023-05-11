import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
// import { useState } from "react";
import { json } from "@remix-run/node"
import { Stack, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import MiniThinCard from "~/components/reusable-components/minor/MiniThinCard";
import RedirectQButton from "~/components/reusable-components/minor/RedirectQButton";
import MessageCard from "~/components/reusable-components/minor/MessageCard";

// import { 
//     getMemberList, 
//     getProjectList,
//     getProject,
// } from "~/utils/display.server";

// import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



// type SelectedObject = {
//     id: string,
//     name: string,
// }


// get the pre-defined number of members to display (req on server)
// export async function loader({ request }: LoaderArgs) {
//     const displayProject = await getProject(request);
//     return json(displayMembers);
// }
// export async function loader({ request }: LoaderArgs) {
//     const displayMembers = await getMemberList(request);
//     return json(displayMembers);
// }

const styles = {
    gridLayoutStyles: { m: 2, mt: 2.5, zIndex: 3 },
    headerContainerStyles: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'sticky',
        top: 80,
        zIndex: 3,
    },
    mainHeaderStyles: { ml: .25, mt: '.auto', mb: .5 },
    secondaryHeaderStyles: { mr: .25, mt: 'auto', mb: 1 },
    gridLayoutSecondaryColumnStyles: {
        display: {
            xs: 'none',
            sm: "none",
            md: "block",
            zIndex: 3
        }
    },
    detailsHeaderContainerStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        justifyContent: 'space-between'
    },
    detailsHeaderStyles: { ml: .25, mb: .5 },
    detailsSectionStyles: {position: 'sticky', top: 80, zIndex: 3},
    detailsContentContainerStyles: { display: 'block' },
    messageBoxContainerStyles: { zIndex: 4 },
}


// exports the 'index' member hall route - the parent of subsequent member hall content
export default function ListAndDetailMain({props}: any) {    
    // const location = useLocation().pathname.split('/')[1];
    const { specProps, allData } = props;
    const { mainHeaders, miniThinCardProps, redirectQButtonProps, messageBoxProps, detailsCardProps } = specProps;
    const data = allData; // const data = useLoaderData();

    const theme = useTheme();
    const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));
    
    // const [cardId, setCardId] = useState<string>("");
    // const [cardIdList, setCardIdList] = useState<SelectedObject[]>([]);

    // console.log(`props: ${JSON.stringify(allData, null, 4)}`)

    // glass-header background - needs access to dynamic media query 
    const glassHeaderBackgroundComponent = {
        display: 'flex', 
        position: 'sticky', 
        top: smAndDown ? 56 : 62, 
        height: 60, 
        marginBottom: '-60px', 
        flexGrow: 1,
        zIndex: 3,
        backdropFilter: 'blur(4px)',
        background: 'rgba(18, 18, 18, 0.63)',
    }

    return (
        <>
            <Box sx={glassHeaderBackgroundComponent} />
            <Grid2 container spacing={2} sx={styles.gridLayoutStyles}>
                <Grid2 xs={12} md={7}>
                    <Box sx={styles.headerContainerStyles}>
                        <Typography variant="h5" sx={styles.mainHeaderStyles}>{mainHeaders.main}</Typography>
                        <Typography variant="body2" sx={styles.secondaryHeaderStyles}>select to add</Typography>
                    </Box>
                    <Stack direction="column" spacing={1.5}> 
                        {
                            data.map((item: any) => (
                                <MiniThinCard 
                                    key={`card-${item.id.toString()}`}
                                    props={{
                                        id: item.id,
                                        header: (item.username || item.name) ?? "header",
                                        data1: (item.devType || item.type) ?? "primary data",
                                        data2: item.skills || null,
                                        data3: item.synopsis || null,
                                        availability: (item.available || item.active) ?? false,
                                        miniThinCardProps: miniThinCardProps,
                                        passContext: { detailsCardType: detailsCardProps.detailsCardType, data: allData }
                                    }}
                                />
                            ))
                        }
                    </Stack>
                </Grid2>
                <Grid2 md={5} sx={styles.gridLayoutSecondaryColumnStyles}>
                    <Box sx={styles.detailsSectionStyles}>
                        <Box sx={styles.detailsHeaderContainerStyles}>
                            <Typography variant="h5" sx={styles.detailsHeaderStyles}>
                                details
                            </Typography>
                        </Box>
                        <Box sx={styles.detailsContentContainerStyles}>
                            <Stack direction="column" spacing={2}>
                                {/* DETAILS CARD */}
                                <Outlet context={{ detailsCardType: detailsCardProps.detailsCardType, data: allData }} />
                                <RedirectQButton 
                                    props={{
                                        redirectHeader: redirectQButtonProps.message, 
                                        toWhere: redirectQButtonProps.redirectToValue
                                    }} 
                                    />
                            </Stack>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <Box sx={styles.messageBoxContainerStyles}>
                <MessageCard props={messageBoxProps} />
            </Box>
        </>
    );
}