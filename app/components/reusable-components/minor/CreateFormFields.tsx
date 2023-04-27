import React, { useMemo } from "react";
import { 
    Box, 
    Divider, 
    TextField, 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio,
} from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import UsersTeamPicker from "~/components/reusable-components/minor/UsersTeamPicker";
import MultiselectPicker from "~/components/reusable-components/minor/MultislectPicker";



interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

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



export const CreateFormFields = ({props}: any) => {
    const { newFormState, setNewFormState, loaderData } = props;
    const formFieldSet = formFieldData[props.index];
    const fundingExtraProp = { InputProps: { inputComponent: NumericFormatCustom as any } };
    const dateExtraProp = { inputProps: { maxLength: 10, minLength: 10 } };
    const multilineExtraProp = { multiline: true, rows: 5 };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let error: string | null;
        let formattedValue;
    
        if(name === "beginDate" || name === "endDate") {
            formattedValue = validateDate(value);
        }
        // if(name === "fundingGoal") {
        //     formattedValue = value.replace(/\D/g, '');
        // }
        error = validateField(name, formattedValue !== undefined ? formattedValue : value);
        setNewFormState({ ...newFormState, [name]: { value: formattedValue ?? value, error } });
    };

    // useMemo(() => {
    //     console.log(`all form state from create formFields: ${JSON.stringify(newFormState, null,2 )}`)
    // }, [newFormState])


    return (
        <>
            {
                Object.values(formFieldSet)?.map((formFieldEntry) => (
                    <Box sx={{my: 2}} key={`textfield-container-${formFieldEntry.name}`}>
                        {
                            (formFieldEntry.name === "techStack" || formFieldEntry.name === "team" || formFieldEntry.name === "active") 
                            ?
                                formFieldEntry.name === "techStack"
                                ? 
                                    //  This is external techstack picker component - returns a string of techs
                                    <MultiselectPicker props={{ newFormState, setNewFormState }} />
                                :
                                formFieldEntry.name === "team"
                                ?
                                    //  This is external team picker component - returns a string of team members
                                    <UsersTeamPicker props={{ newFormState, setNewFormState, loaderData }} />
                                :
                                <>
                                    <Divider sx={{ mt: 1, mb: 2 }}/>
                                    <FormControl>
                                        <FormLabel id="project-active-radio-choice">initialize this project in active development?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="project-active-radio-choice"
                                            name="active"
                                            value={ newFormState[formFieldEntry.name]?.value || false}
                                            onChange={ handleInputChange }
                                            >
                                            <FormControlLabel value="true" label="yes" control={ <Radio /> } />
                                            <FormControlLabel value="false" label="no" control={ <Radio /> } />
                                        </RadioGroup>
                                    </FormControl>
                                </>
                            :
                                <TextField 
                                    key={`key-for-${formFieldEntry.name}-input`}
                                    id={`${formFieldEntry.name}-input`}
                                    name={ formFieldEntry.name as string }
                                    required={ formFieldEntry.required ?? false }
                                    value={ newFormState[formFieldEntry.name]?.value } 
                                    variant="outlined" 
                                    label={ formFieldEntry.label } 
                                    type="text"
                                    fullWidth={ true }
                                    color="secondary"
                                    onChange={ handleInputChange }
                                    error={ Boolean(newFormState[formFieldEntry.name]?.error) }
                                    helperText={ newFormState[formFieldEntry.name]?.error || "" }
                                    { ...(formFieldEntry.name === "description" ? multilineExtraProp : null) }
                                    { ...(formFieldEntry.name === "beginDate" || formFieldEntry.name === "endDate" ? dateExtraProp : null) }
                                    { ...(formFieldEntry.name === "fundingGoal" ? fundingExtraProp : null) }
                                />
                        }
                    </Box>
                ))
            }
        </>
    )
}