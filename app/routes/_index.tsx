// import type { User } from "@prisma/client";
import type { 
	LoaderArgs 
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData  } from "@remix-run/react";

// import styles from "~/styles/global.css";
import { getUser } from '~/utils/session.server';



export const loader = async ({ request }: LoaderArgs) => {
	const user = await getUser(request);
	return json({ user });
};


export default function IndexPage() {
	const data = useLoaderData<typeof loader>();

	return (
		
		<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
			{
				data.user ? (
					<>
						<h1>Logged in</h1>
						<p>Click <Link to="dashboard">here</Link> to go to dashboard</p>
					</>
				) : (
					<>
						<h1>Not logged in</h1>
						<p>Click <Link to="login">here</Link> to go to login</p>
					</>
				)
			}
		</div>
	);
}
