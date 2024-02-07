import React, { useState } from 'react'
import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react'

const ConsultancyForm = ({ onClose }) => {
  const [consultancyName, setConsultancyName] = useState('')

  const handleInputChange = (e) => {

    
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(`Submitted consultancy: ${consultancyName}`)

    // Reset form fields
    setConsultancyName('')

    onClose()
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <CFormLabel htmlFor="consultantInput">Consultant Name</CFormLabel>
          <CFormInput
            type="text"
            id="consultantInput"
            placeholder="John Doe"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="nameInput">Consultancy Group</CFormLabel>
          <CFormSelect aria-label="Default select example" id="consultancyInput">
            <option required>Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="licInput">License Number</CFormLabel>
          <CFormInput type="tel" id="licInput" placeholder="11220054" required autoFocus />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="contactInput">Contact Number</CFormLabel>
          <CFormInput
            type="tel"
            id="contactInput"
            placeholder="123-456-7890"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="emailInput">Email address</CFormLabel>
          <CFormInput
            type="email"
            id="emailInput"
            placeholder="name@example.com"
            required
            autoFocus
          />
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary px-4">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConsultancyForm
