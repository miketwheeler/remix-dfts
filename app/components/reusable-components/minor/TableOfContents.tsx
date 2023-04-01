import { Typography } from "@mui/material";
import { Link } from "@remix-run/react";





const TableOfContents = ({props}: any) => {
    const data = props;

    return (
        <nav aria-label="table of contents" >
            <Typography variant="h5" component="h1" gutterBottom>
                Table of Contents
            </Typography>
            <Typography variant="body1" gutterBottom>
                <ul>
                    {
                        data?.tableOfContents.map((toc: any) => {
                            return (
                                <li key={`table-of-contents-${toc?.title}`} >
                                    <a href={toc.link}>
                                        {toc.title}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </Typography>
        </nav>
    )
}

export default TableOfContents;