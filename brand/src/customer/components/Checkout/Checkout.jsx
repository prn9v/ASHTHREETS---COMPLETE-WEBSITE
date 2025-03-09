import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import { useState, useEffect } from 'react';


export default function Checkout() {
  
  const steps = ['Login', 'Delivery', 'Order Summary', 'Payment'];
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const querySearch = new URLSearchParams(location.search);
  const step = parseInt(querySearch.get("step")) || 0;

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    navigate(`?step=${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    navigate(`?step=${prevStep}`);
  };

  return (
    <div className=' px-10 lg:px-20 '>
      <Box sx={{ width: '100%', mt: "5rem" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>

            <div className=' mt-16'>
              {activeStep === 2 && <DeliveryAddressForm />}
              {activeStep === 3 && <OrderSummary />}
              {/* Add your Payment or other components here */}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
