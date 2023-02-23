import { Button, Typography, Box } from "@mui/material";
import { Link } from "@remix-run/react";


const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'nowrap', 
    justifyContent: 'center',
    py: 3,
    boxShadow: '1px 3px 13px black'
}

const RedirectQButton = ({props}: any) => {
    return (
        <Box sx={flexRowStyle}>
            <Typography 
                variant="body2" 
                sx={{my: 'auto', mr: 2}}
                >
                {props.redirectHeader}
            </Typography>
            <Button
                variant="contained"
                type="button"
                component={ Link }
                to={`/${props.toWhere}`}
                >
                create {props.toWhere}
            </Button>
        </Box>
    )
};

export default RedirectQButton;
