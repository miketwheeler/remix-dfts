import { Button } from "@mui/material";
import { Outlet } from "@remix-run/react";
import CustomTabs from "~/components/CustomTabs";


const handleBackButton = () => {
    window.history.back();
}

// Dashboard layout component   
export default function DashboardRoute() {
    return (
        <div>
            <CustomTabs />
            <Outlet />
            {/* <br />
            <br />
            <Button type='button' onClick={handleBackButton}>Go Back</Button> */}
        </div>
    );
}