import { Button, Typography, Box } from "@mui/material";
import { Link } from "@remix-run/react";


const flexRowStyle = { 
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    my: 'auto',
    py: 1.5,
    px: 1,
    zIndex: 0,
    boxShadow: '1px 3px 13px black'
}

const RedirectQButton = ({props}: any) => {
    return (
        <Box sx={ flexRowStyle }>
            <Box sx={{ my: 'auto', py: 0.5 }}>
                <Typography 
                    variant="body2" 
                    sx={{ my: 'auto', mr: 2, minWidth: '100px' }}
                    >
                    { props.redirectHeader }
                </Typography>
            </Box>
            <Box sx={{ my: 'auto', py: 0.5 }}>
                <Button
                    variant="contained"
                    type="button"
                    component={ Link }
                    to={ `/${props.toWhere}` }
                    sx={{ minWidth: '100px'}}
                    >
                    create {props.toWhere}
                </Button>
            </Box>
        </Box>
    )
};

export default RedirectQButton;
