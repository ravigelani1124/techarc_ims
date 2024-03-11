import React, { useState } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

const EditDocumentModal = ({ document, onSave, onClose }) => {
  const [docName, setDocName] = useState(document.document_name)

  const handleSave = () => {
    onSave({ ...document, document_name: docName })
    onClose()
  }

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Edit Document</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label htmlFor="application_code" className="form-label">
          Document Name
          </label>
          <input
            type="text"
            className="form-control"
            id="application_code"
            name="application_code"
            placeholder="CON234"
            pattern="[A-Za-z0-9]{1,6}"
            required
            autoFocus  
            value={docName}
            onChange={(e) => setDocName(e.target.value)}          
          />
        </div>
       
      </CModalBody>
      <CModalFooter className="flex justify-end">
        <CButton color="secondary" onClick={onClose} className="mr-2">
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditDocumentModal
