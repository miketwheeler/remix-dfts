import {
    Link,
    useLoaderData,
    useParams,
} from '@remix-run/react';
import LayoutPage from "~/components/reusable-components/major/LayoutPage";

// This user's dashboard home page - loaded components
import  AcctOverviewCard from "~/components/reusable-components/minor/AcctOverviewCard";


// Class constructor for passing data & data-shape to LayoutPage component
class ColumnData {
    constructor(init?: Partial<ColumnData>) {
        Object.assign(this, init)
    }
    title?: string;
    heading?: string;
    elements?: JSX.Element[];
}



// Dashboard default or "home" component/page
export default function DashboardHomeRoute() {
    // Temporary data for testing layout scheme - will need to be passed in as props or fetched from db
    const data = [];
    const testElementArr = [
        <div key="child-1">This is a passed child for testing generic Page component.</div>,
        <div key="child-2">This is a passed child for testing generic Page component.</div>,
        <div key="child-3">This is a passed child for testing generic Page component.</div>
    ]
    data.push(new ColumnData({title: 'profile', heading: 'hi', elements: [<AcctOverviewCard key="acct-overview-card" />]}));
    data.push(new ColumnData({title: '2nd column', heading: '2nd column heading', elements: testElementArr}));
    data.push(new ColumnData({title: '3rd column', heading: '3rd column heading', elements: testElementArr}));


// Returns a Page Layed out into columns accoring to passed data object contents & layout vals 
    return (
        <>
            <LayoutPage columnWidths={[3, 6, 3]} children={data} />
        </>
    );
}

export function ErrorBoundary() {
    const { data } = useParams();
    return (
        <div className="error-container">
            <h1>Something went wrong</h1>
            {`There was an error loading the data for ${data}.`}
            <Link to="/">Go home</Link>
        </div>
    );
}