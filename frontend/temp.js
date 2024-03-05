import React, { useState } from 'react';

function Step1({ onNext }) {
  const [data, setData] = useState('');

  const handleNext = () => {
    // Validate data if needed
    onNext(data);
  };

  return (
    <div>
      <h2>Step 1</h2>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

function Step2({ data, onNext }) {
  const [otherData, setOtherData] = useState('');

  const handleNext = () => {
    // Validate other data if needed
    onNext({ ...data, otherData });
  };

  return (
    <div>
      <h2>Step 2</h2>
      <input type="text" value={otherData} onChange={(e) => setOtherData(e.target.value)} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

function Step3({ data, onSubmit }) {
  const handleSubmit = () => {
    // Submit all data
    onSubmit(data);
  };

  return (
    <div>
      <h2>Step 3</h2>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleSubmit = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    // Submit the form data
    console.log("Form data:", formData);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 data={formData} onNext={handleNext} />}
      {step === 3 && <Step3 data={formData} onSubmit={handleSubmit} />}
    </div>
  );
}





import React, { useContext, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { useNavigate } from 'react-router-dom'
import AppointmentDetail from 'src/components/appointment/AppointmentDetail'
import ProgressBar from 'src/components/ProgressBar'
import PriceBreakDown from 'src/components/appointment/PriceBreakDown'
import UploadDocument from 'src/components/appointment/UploadDocument'

const BookAppointment = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [step1BookAppointment, setStep1BookAppointment] = useState({});
  const [step2UploadDocument, setStep2UploadDocument] = useState({});
  const [step3Summary, setStep3Summary] = useState({});
  const [step4PriceBreakdown, setStep4PriceBreakdown] = useState({});

  const handleStep1Submit = (data) => {
    setStep1BookAppointment(data);
    setStep(2);
  };

  const handleStep2Submit = (data) => {
    setStep2UploadDocument(data);
    setStep(3);
  };

  const handleStep3Submit = (data) => {
    setStep3Summary(data);
    // You can do something with the final data here
  
  };

  const handleStep4Submit = (data) => {
    setStep4PriceBreakdown(data);
    // You can do something with the final data here
    console.log("All data:", { ...step1BookAppointment, ...step2UploadDocument, ...step3Summary, ...data });
  };


  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handleBackStep = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    document.title = 'Book Appointment'
  }, [])

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <AppointmentDetail onSubmit={handleStep1Submit}/>
      case 2:
        return <PriceBreakDown onSubmit={handleStep2Submit} />
      case 3:
        return <UploadDocument onSubmit={handleStep3Submit}/>
      case 4:
        return <PriceBreakDown onSubmit={handleStep4Submit} />
      default:
        return null
    }
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div>
          <div>
            <div style={{ textAlign: 'center' }}>
              <h3>Book Appointment</h3>
            </div>
            <div className="container mt-5">
              <ProgressBar step={step} />
              <div className="mt-4">{renderStepComponent()}</div>

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
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default BookAppointment



