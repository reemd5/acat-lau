import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'View All Assigned Forms',
        description:
            'Navigate to the Forms page to view your assigned forms.',
    },
    {
        label: 'Fill or View Your Forms',
        description: (
            <>
            Click the pencil icon in the Actions column to edit your form. <br/>
            Click the eye icon in the Actions column to view a completed form. <br/>
            Use the search bar to quickly find a specific form.
            </>
        )
    },
    {
        label: 'Monitor Your Courses\' Progress',
        description:
            'Navigate to the Progress page and monitor your courses\' progress.',
               
    },
];

const Help = () => {
    return (
        <div>
            <div className="pb-4 flex flex-col gap-3 ">
                <p className="text-(--primary-color) text-3xl font-bold">Help</p>
                <p className="text-md">
                    Steps for the process are provided below.
                </p>
            </div>

            <Box sx={{maxWidth:800}}>
                <Stepper orientation="vertical">
                    {steps.map((step) => (
                        <Step key={step.label} active>
                            <StepLabel
                                sx={{
                                    '& .MuiStepIcon-root.Mui-active': {
                                        color: 'var(--primary-color)',        // default circle bg
                                    }
                                }}
                            >
                                <Typography fontWeight="bold">
                                    {step.label}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography color="">
                                    {step.description}
                                </Typography>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    );
};

export default Help;
