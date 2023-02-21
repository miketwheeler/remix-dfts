import {
    Link,
    useLoaderData,
    useParams,
} from '@remix-run/react';




export default function DashboardProjectRoute() {
    return (
        <div>
            <h3 style={{color: 'purple'}}>Dashboard - Project Tab</h3>
            <br />
            <br />
            
        </div>
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