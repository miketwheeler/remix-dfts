
import  Grid2 from '@mui/material/Unstable_Grid2';
import { 
    Box, 
    Stack, 
    Skeleton, 
    Typography,
    Divider,
    Paper,

} from '@mui/material';
interface Props {
    children: React.ReactNode;
    title: string;
    subheader: string;
    columnCount: number;

}

// function useStyles() {
//     throw new Error("Function not implemented.");
// }


export default function Page(props: Props) {
    const { children, title, subheader, columnCount } = props;
    // const classes = useStyles();

    return (
        <Box>
            <h4>{ title }</h4>
            {
                
            }
            <Grid2 container spacing={3}>
                <Grid2 xs={12}>
                    <Paper >
                        <Typography variant="h4" component="h1" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {subheader}
                        </Typography>
                        <Divider />
                        <br />
                        <Grid2 container spacing={3}>
                            {children}
                        </Grid2>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
}

