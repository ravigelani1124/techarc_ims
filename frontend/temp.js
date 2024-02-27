import React from 'react';
import ProgressBar from './ProgressBar';

const AppointmentBooking = ({ step, handleNextStep, handleBackStep, renderStepComponent }) => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="container mt-5">
          <div className="d-flex justify-content-between mb-3">
            {step > 1 && (
              <button className="btn btn-primary" onClick={handleBackStep}>
                Back
              </button>
            )}
            {step < 4 && (
              <button className="btn btn-primary" onClick={handleNextStep}>
                Next
              </button>
            )}
          </div>
          <ProgressBar step={step} />
          <div className="mt-4">{renderStepComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
