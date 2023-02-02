import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';
import { grey, red, purple } from '@mui/material/colors';
import { withTheme } from '@emotion/react';


// Creates the theme instance.
const theme = createTheme({
    palette: {
        // mode to dark will make the theme dark by default - still uses other settings below
        mode: 'dark',
        primary: {
            // change the primary color - appbar, tab highlights, features, etc.
            // main: '#2e7d32',
            main: purple[500],
        },
        secondary: {
            // change the secondary color - 
            // main: '#ff6f00',
            main: grey[500],
        },
        background: {
            // paper: grey[800],
            // default: grey[800],
        },
        text: {
            // primary: grey[50],
            // secondary: grey[50],
            disabled: grey[700],
        },
    },
    // typography: {
    //     allVariants: {
    //         color: grey[50],
    //     },
    // },
    components: { 
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: purple[800],
                },
            },
        }
    }

});

export default theme;