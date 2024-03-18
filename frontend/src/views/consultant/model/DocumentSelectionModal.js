import React, { useEffect, useState, useContext } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CButtonGroup
} from '@coreui/react';
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext';

const DocumentSelectionModal = ({ isOpen, onClose, subItem }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchDocuments()
  }, [user])

  const fetchDocuments = async () => {    
    try {
      const token = user?.jwtToken
      const response = await axios.get(`${DEFAULT_URL}document/getdocuments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setDocuments(response.data.data)    
      callSelectedDoc(subItem)         
    } catch (error) {
     console.log(error)
    }
  }
  const callSelectedDoc = async (subItem) => {
    try {
      const token = user?.jwtToken;
      console.log(subItem);
      const response = await axios.post(
        `${DEFAULT_URL}document/getSelectedServicesDoc`,
        {
          sub_application_id: subItem._id,
          consultant_id: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data.data.documents);
      setSelectedDocs(response.data.data.documents);
    } catch (error) {
      console.log(error);
    }
  };
  
  const toggleDocument = (id) => {
    setSelectedDocs((prevSelectedDocs) => {
      if (prevSelectedDocs.includes(id)) {
        // If the document is already selected, remove it from the selected list
        return prevSelectedDocs.filter((docId) => docId !== id);
      } else {
        // If the document is not selected, add it to the selected list
        return [...prevSelectedDocs, id];
      }
    });
  };

  const handleSelectAll = () => {
    const allDocumentIds = documents.map((doc) => doc._id);
    setSelectedDocs(allDocumentIds);
  };

  const handleDeselectAll = () => {
    setSelectedDocs([]);
  };

  const handleSave = () => {
    callSetDocumentsApi() 
    // You can handle saving the selected documents here
  };

  const callSetDocumentsApi = async () => {
    console.log(selectedDocs)
    try {
      const token = user?.jwtToken
      const response = await axios.post(`${DEFAULT_URL}document/selectedServicesDoc`, {
        sub_application_id: subItem._id,
        consultant_id: user._id,
        documents: selectedDocs
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      onClose();
    } catch (error) {
      console.log(error)
    }
  }

  const DocumentListItem = ({ document }) => (
    <CListGroupItem>
      <CFormCheck
        label={document.document_name}
        checked={selectedDocs.includes(document._id)}
        onChange={() => toggleDocument(document._id)}
      />
    </CListGroupItem>
  );

  return (
    <CModal alignment="center" visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Select Documents</CModalTitle>        
      </CModalHeader>
      <CModalBody>      
        <div style={{ marginBottom: '10px', marginTopa: '10px', marginBlockEnd: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton color="primary" onClick={handleSelectAll} variant="outline">
                Select All
              </CButton>
              <CButton color="primary" variant="outline" onClick={handleDeselectAll}>
                Deselect All
              </CButton>              
            </CButtonGroup>
          </div>
        <CListGroup>
          {documents.map((document, index) => (
            <DocumentListItem key={index} document={document} />
          ))}
        </CListGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>
          Save
        </CButton>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DocumentSelectionModal;
