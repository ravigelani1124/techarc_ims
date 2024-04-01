import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import { CForm, CButton, CFormInput, CFormLabel, CListGroupItem, CListGroup } from '@coreui/react'
import ProgressBar from 'src/components/ProgressBar'
const AppointmentDetail = ({ onNext }) => {
  const { user } = useContext(UserContext)

  //Step 1 Appointment Details
  const [consultantList, setConsultantList] = useState([])
  const [applicationTypeList, setApplicationTypeList] = useState([])
  const [servicesList, setServicesList] = useState([])
  const [timeSlots, setTimeSlots] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [service, setService] = useState('')

  //set From selection data
  const [selectedConsultant, setSelectedConsultant] = useState({})
  const [selectedApplicationType, setSelectedApplicationType] = useState({})
  const [selectedService, setSelectedService] = useState({})
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({})
  const [selectedDate, setSelectedDate] = useState('')

  const [selectedFiles, setSelectedFiles] = useState({})
  const [uploadProgress, setUploadProgress] = useState({})
  const [documents, setDocuments] = useState([])

  const [isDocmentVsisible, setIsDocumentVisible] = useState(false)
  const [isPriceVisible, setIsPriceVisible] = useState(false)

  //document upload
  const [uploadedDocuments, setUploadedDocuments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${DEFAULT_URL}auth/getConsultantList`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        })
        setConsultantList(response.data.data)
      } catch (error) {
        console.error('Error fetching consultant list:', error)
        setErrorMessage(error.message || 'An error occurred')
        setAlertVisible(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleNext = (e) => {
    e.preventDefault()
    const data = {
      booking_details: {
        consultant_data: selectedConsultant,
        application_type: selectedApplicationType,
        service_data: selectedService,
        timeslot_data: selectedTimeSlot,
      },
    }
    console.log('booking_details---', data)
    onNext(data)
  }

  const handleServiceChange = (e) => {
    setDocuments([])
    setSelectedFiles({})
    setUploadProgress({})
    setIsDocumentVisible(false)
    setIsPriceVisible(false)
    setService(e.target.value)
    const selectedService = servicesList.find((service) => service._id === e.target.value)
    setSelectedService(selectedService)
  }

  const handleApplicationTypeChange = (e) => {
    setServicesList([])
    setDocuments([])
    setSelectedService({})
    setSelectedFiles({})
    setUploadProgress({})
    setIsDocumentVisible(false)
    setIsPriceVisible(false)
    const selectedApplicationTypeId = e.target.value
    const selectedApplicationType = applicationTypeList.find(
      (application) => application._id === selectedApplicationTypeId,
    )
    setSelectedApplicationType(selectedApplicationType)
    const services = selectedApplicationType ? selectedApplicationType.sub_application_type : []
    setServicesList(services)
  }

  const handleTimeSlotChange = (e) => {
    setSelectedDate(e.target.value)
    const selectedTimeSlot = timeSlots.find((timeSlot) => timeSlot._id === e.target.value)
    setSelectedTimeSlot(selectedTimeSlot)
  }

  const handleFileChange = (event, document) => {
    const updatedUploadedDocuments = [...uploadedDocuments, document._id]
    setUploadedDocuments(updatedUploadedDocuments)

    const files = event.target.files
    setSelectedFiles((prevState) => ({
      ...prevState,
      [document._id]: files,
    }))

    console.log('handle File change', selectedFiles)
  }

  const handleUpload = async (document) => {
    const files = selectedFiles[document._id]

    if (!files || files.length === 0) {
      setErrorMessage('Please select a file to upload.')
      setAlertVisible(true)
      return
    }

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
      formData.append('document_name', document.document_name)
    }

    try {
      const response = await axios.post(`${DEFAULT_URL}file/upload`, formData)
      const uploadedDocument = response.data.data
      setErrorMessage('File uploaded successfully.' + uploadedDocument)
      setAlertVisible(true)
      console.log('Upload successful:', response.data)
      //setDocumentLink(uploadedDocument.document_link);
    } catch (error) {
      setErrorMessage('Error uploading files. Please try again later.')
      setAlertVisible(true)
      console.error('Error uploading document:', error)
    }
  }

  const handleConsultantChange = async (e) => {
    setApplicationTypeList([])
    setServicesList([])
    setTimeSlots([])
    setDocuments([])
    setSelectedApplicationType({})
    setSelectedService({})
    setSelectedTimeSlot({})
    setSelectedDate('')
    setSelectedFiles({})
    setUploadProgress({})
    setIsDocumentVisible(false)
    setIsPriceVisible(false)

    const selectedConsultantName = e.target.value
    const selectedConsultant = consultantList.find(
      (consultant) => consultant.consultant_name_en === selectedConsultantName,
    )

    setSelectedConsultant(selectedConsultant)

    if (selectedConsultant) {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${DEFAULT_URL}application/getconsultantapplicationdata/${selectedConsultant._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.jwtToken}`,
            },
          },
        )
        console.log(response.data.data)
        setApplicationTypeList(response.data.data)
        callTimeSlotApi(selectedConsultant._id)
      } catch (error) {
        console.error('Error fetching services:', error)
        setServicesList([])
        setErrorMessage(error.response?.data?.message || 'An error occurred')
        setAlertVisible(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const callTimeSlotApi = async (consultantId) => {
    try {
      if (!consultantId) {
        throw new Error('Consultant ID is required')
      }
      const response = await axios.get(
        `${DEFAULT_URL}bookappointment/gettimeslot/${consultantId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        },
      )
      if (response.data.data === null || response.data.data.length === 0) {
        setErrorMessage('No time slots available')
        setAlertVisible(true)
        return
      }
      const availableSlots = response.data.data.filter((slot) => slot.is_available)
      setTimeSlots(availableSlots)
    } catch (error) {
      console.error('Error fetching consultant list:', error)
      setErrorMessage(error.message || 'An error occurred')
      setAlertVisible(true)
    }
  }

  const handleApplicationDetails = () => {
    console.log(
      'handle Application Details',
      selectedConsultant,
      selectedApplicationType,
      selectedService,
      selectedTimeSlot,
    )
    if (
      !selectedConsultant._id ||
      !selectedApplicationType._id ||
      !selectedService._id ||
      !selectedTimeSlot._id
    ) {
      setErrorMessage('Please select all fields')
      setAlertVisible(true)
      return
    }
    setIsDocumentVisible(true)
    setDocuments(selectedService.documents)
  }

  const handleDocumentUploadDetails = () => {
    setIsPriceVisible(true)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{        
          textAlign: 'center',       
        }}
      >
        <h4 style={{ padding: '10px' }}>Book Appointment</h4>
        {/* <ProgressBar step={1} /> */}
      </div>
    

      <div className="body flex-grow-1 px-3">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <CSpinner />
          </div>
        )}
        {alertVisible && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
            <CToast
              autohide={false}
              visible={true}
              color="primary"
              className="text-white align-items-center"
              onClose={() => setAlertVisible(false)}
            >
              <div className="d-flex">
                <CToastBody>{errorMessage}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          </div>
        )}

        <form onSubmit={handleNext}>
          <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
            <CFormLabel htmlFor="consultant" style={{ marginBottom: '10px' }}>
              <strong>Fill Appointment Details </strong>
            </CFormLabel>
            <div className="mb-3">
              <label htmlFor="consultant" className="form-label">
                Consultant
              </label>
              <select
                id="consultant"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                onChange={handleConsultantChange}
              >
                <option value="" disabled selected>
                  Select..
                </option>
                {consultantList.map((consultant) => (
                  <option key={consultant._id} value={consultant.consultant_name_en}>
                    {consultant.consultant_name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="applicationtypelist" className="form-label">
                Types of Applications
              </label>
              <select
                id="applicationtypelist"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={selectedApplicationType._id || ''}
                onChange={handleApplicationTypeChange}
              >
                <option value="" disabled>
                  Select..
                </option>
                {applicationTypeList.map((applicationType) => (
                  <option key={applicationType._id} value={applicationType._id}>
                    {applicationType.application_description}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="applicationsList" className="form-label">
                Applications
              </label>
              <select
                id="applicationsList"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={selectedService._id || ''}
                onChange={handleServiceChange}
              >
                <option value="" disabled>
                  Select..
                </option>
                {servicesList.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.sub_application_description}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="timeslot" className="form-label">
                Available Date and Time
              </label>
              <select
                id="timeslot"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={selectedDate}
                onChange={handleTimeSlotChange}
              >
                <option value="" disabled>
                  Select..
                </option>
                {timeSlots.map((time) => (
                  <option key={time._id} value={time._id}>
                    {time.day} {time.start_time} - {time.end_time}
                  </option>
                ))}
              </select>
            </div>
            <CButton
              style={{ marginBottom: '10px' }}
              color="secondary"
              onClick={handleApplicationDetails}
              className="mt-2"
            >
              Next
            </CButton>
          </div>

          {isDocmentVsisible && (
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
              <CForm>
                <CFormLabel htmlFor="formFile">
                  <strong>List of Documents</strong>
                </CFormLabel>
                <CListGroup>
                  {documents.map((document, index) => (
                    <div key={index} className="mb-3 d-flex justify-content-center flex-column">
                      <CListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="label-container">
                          <label htmlFor="application_code" className="form-label">
                            {document.document_name}
                          </label>
                        </div>
                        <div className="badge-container">
                          <span
                            className={`badge ${document.is_optional ? 'bg-success' : 'bg-danger'}`}
                          >
                            {document.is_optional ? 'Optional' : 'Required'}
                          </span>
                        </div>
                      </CListGroupItem>
                      {/* <CFormLabel htmlFor={`formFile-${index}`}>
                      {document.document_name}
                      {!document.is_optional && <span style={{ color: 'red' }}>*</span>}
                    </CFormLabel>

                    <div className="md-3 d-flex align-items-center">
                      <CFormInput
                        type="file"
                        id={`formFile-${index}`}
                        onChange={(event) => handleFileChange(event, document)}
                        className="me-2"
                      />

                      <CButton
                        style={{ marginBottom: '10px' }}
                        color="secondary"
                        onClick={() => handleUpload(document)}
                        className="mt-2"
                      >
                        Upload
                      </CButton>
                    </div> */}
                    </div>
                  ))}
                </CListGroup>

                <CButton
                  style={{ marginBottom: '10px' }}
                  color="secondary"
                  onClick={handleDocumentUploadDetails}
                  className="mt-2"
                >
                  Next
                </CButton>
              </CForm>
            </div>
          )}

          {isPriceVisible && (
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
              <CFormLabel htmlFor="formFile">
                <strong>Price Breakdown</strong>
              </CFormLabel>
              <CForm>
                <CFormLabel htmlFor="formFile">Consultant Fee: $500</CFormLabel>
              </CForm>
            </div>
          )}
          {/* <button type="submit" className="btn btn-primary px-4">
            Book Appointment
          </button> */}
        </form>
      </div>
    </div>
  )
}

export default AppointmentDetail
