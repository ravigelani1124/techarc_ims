import React, { useState } from 'react'
import {
  CButtonGroup,
  CButton,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CFormLabel,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
const AppointmentDetailsModel = ({ isOpen, onClose, item }) => {

  return (
    <>
      <CModal size="xl" visible={isOpen} onClose={onClose} aria-labelledby="OptionalSizesExample1" fullscreen>
        <CModalHeader closeButton>
          <CModalTitle id="modal-title">Appointment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Render your modal content here */}
          <div>
            {/* Application Details */}
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px', display: 'block' }}>
                <strong>Application Details</strong>
              </CFormLabel>
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {item.appointment.application_type} : {item.appointment.appsub_type}
              </CFormLabel>
            </div>

            {/* User Details */}
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px', display: 'block' }}>
                <strong>User Details</strong>
              </CFormLabel>

              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {item.user.user_name_en}
              </CFormLabel>
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {item.user.user_email} | {item.user.user_phone}
              </CFormLabel>
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {item.user.street_no}, {item.user.street_name},{item.user.city}, {item.user.state},{' '}
                {item.user.zip}, {item.user.country}
              </CFormLabel>
            </div>

            {/* Time Slot */}
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px', display: 'block' }}>
                <strong>Time Slot</strong>
              </CFormLabel>

              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {item.appointment.timeslot_date} {item.appointment.timeslot_start_time}-{' '}
                {item.appointment.timeslot_end_time}
              </CFormLabel>
            </div>

            {/* Documents */}
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px', display: 'block' }}>
                <strong>Documents</strong>
              </CFormLabel>
              <CListGroup color="light" label="Documents">
                {item.appointment.documents.map((subItem, subIndex) => (
                  <CListGroupItem className="d-flex justify-content-between align-items-center">
                    <div className="label-container">
                      <label htmlFor="application_code" className="form-label">
                        {subItem.document_name}
                      </label>
                    </div>
                    <div className="badge-container">
                      <span className={`badge ${subItem.is_optional ? 'bg-success' : 'bg-danger'}`}>
                        {subItem.is_optional ? 'Optional' : 'Required'}
                      </span>
                    </div>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </div>

            {/* Price Breakdown */}
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px', display: 'block' }}>
                <strong>Price Breakdown</strong>
              </CFormLabel>

              <CFormLabel htmlFor="consultant" style={{ marginBottom: '5px', display: 'block' }}>
                {'Charged Fees'} : ${item.appointment.consultant_fee}
              </CFormLabel>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>        
        {/* <CButton color="primary" onClick={()=>handleDownloadPDF()}>
            Download PDF
          </CButton> */}
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AppointmentDetailsModel
