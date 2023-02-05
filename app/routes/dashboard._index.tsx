import { Box, Button, Paper } from "@mui/material";
import { Link } from "@remix-run/react";
import { Outlet } from "@remix-run/react";


import CustomTabs from "~/components/CustomTabs";
import GenericPage from "~/components/reusable-components/major/GenericPage";


const containerStyles = {
    padding: '2rem',
}

class ColumnData {
    constructor(init?: Partial<ColumnData>) {
        Object.assign(this, init)
    }
    title?: string;
    heading?: string;
    elements?: JSX.Element[];
}

// dashboard default or "home" component/page
export default function DashboardHomeRoute() {

    const data = [];
    const testElementArr = [
        <div key="child-1">This is a passed child for testing generic Page component.</div>,
        <div key="child-2">This is a passed child for testing generic Page component.</div>,
        <div key="child-3">This is a passed child for testing generic Page component.</div>   
    ]
    data.push(new ColumnData({title: '1st column', heading: '1st column heading', elements: testElementArr}));
    data.push(new ColumnData({title: '2nd column', heading: '2nd column heading', elements: testElementArr}));
    data.push(new ColumnData({title: '3rd column', heading: '3rd column heading', elements: testElementArr}));


    return (
        // <Box style={containerStyles}>
        //     <h3 style={{color: 'purple'}}>Dashboard - Home Tab</h3>
        //     <p>We'll include this index dashboard component when landing on Dashboard.</p>
        //     <br />
        //     <h5>Select tab to navigate to a different dashboard page!</h5>
        //     <br />
        //     <br />
        //     <div>
        //         <p>This is the dashboard home page. </p>
        //     </div>
        //     <div>
        //         <Button variant="contained" color="primary" >Mui Button</Button>
        //     </div>
        // </Box>
        <>
            <GenericPage 
                title="Dashboard-Home Tab" 
                heading="Dashboard home generic component displayed"
                columnWidths={[3, 5, 4]}
                children={data}
                />
            {/* <GenericPage 
                title="Dashboard-Home Tab" 
                heading="Dashboard home generic component displayed"
                columnCount={3}
                rowCount={1}
                children={[<div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>]} 
                /> */}
        </>
    );
}