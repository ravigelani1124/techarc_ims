import React, { useState,useContext } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CCallout,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt } from '@coreui/icons'
import EditSubApplicationType from 'src/views/admin/applicationtype/EditSubApplicationType'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext'

const DynamicAccordion = ({ data, onCallback }) => {
  const { user } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const handleEditClick = (document) => {
    setModalOpen(true)
    setSelectedDocument(document)
  }
  const handleSave = (updatedDocument) => {
    // Example: Save to API
    console.log('Updated Document:', updatedDocument)
    // Implement API call to save the updated document
    setModalOpen(false)
    updateApplicationSubType(updatedDocument._id, updatedDocument.sub_application_description)
    onCallback()
  }

  const updateApplicationSubType = async (id, sub_application_description) => {
    try {
      const token = user?.jwtToken
      const response = await axios.put(
        `${DEFAULT_URL}application/updatesubapplicationtype/${id}`,
        {
          sub_application_description: sub_application_description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setErrorMessage(response.data.message)
      setAlertVisible(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <CAccordion>
        {data.map((item, index) => (
          <CAccordionItem key={index} itemKey={index}>
            <CAccordionHeader>{item.application_description}</CAccordionHeader>
            <CAccordionBody>
              {item.sub_application_type.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <CCallout color="primary" style={{ flex: 1, marginRight: '10px' }}>
                    {subItem.sub_application_description}
                  </CCallout>
                  <CIcon
                    onClick={() => handleEditClick(subItem)}
                    icon={cilPenAlt}
                    className="text-primary"
                    size="xl"
                  />
                </div>
              ))}
            </CAccordionBody>
          </CAccordionItem>
        ))}
        {modalOpen && (
          <EditSubApplicationType
            document={selectedDocument}
            onSave={handleSave}
            onClose={() => setModalOpen(false)}
          />
        )}
      </CAccordion>
    </div>
  )
}

export default DynamicAccordion
