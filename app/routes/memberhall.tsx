import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node"
import ListAndDetailMain from "~/components/reusable-components/major/ListAndDetailMain";

import { getMemberList } from "~/utils/display.server";

import { MultiselectProvider } from "~/components/client-context/MultiselectContext";



type SelectedObject = {
    id: string,
    name: string,
}

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


// get the pre-defined number of members to display (req on server)
export async function loader({ request }: LoaderArgs) {
    const displayMembers = await getMemberList(request);

    return json(displayMembers);
}


// exports the 'index' member hall route - the parent of subsequent member hall content
export default function MemberHallRoute() {
    const [cardId, setCardId] = useState<string>("");
    const [cardIdList, setCardIdList] = useState<SelectedObject[]>([]);

    return (
        <MultiselectProvider cardId={cardId} cardIdList={cardIdList} setCardId={setCardId} setCardIdList={setCardIdList}>
            <ListAndDetailMain props={membersSpecificProps} />
        </MultiselectProvider>
    );
}