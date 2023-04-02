import * as React from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions<TechOptionType>();

export default function MultiselectPicker() {
	const [techNameList, setTechNameList] = React.useState<TechOptionType[]>();

	return (
		<Autocomplete
            multiple
            id="tech-stack-multiselection"
            // value={techNameList}
			filterOptions={(options, params) => {
                const filtered = filter(options, params);
                
				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue.toLowerCase() === option.name.toLowerCase());
                if (inputValue !== "" && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                    });
				}

				return filtered;
			}}
            disableCloseOnSelect
            options={topTech}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
            // onChange={(event, newValue) => {
            //     setTechNameList(newValue);
            // }}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.name;
			}}
			renderOption={(props, option, { selected }) => ( 
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
			sx={{ width: 500 }}
			// freeSolo
			renderInput={(params) => (
				<TextField {...params} label="select a tech stack" placeholder="select to add more" />
			)}
		/>
	);
}

interface TechOptionType {
	inputValue?: string;
	name: string;
}

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
