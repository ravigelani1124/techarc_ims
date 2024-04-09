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
import PDFGenerator from 'src/components/appointment/PDFGenerator'
import { PDFViewer } from '@react-pdf/renderer'

const PDFViewerUserModel = ({ isOpen, onClose, item }) => {
  return (
    <>
    <CModal size="xl" visible={isOpen} onClose={onClose} aria-labelledby="OptionalSizesExample1" fullscreen>
      <CModalHeader closeButton>
        <CModalTitle id="modal-title">Appointment Details PDF</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '1000px', height: '600px' }}>
          <PDFViewer width="100%" height="100%">
            <PDFGenerator data={item} />
          </PDFViewer>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}

export default PDFViewerUserModel
