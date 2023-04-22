import type {
    ActionArgs,
    MetaFunction,
    LoaderArgs,
} from "@remix-run/node";
import React, { useState, useMemo, FieldsetHTMLAttributes } from "react";
import { json, redirect } from "@remix-run/node"
import { Link, useSearchParams, Form, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Stepper, Step, StepContent, StepButton,
    Divider, 
    TextField, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio,
    Checkbox, Chip, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import Check from '@mui/icons-material/Check';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChangeCircle from '@mui/icons-material/ChangeCircle';
import { createProjectValidators } from "~/validators/validators";
import { CreateFormFields } from "~/components/reusable-components/minor/CreateFormFields";
import { ForwardBack } from "~/components/reusable-components/minor/ForwardBackStep";

// import for data from DB
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";
import { createProject } from "~/utils/project.server";
import { getUsersTeamData } from "~/utils/display.server";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import UsersTeamPicker from "~/components/reusable-components/minor/UsersTeamPicker";
import MultiselectPicker from "~/components/reusable-components/minor/MultislectPicker";



interface FormState {
    [key: string]: {
        value: string;
        error: string | null;
    }
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface TechOptionType {
	inputValue?: string;
	name: string;
}

interface Data {
	name: string;
	dateCreated: string;
	teamLead: string;
}

interface EnhancedTableProps {
	numSelected: number;
	rowCount: number;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	alignLeft: boolean;
}

// interface SubmitProps {
//     onSubmit: (formData: FormData) => Promise<void>;
// }

// requires the user to be logged in - on load, so is hack but works because of the order necessary within the login process
export async function loader({ request }: LoaderArgs) {
	// const userId = await requireUserId(request);
    const usersTeams = await getUsersTeamData(request);

	return json(usersTeams);
}

export const meta: MetaFunction = () => ({
	description: "Create a project and access it on your dashboard.",
	title: "dev foyer | create project",
});


export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();

    const name = form.getAll("name");
    const type = form.getAll("type");
    const synopsis = form.getAll("synopsis");
    const description = form.getAll("description");
    const techStack = form.get("techStack");
    const beginDate = form.get("beginDate");
    const endDate = form.get("endDate");
    const active = form.get("active");
    const fundingGoal = form.get("fundingGoal");
    const team = form.get('team');
    const json = form.get("json");
    // const name = newFormState.name.value;

	const redirectTo = createProjectValidators.validateUrl(form.get("redirectTo")?.toString() ?? "/dashboard/project");

	if (
		typeof name !== "string" ||
        typeof type !== "string" ||
        typeof synopsis !== "string" ||
		typeof description !== "string" ||
        typeof techStack !== "string" ||
        typeof beginDate !== "string" ||
        typeof endDate !== "string" ||
        typeof active !== "string" ||
        typeof fundingGoal !== "number" ||
        typeof team !== "string" ||
		typeof redirectTo !== "string" 
	) {
		return badRequest({
			fieldErrors: null,
			fields: null,
			formError: "Something went wrong when submitting the form. Please try again.",
		});
	}

	const fields = { 
        name: name, 
        type: type, 
        synopsis: synopsis, 
        description: description,
        techStack: techStack, 
        beginDate: beginDate, 
        endDate: endDate, 
        active: active, 
        fundingGoal: fundingGoal, 
        team: team,
    };
	const fieldErrors = {
        name: createProjectValidators.validateProjectName(name),
        type: createProjectValidators.validateProjectType(type),
        synopsis: createProjectValidators.validateProjectSynopsis(synopsis),
        description: createProjectValidators.validateProjectDescription(description),
        techStack: createProjectValidators.validateProjectTechStack(techStack),
        beginDate: createProjectValidators.validateDate(beginDate),
        endDate: createProjectValidators.validateDate(endDate),
        fundingGoal: createProjectValidators.validateProjectFundingGoal(fundingGoal),
        // projectTeam: validateProjectTeam(projectTeam),
	};
	if(Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
			formError: null,
		});
	}
    const projectExists = await db.project.findFirst({
        where: { name },
    });
    if(projectExists) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Project with the name ${name} already exists`,
        });
    }
    // create the project && create their session and redirect to /dashboard
    const project = await createProject({ 
        name,
        type,
        synopsis,
        description,
        techStack,
        beginDate,
        endDate,
        active,
        fundingGoal,
        teamId: team,
    });
    if(!project) {
        return badRequest({
            fieldErrors: null,
            fields,
            formError: `Something went wrong creating your new project.`,
        });
    }

    return redirect("/dashboard/project");
};

const styles = {
	container: {
		flexGrow: 1,
		padding: ".5rem",
		borderRadius: "4px",
        mx: 2,
        my: 2,
		boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
	},
    paper: {
        padding: "1rem 2rem 2rem",
    }
};

const steps = [
    {
        label: "name & category",
        description: "give your project a name and general category: this will allow others to find your project and whether their skill set is a good fit",
        fieldNames: ["name", "type"],
    },
    {
        label: "synopsis & description",
        description: "you'll need to provide a description for your project: a synopsis should be an brief abstract (as much info as you want to exhibit publicly) that is public faciing - limited is probably best. Then include a bit more detail in your description that will only be available to who you share it with directly",
        fieldNames: ["synopsis", "description"],
    },
    {
        label: "tech stack",
        description: "what tech or tech stack will you be using? this is a great way to find others and for them to find you quickly, it's also good to define the scope up front",
        fieldNames: ["techStack"],
    },
    {
        label: "development timeframe & status",
        description: "give a start, end date, and if you'd like to set it as active -- you can change this later if you need to",
        fieldNames: ["beginDate", "endDate", "active"],
    },
    {
        label: "funding goal",
        description: "lets set a rough estimate for a funding goal: a funding goal is part-motivation part-estimation -- you can change this later as needed",
        fieldNames: ["fundingGoal"],
    },
    {
        label: "assign a team",
        description: "you can assign a team to your project: this will allow you to share your project with them and they can contribute to it as well",
        fieldNames: ["team"],
    }
];

const formFieldData = [
    {
        name: {
            name: "name",
            label: "project name",
            required: true,
        },
        type: {
            name: "type",
            label: "project type (e.g. web app, mobile app, etc.)",
            required: true,
        },
    },
    {
        synopsis: {
            name: "synopsis",
            label: "synopsis (shortened description)",
            required: true,
        },
        description: {
            name: "description",
            label: "description (full description)",
            required: true,
        },
    },
    {
        techStack: {
            name: "techStack",
        },
    },
    {
        beginDate: {
            name: "beginDate",
            label: "begin date (mm/dd/yyyy)",
            required: true,
        },
        endDate: {
            name: "endDate",
            label: "end date (mm/dd/yyyy)",
            required: true,
        },
        active: {
            name: "active",
        },
    },
    {
        fundingGoal: {
            name: "fundingGoal",
            label: "funding goal",
        },
    },
    {
        team: { 
            name: "team",
        },
    }
];

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				thousandSeparator
				valueIsNumericString
				prefix="$"
			/>
		);
	}
);
const validateDate = (date: string) => {
    const regex = /^([0-9]{1,2})\/?([0-9]{1,2})?\/?([0-9]{0,4})?$/;
    const match = date.replace(/\D/g, '').match(regex);
    if(match === null) {
        return '';
    }
    let formatted = '';
    if(match[1]) {
        formatted += match[1];
        if(match[2]) {
            formatted += '/' + match[2];
            if(match[3]) {
                formatted += '/' + match[3];
            }
        }
    }
    return formatted;
} 
const validateField = (name: string, value: string): string | null => {
    switch (name) {
        case "name":
            return (value.length > 2) ? null : "name must be at least 3 characters";
        case "type":
            return (value.length > 4) ? null : "type must be at least 3 characters";
        case "synopsis":
            return (value.length > 10) ? null : "synopsis is a sentance and must be at least 10 characters";
        case "description":
            return (value.length > 60) ? null : "description is too short, it must be at least 60 characters";
        case "techStack":
            return (value?.split(',').length > 2) ? null : "tech stack cannot consist of 0 technologies";
        case "beginDate":
            return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
        case "endDate":
            return (value.length >= 10) ? null : "that is not a valid date, please use the format mm/dd/yyyy";
        case "fundingGoal":
            return (Number(value) >= 1) ? null : "funding goal should at least be a dollar";
        default:
            return null;
    }
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions<TechOptionType>();
const topTech: readonly TechOptionType[] = [
    { name: "React" },
    { name: "Vue" },
    { name: "Angular" },
    { name: "Svelte" },
    { name: "Ember" },
    { name: "Backbone" },
    { name: "Meteor" },
    { name: "Node" },
    { name: "Express" },
    { name: "Next" },
    { name: "Nuxt" },
    { name: "Gatsby" },
    { name: "Sapper" },
    { name: "React Native" },
    { name: "Flutter" },
    { name: "Ionic" },
    { name: "Cordova" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "Sass" },
    { name: "Less" },
    { name: "Stylus" },
    { name: "Tailwind" },
    { name: "Bootstrap" },
    { name: "Material UI" },
    { name: "Chakra UI" },
    { name: "Ant Design" },
    { name: "React Bootstrap" },
    { name: "Reactstrap" },
    { name: "React Toolbox" },
    { name: "React Virtualized" },
    { name: "Remix" },
    { name: "Redux" },
    { name: "Blazor WebAssembly" },
    { name: "Blazor Server" },
    { name: "ASP.NET Core" },
    { name: "ASP.NET MVC" },
    { name: "ASP.NET Web Forms" },
    { name: "Razor"},
    { name: "Razor Pages" },
    { name: "Entity Framework" },
    { name: "Entity Framework Core" },
    { name: "Redux Toolkit (RTK)"},
    { name: "RTK Query"},
    { name: "Zustand" },
    { name: "TypeScript" },
    { name: "JavaScript" },
    { name: "Java" },
    { name: "C#" },
    { name: "Python" },
    { name: "Django"},
    { name: "Flask" },
    { name: "Django REST Framework" },
    { name: "PHP" },
    { name: "C++" },
    { name: "C" },
    { name: "Go" },
    { name: "Ruby" },
    { name: "Swift" },
    { name: "Kotlin" },
    { name: "Rust" },
    { name: "Dart" },    
    { name: "SQL" },
    { name: "MySQL" },
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "Redis" },
    { name: "Firebase" },
    { name: "SQLite" },
    { name: "MariaDB" },
    { name: "Oracle" },
    { name: "Elasticsearch" },
    { name: "Cassandra" },
    { name: "DynamoDB" },
    { name: "Couchbase" },
    { name: "Neo4j" },
    { name: "RethinkDB" },
    { name: "RabbitMQ" },
    { name: "Kafka" },
    { name: "Hadoop" },
    { name: "HBase" },
    { name: "AWS" },
    { name: "Azure" },
    { name: "Google Cloud" },
    { name: "Heroku" },
    { name: "Digital Ocean" },
    { name: "Netlify" },
    { name: "Vercel" },
    { name: "Firebase" },
    { name: "Cloudflare" },
    { name: "Git" },
    { name: "GitHub" },
    { name: "Linux" },
    { name: "Windows" },
    { name: "MacOS" },
    { name: "iOS" },
    { name: "Android" },
    { name: "Chrome OS" },
    { name: "Ubuntu" },
    { name: "Debian" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "GraphQL" },
    { name: "REST" },
    { name: "gRPC" },
    { name: "SOAP" },
    { name: "WebSockets" },
    { name: "Socket.IO" },
    { name: "XML" },
    { name: "JSON" },
    { name: "YAML" },
    { name: "CSV" },
    { name: "Jest" },
    { name: "Mocha" },
    { name: "Chai" },
    { name: "Enzyme" },
    { name: "Cypress" },
    { name: "Jasmine" },
    { name: "Karma" },
    { name: "AVA" },
    { name: "Webpack" },
    { name: "Rollup" },
    { name: "Parcel" },
    { name: "Gulp" },
    { name: "Grunt" },
    { name: "Babel" },
    { name: "ESLint" },
    { name: "Prettier" },
    { name: "NPM" },
    { name: "Yarn" },
    { name: "pnpm" },
    { name: "Bash" },
    { name: "VS Code" },
    { name: "Visual Studio" },
    { name: "IntelliJ" },
    { name: "Eclipse" },
    { name: "Adobe Photoshop" },
    { name: "Adobe Illustrator" },
    { name: "Adobe XD" },
    { name: "Figma" },
    { name: "Sketch" },
    { name: "Trello" },
    { name: "Asana" },
    { name: "Jira" },
    { name: "Slack" },
    { name: "Discord" },
    { name: "Zoom" },
    { name: "Google Meet" },
    { name: "Microsoft Teams" },
    { name: "Agile" },
    { name: "Scrum" },
    { name: "Kanban" },
    { name: "SEO" },
    { name: "SEM" },
    { name: "Google Analytics" },
    { name: "Google Ads" },
    { name: "Facebook Ads" },
    { name: "Google Tag Manager" },
    { name: "Google Search Console" },
    { name: "APIs" },
    { name: "CDNs" },
    { name: "CI/CD"},
    { name: "CMS" },
    { name: "CRMs" },
    { name: "Databases" },
    { name: "DevOps" },
    { name: "E-commerce" },
    { name: "Frameworks" },
    { name: "Frontend" },
    { name: "Full Stack" },
    { name: "Game Development" },
    { name: "Graphics" },
    { name: "Hosting" },
    { name: "Libraries" },
    { name: "Machine Learning" },
    { name: "Mobile" },
    { name: "Networking" },
    { name: "No Code" },
    { name: "Open Source" },
    { name: "Programming" },
    { name: "Prototyping" },
    { name: "QA" },
    { name: "Security" },
    { name: "Serverless" },
    { name: "Testing" },
    { name: "UI/UX" },
    { name: "Video" },
    { name: "Web Development" },
    { name: "Web Scraping" },
    { name: "Web Servers" },
    { name: "Web Sockets" },
    { name: "WebAssembly (WASM)" },
    { name: "WebRTC" },
    { name: "AngularJS" },
];

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		alignLeft: true,
		disablePadding: true,
		label: "team name",
	},
	{
		id: "dateCreated",
		alignLeft: false,
		disablePadding: false,
		label: "date team created",
	},
	{
		id: "teamLead",
		alignLeft: false,
		disablePadding: false,
		label: "team lead",
	},
];


function EnhancedTableHead(props: EnhancedTableProps) {
	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
				
				</TableCell>
				{
					headCells.map((headCell) => (
						<TableCell
							key={headCell.id}
							align={headCell.alignLeft ? "left" : "right"}
							padding={headCell.disablePadding ? "none" : "normal"}
						>
							{headCell.label}
						</TableCell>
					))
				}
			</TableRow>
		</TableHead>
	);
}


export default function CreateProject() {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
    const [activeStep, setActiveStep] = useState(0); // TODO: change back to 0 when compl testing

    const submit = useSubmit();

    // const [assignTeam, setAssignTeam] = useState({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formIsValid, setFormIsValid] = useState(false);

    var [newFormState, setNewFormState] = useState<FormState>({});

    const fundingExtraProp = { InputProps: { inputComponent: NumericFormatCustom as any } };
    const dateExtraProp = { inputProps: { maxLength: 10, minLength: 10 } };
    const multilineExtraProp = { multiline: true, rows: 5 };

    const [techNameList, setTechNameList] = React.useState<string[]>([]);
    const newArray = [] as any[];

    const userId = loaderData?.userId;
	const usersTeams = loaderData?.usersTeams?.teams;
	const [selected, setSelected] = useState<string>("");

    // Expandable Step Form Actions
    const handleStep = (step: number) => () => { setActiveStep(step) };

    const handleAllFieldsReset = () => { 
        setActiveStep(0);
        setNewFormState({}); // reset all field values' state
    };

    const checkFormIsDisabled = () => {
        return !((Object.keys(newFormState).includes("team") && newFormState["team"].value !== "")
                && Object.values(newFormState).some((field) => field.error === null))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | null;
        let formattedValue;
    
        if(name === "beginDate" || name === "endDate") {
            formattedValue = validateDate(value);
        }
        error = validateField(name, formattedValue !== undefined ? formattedValue : value);
        setNewFormState({ ...newFormState, [name]: { value: formattedValue ?? value, error } });
    };

    const handleInputObjChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
        event.preventDefault();
        setTechNameList(newValue);
    }


    const handleChangeCurrentStack = (event: React.SyntheticEvent<Element, Event>) => {
        event.preventDefault();
        setNewFormState({ ...newFormState, techStack: { value: "", error: null }})
    }

    const handleFinished = (event: React.SyntheticEvent<Element, Event>) => {
        event.preventDefault();
        for(let i = 0; i < techNameList.length; i++) {
            newArray.push(Object.values(techNameList[i]));
        }
        setNewFormState({ ...newFormState, techStack: { value: newArray.join(","), error: null } });
    }

    const handleClick = (event: React.MouseEvent<unknown>, teamId: string) => {
		let newSelected: string;

		if(selected === teamId) newSelected = "";
		else newSelected = teamId;
	
		setSelected(newSelected);
		setNewFormState({ ...newFormState, team: { value: newSelected, error: null } })
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;


    // useMemo(() => {
    //     console.log(`complete form state: ${JSON.stringify(newFormState, null, 2)}`)
    // }, [newFormState])


	return (
        
        <Box sx={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                create a new project
            </Typography>
            <Typography variant="body1" gutterBottom>
                already have a project going? go to &nbsp;
                <Link
                    to={{
                        pathname: "/dashboard/project",
                        search: searchParams.toString(),
                    }}
                    style={{ textDecoration: 'none', color: 'purple'}}
                    >
                    your projects
                </Link>
                &nbsp; -- else, let's get started
            </Typography>
            <Paper sx={styles.paper}>
                <div className="content" data-light="">
                    <Typography
                        variant="h5" 
                        sx={{my: .5, display: 'inline-flex', wrap: 'nowrap'}}
                        >
                            project
                            { newFormState.name?.value ? <div style={{opacity: .5}}>&nbsp; - {newFormState.name?.value}</div> : null }
                    </Typography>
                    <Form 
                        method="post" 
                        // id="create-project-form" 
                        // onSubmit={ handleFormSubmit }
                        >
                        {/* <input type="hidden" name="allFormValues" value={ Object(newFormState) } /> */}
                        <input
                            type="hidden"
                            name="redirectTo"
                            value={searchParams.get("redirectTo") ?? undefined}
                            />
                        <input 
                            type="hidden"
                            name="json"
                            value={JSON.stringify(newFormState)}
                            />
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(0) }>{ steps[0].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Typography>{ steps[0].description }</Typography>
                                    <Box sx={{my: 2}} key={`textfield-container-name`}>
                                        <TextField 
                                            id="name-input"
                                            name="name"
                                            required
                                            // value={ newFormState.name?.value } 
                                            variant="outlined" 
                                            label="project name"
                                            type="text"
                                            fullWidth={ true }
                                            color="secondary"
                                            // defaultValue={ actionData?.fields.name}
                                            // onChange={ handleInputChange }
                                            aria-invalid={ Boolean(actionData?.fieldErrors?.name) }
                                            // error={ Boolean(newFormState.name?.error) }
                                            // helperText={ newFormState.name?.error || "" }
                                        />
                                    </Box>
                                    <Box sx={{my: 2}} key={`textfield-container-type`}>
                                        <TextField 
                                            id="type-input"
                                            name="type"
                                            required
                                            // value={ newFormState.type?.value } 
                                            variant="outlined" 
                                            label="project type" 
                                            type="text"
                                            fullWidth={ true }
                                            color="secondary"
                                            // defaultValue={ actionData?.fields?.type}
                                            // onChange={ handleInputChange }
                                            // error={ Boolean(newFormState.type?.error) }
                                            aria-invalid={ Boolean(actionData?.fieldErrors?.type) }
                                            // aria-errormessage={ actionData?.fieldErrors?.type ? 'type-error' : null }
                                            // helperText={ newFormState.type?.error || "" }
                                        />
                                    </Box>
                                    <ForwardBack props={{ index: 0, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(1) }>{ steps[1].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Typography>{ steps[1].description }</Typography>
                                        <Box sx={{my: 2}} key={`textfield-container-synopsis`}>
                                            <TextField 
                                                id="synopsis-input"
                                                name="synopsis"
                                                required
                                                value={ newFormState.synopsis?.value } 
                                                variant="outlined" 
                                                label="synopsis"
                                                type="text"
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                error={ Boolean(newFormState.synopsis?.error) }
                                                helperText={ newFormState.synopsis?.error || "" }
                                            />
                                        </Box>
                                        <Box sx={{my: 2}} key={`textfield-container-description`}>
                                            <TextField 
                                                id="description-input"
                                                name="description"
                                                required
                                                value={ newFormState.description?.value } 
                                                variant="outlined" 
                                                label="description"
                                                type="text"
                                                fullWidth={ true }
                                                color="secondary"
                                                onChange={ handleInputChange }
                                                error={ Boolean(newFormState.description?.error) }
                                                helperText={ newFormState.description?.error || "" }
                                                {...multilineExtraProp}
                                            />
                                        </Box>
                                        <ForwardBack props={{ index: 1, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(2) }>{ steps[2].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Typography>{ steps[2].description }</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        {
                                            newFormState.techStack?.value.length
                                            ?
                                            <>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>

                                                    <input type="hidden" value={newFormState.techStack?.value} name="techStack" />

                                                    {
                                                        newFormState.techStack?.value.split(',').map((tech: string) => {
                                                            return <Chip key={`current-stack-chip-${tech}`} label={tech.toLowerCase()} />
                                                        })
                                                    }
                                                </Box>
                                                <Button 
                                                    startIcon={ <ChangeCircle /> } 
                                                    variant="outlined" 
                                                    onClick={ handleChangeCurrentStack } 
                                                    sx={{ ml: 2, minWidth: 'fit-content', flexWrap: 'nowrap' }}
                                                    >
                                                    change stack
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <Autocomplete
                                                    multiple
                                                    id="tech-stack-multiselection"
                                                    filterOptions={(options, params) => {
                                                        const filtered = filter(options, params);                    
                                                        const { inputValue } = params;
                                                        // Suggest the creation of a new value
                                                        const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase());
                                                        if (inputValue !== "" && !isExisting) {
                                                            filtered.push({
                                                                inputValue,
                                                                name: `add "${inputValue}"`,
                                                            });
                                                        }
                                                        return filtered;
                                                    }}
                                                    disableCloseOnSelect
                                                    options={topTech}
                                                    selectOnFocus
                                                    clearOnBlur
                                                    handleHomeEndKeys
                                                    getOptionLabel={(option) => {
                                                        if (typeof option === "string") { // Value selected with enter, right from the input
                                                            return option;
                                                        }
                                                        if (option.inputValue) { // Add "xxx" option created dynamically
                                                            return option.inputValue.toLowerCase();
                                                        }
                                                        
                                                        return option.name.toLowerCase(); // Regular option
                                                    }}
                                                    renderOption={(props, option, { selected }) => ( 
                                                        <li {...props}>
                                                            <Checkbox
                                                                icon={ icon }
                                                                checkedIcon={ checkedIcon }
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            { option.name.toLowerCase() }
                                                        </li>
                                                    )}
                                                    sx={{ width: 500 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="select a tech stack" placeholder="select to add more" />
                                                    )}
                                                    onChange={(event, currentValsObj) => { handleInputObjChange(event, currentValsObj) }}
                                                />
                                                <Button 
                                                    startIcon={ <Check /> } 
                                                    variant="outlined" 
                                                    onClick={ handleFinished } 
                                                    sx={{ ml: 2, minWidth: 'fit-content', flexWrap: 'nowrap' }}
                                                    disabled={ techNameList?.length === 0 }
                                                    >
                                                    finished
                                                </Button>
                                            </>
                                        }
                                    </Box>
                                    <ForwardBack props={{ index: 2, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(3) }>{ steps[3].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Typography>{ steps[3].description }</Typography>
                                    <Box sx={{my: 2}} key={`textfield-container-beginDate`}>
                                        <TextField 
                                            id="beginDate-input"
                                            name="beginDate"
                                            required
                                            value={ newFormState.beginDate?.value } 
                                            variant="outlined" 
                                            label="begin date (mm/dd/yyyy)"
                                            type="text"
                                            fullWidth={ true }
                                            color="secondary"
                                            onChange={ handleInputChange }
                                            error={ Boolean(newFormState.beginDate?.error) }
                                            helperText={ newFormState.beginDate?.error || "" }
                                            { ...dateExtraProp }
                                        />
                                    </Box>
                                    <Box sx={{my: 2}} key={`textfield-container-endDate`}>
                                        <TextField 
                                            id="endDate-input"
                                            name="endDate"
                                            required
                                            value={ newFormState.endDate?.value } 
                                            variant="outlined" 
                                            label="end date (mm/dd/yyyy)"
                                            type="text"
                                            fullWidth={ true }
                                            color="secondary"
                                            onChange={ handleInputChange }
                                            error={ Boolean(newFormState.endDate?.error) }
                                            helperText={ newFormState.endDate?.error || "" }
                                            { ...dateExtraProp }
                                        />
                                    </Box>
                                    <Divider sx={{ mt: 1, mb: 2 }}/>
                                    <FormControl>
                                        <FormLabel id="project-active-radio-choice">initialize this project in active development?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="project-active-radio-choice"
                                            name="active"
                                            value={ newFormState.active?.value }
                                            onChange={ handleInputChange }
                                            >
                                            <FormControlLabel value="true" label="yes" control={ <Radio /> } />
                                            <FormControlLabel value="false" label="no" control={ <Radio /> } />
                                        </RadioGroup>
                                    </FormControl>
                                    <ForwardBack props={{ index: 3, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>
                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(4) }>{ steps[4].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Typography>{ steps[4].description }</Typography>

                                    <Box sx={{my: 2}} key={`textfield-container-fundingGoal`}>
                                        <TextField 
                                            id="fundingGoal-input"
                                            name="fundingGoal"
                                            required
                                            value={ newFormState.fundingGoal?.value } 
                                            variant="outlined" 
                                            label="funding goal"
                                            type="text"
                                            fullWidth={ true }
                                            color="secondary"
                                            onChange={ handleInputChange }
                                            error={ Boolean(newFormState.fundingGoal?.error) }
                                            helperText={ newFormState.fundingGoal?.error || "" }
                                            { ...fundingExtraProp }
                                        />
                                    </Box>
                                    <ForwardBack props={{ index: 4, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>

                            <Step>
                                <StepButton color="inherit" onClick={ handleStep(5) }>{ steps[5].label }</StepButton>
                                <StepContent TransitionProps={{ unmountOnExit: false }} >
                                    <Box style={{border: '1px solid grey', borderRadius: 5, padding: '1rem' }}>
                                        <Typography variant="h4" component="h1" gutterBottom>
                                            {" "}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            select a team to assign to this new project
                                        </Typography>
                                        <Box sx={{ width: '100%' }}>
                                            <Paper sx={{ width: '100%', mb: 2 }}>
                                                <TableContainer>
                                                    <Table aria-labelledby="users-teams-table" size="medium">

                                                        {/* TODO: if no team availble to assign - need to display that string & no rows or table */}
                                                        {/* <input type="hidden" name="teamId" value={ newFormState.teamId?.value } /> */}
                                                        <EnhancedTableHead
                                                            numSelected={selected.length}
                                                            rowCount={usersTeams?.length || 1}
                                                        />
                                                        <TableBody>
                                                            {
                                                                usersTeams && userId 
                                                                ?
                                                                usersTeams.map((team: any, index: number) => {
                                                                    const isTeamSelected = isSelected(team.id);
                                                                    const labelId = `table-checkbox-${index}`;

                                                                    return (
                                                                        <TableRow
                                                                            hover
                                                                            onClick={(event) => handleClick(event, team.id)}
                                                                            role="checkbox"
                                                                            aria-checked={ isTeamSelected }
                                                                            tabIndex={-1}
                                                                            key={ team.id }
                                                                            selected={ isTeamSelected }
                                                                            sx={{ cursor: 'pointer' }}
                                                                            >
                                                                            <TableCell padding="checkbox">
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={isTeamSelected}
                                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                                {team.name.toLowerCase()}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {team.createdAt ? team.createdAt.slice(0,10) : " "}
                                                                                </TableCell>
                                                                            <TableCell align="right">
                                                                                {team.teamLeadId === userId ? "yes" : " "}
                                                                                </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })
                                                                : null
                                                            }
                                                        </TableBody>

                                                        <input type="hidden" name="teamId" value={ newFormState.teamId?.value } />

                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Box>
                                    </Box>
                                    <ForwardBack props={{ index: 5, setActiveStep, steps, newFormState }} />
                                </StepContent>
                            </Step>

                        </Stepper>
                        <Box flexGrow={1} sx={{ display: 'flex-row', py: 2 }}>
                            <Button 
                                className="button" 
                                sx={{ mt: 1}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAllFieldsReset();
                                }}
                                >
                                cancel all
                            </Button>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                className="button" 
                                sx={{ mt: 1, ml: 2 }}
                                disabled={ activeStep !== (steps.length -1) ? true : checkFormIsDisabled() }
                                >
                                create new project
                            </Button>
                        </Box>
                    </Form> 
                </div>
            </Paper>
        </Box>
	);
}

