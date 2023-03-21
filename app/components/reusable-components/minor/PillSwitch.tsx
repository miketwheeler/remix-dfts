import { Switch, styled } from '@mui/material';



// Android 12 type switch - most borrowed from the MUI component docs, modified
export const PillSwitch = styled(Switch)(({ theme }) => ({
    padding: 11,
    zIndex: 2,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 12,
            height: 12
        },    
        '&:before': {
            // THIS IS A CHECK MARK 
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="-2 2 20 20"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main))}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 14
        },
        '&:after': { right: 10, },
    },
    '& .MuiSwitch-thumb': { boxShadow: 'none', width: 12, height: 12, margin: 4 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: theme.palette.primary.main, opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: theme.palette.primary.main },
}));