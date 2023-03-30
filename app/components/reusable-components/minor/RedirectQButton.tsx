import { Button, Typography, Box, Fade } from "@mui/material";
import { Link } from "@remix-run/react";


const redirectContainerStyles = { 
    flexGrow: 1, 
    py: 1.5,
    px: 1,
    zIndex: 0,
    boxShadow: '1px 3px 13px black'
}
const contentStyles = {
    display: 'flex', 
    flexBasis: "row", 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    m: 'auto',
}

const RedirectQButton = ({props}: any) => {
    return (
        <Box sx={ redirectContainerStyles }>
            <Fade in={true} timeout={{ enter: 600, exit: 10 }} easing={{ enter: 'ease-in-out' }}>
                <Box sx={ contentStyles }>
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
                            create
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Box>
    )
};

export default RedirectQButton;
