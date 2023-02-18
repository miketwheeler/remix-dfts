// import * as React from "react";
import type { 
	LoaderArgs 
} from "@remix-run/node";
import {
    Link,
    useLoaderData,
    useParams,
} from '@remix-run/react';
import { json } from "@remix-run/node";
import LayoutPage from "~/components/reusable-components/major/LayoutPage";
// This user's dashboard home page - loaded components
import  AcctOverviewCard from "~/components/reusable-components/minor/AcctOverviewCard";

import { getUserAffiliated, getUserData } from "~/utils/userData.server";
import { getUser } from "~/utils/session.server";



// Class constructor for passing data & data-shape to LayoutPage component
class ColumnData {
    constructor(init?: Partial<ColumnData>) {
        Object.assign(this, init)
    }
    title?: string;
    heading?: string;
    elements?: JSX.Element[];
}

export async function loader({ request }: LoaderArgs) {
    const userAffiliated = await getUserAffiliated(request);
    const userData = await getUserData(request);
    console.log(
        'userData: ', JSON.stringify(userData, null, 4), 
        'userAffiliated: ', JSON.stringify(userAffiliated, null, 4)
    );
    return json({ userAffiliated: userAffiliated, userData: userData });
}


// Dashboard default or "home" component/page
export default function DashboardHomeRoute() {
    const allUserData = useLoaderData<typeof loader>();
    // Temporary data for testing layout scheme - will need to be passed in as props or fetched from db
    const data = [];
    const testElementArr = [
        <div key="child-1">This is a passed child for testing generic Page component.</div>,
        <div key="child-2">This is a passed child for testing generic Page component.</div>,
        <div key="child-3">This is a passed child for testing generic Page component.</div>
    ]
    data.push(new ColumnData({
        title: 'current affairs', 
        elements: [
            <AcctOverviewCard key="acct-overview-card" props={allUserData} />
        ]
    }));
    data.push(new ColumnData({title: 'recent', elements: testElementArr}));
    // data.push(new ColumnData({title: '3rd column', elements: testElementArr}));


    // Returns a Page Layed out into columns accoring to passed data object contents & layout vals 
    return (
        <>
            <LayoutPage columnWidths={[4, 8]} children={data} />
        </>
    );
}

export function ErrorBoundary() {
    // const { data } = useParams();
    return (
        <div className="error-container">
            <h1>Something went wrong</h1>
            {`There was an error loading the data.`}
            <Link to="/">Go home</Link>
        </div>
    );
}