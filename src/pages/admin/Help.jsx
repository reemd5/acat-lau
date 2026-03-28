import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'Add Courses',
        description:
            'Add the course code, course name, and its SO/s.',
    },
    {
        label: 'Add Staff Members',
        description:
            'Add instructors and coordinators and provide their campus, email, and department.',
    },
    {
        label: 'Fill Assignment Table',
        description: (
            <>
            Enter the course/s used to assess a specific SO. <br/>
            Enter the performance criteria for each course. <br/>
            Choose in which semester of the year you want to assess this course. <br/>
            Assign instructors and coordinators in both campuses.
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
