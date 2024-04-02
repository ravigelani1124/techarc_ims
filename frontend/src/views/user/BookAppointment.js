import React, { useContext, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { useNavigate } from 'react-router-dom'
import AppointmentDetail from 'src/components/appointment/AppointmentDetail'
import ProgressBar from 'src/components/ProgressBar'
import PDFGenerator from 'src/components/appointment/PDFGenerator'
import UploadDocument from 'src/components/appointment/UploadDocument'

const BookAppointment = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handleBackStep = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    document.title = 'Book Appointment'
  }, [])

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleBack = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step - 1);
  };

  const handleSubmit = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    // Submit the form data
    console.log("Form data:", formData);
  };

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        //return <PDFGenerator data={formData} onNext={handleNext} onBack={handleBack} />
        return <AppointmentDetail onNext={handleNext} />
      case 2:
        return <PDFGenerator data={formData} onNext={handleNext} onBack={handleBack} />
      case 3:
        return <PDFGenerator data={formData} onNext={handleNext} onBack={handleBack} />
      case 4:
        return <UploadDocument data={formData} onNext={handleNext} onBack={handleBack}/>      
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
            
            <div className="container mt-5">            
              
              <div className="mt-4">{renderStepComponent()}</div>

              {/* <div className="d-flex justify-content-between mb-3">
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
              </div> */}
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default BookAppointment
