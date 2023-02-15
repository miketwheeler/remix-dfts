import type {
    LoaderArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node"
import LayoutPage from "~/components/reusable-components/major/LayoutPage";

import { requireUserId } from "~/utils/session.server";



// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	await requireUserId(request);

	return json({});
}


class ColumnData {
    constructor(init?: Partial<ColumnData>) {
        Object.assign(this, init)
    }
    title?: string;
    heading?: string;
    elements?: JSX.Element[];
}


// exports the 'index' Project Hub page as the parent of subsequent project hub content   
export default function ProjectHubRoute() {

    // Temporary data for testing layout scheme - will need to be passed in as props or fetched from db
    const data1 = [];
    const data2 = [];
    const projectTestElementArr = [
        <div key="child-1">This is a passed child for testing generic Page component.</div>,
        <div key="child-2">This is a passed child for testing generic Page component.</div>,
        <div key="child-3">This is a passed child for testing generic Page component.</div>
    ];
    const expandedTestElementArr = [<div key="child-1-expanded">This is an exploded project card.</div>];

    data1.push(new ColumnData({title: '1st column', heading: '1st column heading', elements: projectTestElementArr}));
    data2.push(new ColumnData({title: '2nd column', heading: '2nd column heading', elements: expandedTestElementArr}));


    return (
        <>
            <LayoutPage columnWidths={[5, 7]} children={[data1, data2]} />
        </>
    );
}