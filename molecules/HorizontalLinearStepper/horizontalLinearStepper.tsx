import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Adresse de livraison', 'Adresse de facturation', 'Mode de paiement'];

export default function HorizontalLinearStepper({
  handleNext,
  handleBack,
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
        <Typography sx={{ mt: 2, mb: 1 }}>Step {page + 1}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={page === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {page < steps.length - 1 && <Button onClick={handleNext}>
            Next
          </Button>}
        </Box>
      </React.Fragment>
    </Box>
  );
}
