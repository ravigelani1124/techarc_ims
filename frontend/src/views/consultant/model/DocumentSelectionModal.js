import React, { useState } from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CListGroup, CListGroupItem, CFormCheck } from '@coreui/react';

const DocumentSelectionModal = ({ isOpen, onClose, documents}) => {
  
  const toggleDocument = (id) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((docId) => docId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleSave = () => {
    handleSubmit(selectedDocs);
    onClose();
  };

  const DocumentListItem = ({ document, id }) => (
    <CListGroupItem>
      <CFormCheck
        label={document.document_name}
        checked={selectedDocs.includes(id)}
        onChange={() => toggleDocument(id)}
      />
    </CListGroupItem>
  );

  return (
    <CModal alignment="center" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Select Documents</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup>
          {documents.map((document, index) => (
            <DocumentListItem key={index} document={document} id={document._id} />
          ))}
        </CListGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>Save</CButton>
        <CButton color="secondary" onClick={onClose}>Close</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DocumentSelectionModal;
