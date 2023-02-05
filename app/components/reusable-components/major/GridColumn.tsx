import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Paper } from '@mui/material';



// export default function GridColumn({ columnWidth, children }: { columnWidth: number, children: React.ReactNode[] }) {
//     return (
//         children.map((child, index) => (
//             <Grid key={`grid-section-${index}`} xs={12 / columnWidth}>
//                 {child}
//             </Grid>
//         ))
//     );
// };

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Props {
    title?: string;
    heading?: string;
    columnWidth: number;
    children: Array<any>;
    elements?: Array<any>;
}

const GridColumn: React.FC<Props> = (props) => {
    return (
        <>
            <h4>{props.title}</h4>
            <h5>{props.heading}</h5>
            <Stack direction="column" spacing={2}>
                {
                    props.elements ?
                        props.elements.map((element, index) => (
                            <Item key={`column-element-${index}`}>{element}</Item>
                        ))
                    : <Item>There were no elements to iterate over!</Item>
                }
            </Stack>
            {/* {
                props.children.map((child, index) => (
                    <React.Fragment key={index}>
                        <h4>{props.title}</h4>
                        <Grid key={`grid-section-${index}`} xs={props.columnWidth}>
                            <h5>{props.heading}</h5>
                            {child}
                        </Grid>
                    </React.Fragment>
                ))
            } */}
        </>
    );
};

export default GridColumn;