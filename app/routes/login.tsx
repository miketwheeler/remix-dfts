// import type { LinksFunction } from '@remix-run/node';
import { Link, useSearchParams } from '@remix-run/react';
import Grid from "@mui/material/Unstable_Grid2";
import { json } from '@remix-run/node';
// import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
	Box,
	Stack,
	Skeleton,
	Typography,
	Divider,
} from "@mui/material";

// import for data from DB
import { db } from "~/utils/db.server";

// export const links: LinksFunction = () => [
//     { rel: "stylesheet", href: stylesUrl },
//   ];

const styles = {
    container: {
        flexGrow: 1,
        padding: '.5rem',
        borderRadius: '4px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,.1)',
    },

}

export default function Login() {
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username') || '';
    const password = searchParams.get('password') || '';
    return (
        <Grid container>
            <Grid sx={styles.container}>
                <h5>Login</h5>
                <form method="post">
                    <label>
                        Username
                        <input type="text" name="username" defaultValue={username} />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" defaultValue={password} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <Link to="/signup">Sign Up</Link>

            </Grid>
        </Grid>

        // <div className="container">
        //     <div className="content" data-light="">
        //         <h1>Login</h1>
        //         <form method="post">
        //             <input
        //                 type="hidden"
        //                 name="redirectTo"
        //                 value={
        //                     searchParams.get("redirectTo") ?? undefined
        //                 }
        //                 />
        //             <fieldset>
        //                 <legend className="sr-only">
        //                     Login or Register?
        //                 </legend>
        //                 <label>
        //                     <input
        //                         type="radio"
        //                         name="loginType"
        //                         value="login"
        //                         defaultChecked
        //                         />{" "}
        //                         Login
        //                 </label>
        //                 <label>
        //                     <input
        //                     type="radio"
        //                     name="loginType"
        //                     value="register"
        //                     />{" "}
        //                     Register
        //                 </label>
        //             </fieldset>
        //             <div>
        //                 <label htmlFor="username-input">Username</label>
        //                 <input
        //                     type="text"
        //                     id="username-input"
        //                     name="username"
        //                 />
        //             </div>
        //             <div>
        //                 <label htmlFor="password-input">Password</label>
        //                 <input
        //                     id="password-input"
        //                     name="password"
        //                     type="password"
        //                 />
        //             </div>
        //             <button type="submit" className="button">
        //                 Submit
        //             </button>
        //         </form>
        //     </div>
        //     <div className="links">
        //         <ul>
        //             <li>
        //                 <Link to="/">Home</Link>
        //             </li>
        //             <li>
        //                 <Link to="/jokes">Jokes</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    );
}