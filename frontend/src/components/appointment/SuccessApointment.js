import React,{useContext} from 'react'
import {
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import UserContext from 'src/utils/UserContext'



const SuccessApointment = ({ data, onNext, onBack }) => {

  const { user } = useContext(UserContext)
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={6}>
          <span className="clearfix">
            <h1 className="float-start display-3 me-4">Yahhoo!</h1>
            <h4 className="pt-3">Thank you! <b>{user?.user_name_en}</b></h4>
            <h4 className="pt">we are done!</h4>
            <p className="text-medium-emphasis float-start">
              Your appointment has been successfully booked. you can check appointment details on My Appointments.
            </p>
          </span>        
        </CCol>
      </CRow>
    </CContainer>
  </div>
  )
}

export default SuccessApointment
