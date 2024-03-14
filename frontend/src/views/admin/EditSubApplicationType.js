import React, { useState } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

const EditSubApplicationType = ({ document, onSave, onClose }) => {
  const [docName, setDocName] = useState(document.sub_application_description)

  const handleSave = () => {
    onSave({ ...document, sub_application_description: docName })
    onClose()
  }

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Edit Sub Application</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label htmlFor="sub_application_type_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="sub_application_type_name"
            name="sub_application_type_name"
            placeholder="Sub Application"
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

export default EditSubApplicationType
