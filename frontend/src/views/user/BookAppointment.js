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
        return <AppointmentDetail />
      case 2:
        return <PriceBreakDown />
      case 3:
        return <UploadDocument />
      case 4:
        return <PriceBreakDown />
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
