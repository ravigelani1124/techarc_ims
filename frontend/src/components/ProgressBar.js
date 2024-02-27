// ProgressBar.js
import React from 'react';

const ProgressBar = ({ step }) => {
  // Calculate the width based on the step
  const progressWidth = step === 4 ? '100%' : `${(step - 1) * 25}%`;

  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: progressWidth }}
        aria-valuenow={(step - 1) * 25}
        aria-valuemin="0"
        aria-valuemax="100">
        Next Step {step}
      </div>
    </div>
  );
};

export default ProgressBar;
