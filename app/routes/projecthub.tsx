import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { json } from "@remix-run/node";
import ListAndDetailMain from "~/components/reusable-components/major/ListAndDetailMain";

import { getProjectList } from "~/utils/display.server";

import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



type SelectedObject = {
    id: string,
    name: string,
}

const projectSpecificProps = {
    mainHeaders: {
        main: "projects",
    },
    miniThinCardProps: {
        miniThinCardType: 0,
    }, 
    redirectQButtonProps: {
        message: "creating a new project?",
        redirectToValue: "create-project",
    },
    messageBoxProps: {
        messageBoxType: 1,
        primaryHeader: "ask to join or co-op a project",
        secondaryHeader: "select projects to message",
        redirectToValue: "dashboard", // TODO: change to dispatch to current project(s)' owner
    },
    detailsCardProps: {
        detailsCardType: 0,
    }
}

// get the pre-defined number of members to display (req on server)
export async function loader({ request }: LoaderArgs) {
    const displayProjects = await getProjectList(request);

    return json(displayProjects);
}


export default function ProjectHubRoute() {    
    const data = useLoaderData();

    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<SelectedObject[]>([]);

    return (
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>
            <ListAndDetailMain props={{specProps: projectSpecificProps, allData: data}} />
        </MultiselectProvider>
    );
}