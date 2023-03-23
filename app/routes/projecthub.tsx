import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node";
import ListAndDetailMain from "~/components/reusable-components/major/ListAndDetailMain";

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

const projectSpecificProps = {
    mainHeaders: {
        main: "projects",
    },
    miniThinCardProps: {
        miniThinCardType: 1,
    }, 
    redirectQButtonProps: {
        message: "creating a new project?",
        redirectToValue: "project",
    },
    messageBoxProps: {
        messageBoxType: 1,
        primaryHeader: "send a message to a project",
        secondaryHeader: "select projects to ping",
        redirectToValue: "dashboard", // TODO: change to dispatch to current project(s)' owner
    },
    detailsCardProps: {
        detailsCardType: 1,
    }
}


export default function ProjectHubRoute() {    
    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<SelectedObject[]>([]);

    return (
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>
            <ListAndDetailMain props={projectSpecificProps} />
        </MultiselectProvider>
    );
}