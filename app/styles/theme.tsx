import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';
import { grey, purple, blue } from '@mui/material/colors';



// Creates the theme instance.
const theme = createTheme({
    // Global MUI colorway settings
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
            disabled: grey[800],
        },
    },
    // typography: {
    //     allVariants: {
    //         color: grey[50],
    //     },
    // },
    components: { 
        // changes all MUI appbar styles
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(45deg, ${purple[800]}, ${purple[700]}, ${purple[500]}, ${blue[500]})`,
                    // backgroundColor: purple[700],
                },
            },
        },
        // changes all MUI buttons styles
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        }
    }

});

export default theme;