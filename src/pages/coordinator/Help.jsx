import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'View Instructors',
        description:
            'Navigate to the My Instructors page to view the list of instructors assigned to you.',
    },
    {
        label: 'View Improvements Suggested by Instructors',
        description: (
            <>
            Navigate to the Improvements page to review the improvement suggestions submitted by instructors. <br/>
            You can track proposed course enhancements from there.
            </>
        )
               
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
