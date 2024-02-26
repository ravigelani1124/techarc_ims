import React, {useContext, useEffect, useState} from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import { useNavigate } from 'react-router-dom'
import { CSpinner,} from '@coreui/react'
import ConsultantAvailabilityForm from 'src/components/ConsultantAvailabilityForm';

const SetConsultantAvailability = () => {

  useEffect(() => {
    document.title = 'Set Availability';
  }, []);

  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [consultantId, setConsultantId] = useState('')
  const [selectedDates, setSelectedDates] = useState([])
  const [timeSlots, setTimeSlots] = useState([{ day: '', startTime: '', endTime: '' }])
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleSave = () => {
    // Send a POST request to your API to save the availability data
    console.log('Consultant ID:', consultantId);
    console.log('Selected Dates:', selectedDates);
    console.log('Time Slots:', timeSlots);
  } 


  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { day: '', startTime: '', endTime: '' }])
  }

  const handleRemoveSlot = (index) => {
    const newSlots = [...timeSlots]
    newSlots.splice(index, 1)
    setTimeSlots(newSlots)
  }

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...timeSlots]
    newSlots[index][field] = value
    setTimeSlots(newSlots)
  }

  const handleDateChange = (dates) => {
    setSelectedDates(dates)
  }

    return (
        <>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '90vh' }}
            >
              <CSpinner />
            </div>
          )}
          <div className="body flex-grow-1 px-3">
              <div className="mb-4">
                <ConsultantAvailabilityForm />
              </div>
            </div>
          <AppFooter />
        </div>
      </>
    )
}

export default SetConsultantAvailability;