import { Box, Button, Paper } from "@mui/material";
import { Link } from "@remix-run/react";
import { Outlet } from "@remix-run/react";


import CustomTabs from "~/components/CustomTabs";
import GenericPage from "~/components/reusable-components/major/GenericPage";


const containerStyles = {
    padding: '2rem',
}

// dashboard default or "home" component/page
export default function DashboardHomeRoute() {
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
                columnCount={3}
                rowCount={1}
                children={[<div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>]} 
                />
            <GenericPage 
                title="Dashboard-Home Tab" 
                heading="Dashboard home generic component displayed"
                columnCount={3}
                rowCount={1}
                children={[<div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>, <div>This is a passed child for testing generic Page component.</div>]} 
                />
        </>
    );
}