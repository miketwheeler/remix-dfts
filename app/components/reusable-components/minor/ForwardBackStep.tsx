import { 
    Box, 
    Button, 
} from "@mui/material";



export const ForwardBack = ({props}: any) => {
    const { index, setActiveStep, steps, newFormState } = props;
    const stepNames = steps[props.index].fieldNames;

    // handle the fwd/back button clicks
    const handleNext = () => { setActiveStep((prevActiveStep: any) => prevActiveStep + 1) };
    const handleBack = () => { setActiveStep((prevActiveStep: any) => prevActiveStep - 1) };


    const determineDisabled = (fieldValues: any[]) => {
        let returnValue = true;
        fieldValues.forEach((fieldName) => returnValue = !newFormState[fieldName] )

        return returnValue;
    }

    return (
        <Box sx={{ mb: 2 }}>
            <div>
                {
                    index !== steps.length -1
                    ?
                    <Button 
                        variant="contained" 
                        // disabled={ 
                        //     // Needs to be disabled by default (true), then checked for bool or error state of field to enable
                        //     determineDisabled(stepNames) ||
                        //     Object.values(newFormState)?.some((item: any) => 
                        //         item.value === "active" 
                        //         ? false 
                        //         : item.value === "techStack"
                        //         ? Boolean(item.value.split(',').length < 2)
                        //         : item.error
                        //     ) 
                        // } 
                        onClick={ handleNext } 
                        sx={{ mt: 1, mr: 1 }}
                        >
                        continue
                    </Button>
                    : null
                }
                {
                    index !== 0
                    ?
                    <Button onClick={ handleBack } sx={{ mt: 1, mr: 1 }}>
                        back
                    </Button>
                    : null
                }
            </div>
        </Box>
    )
}