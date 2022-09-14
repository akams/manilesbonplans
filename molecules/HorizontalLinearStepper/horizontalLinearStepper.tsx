import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function HorizontalLinearStepper({
  steps,
  page,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={page}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} />
      </React.Fragment>
    </Box>
  );
}
