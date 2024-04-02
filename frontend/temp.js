<CAccordion alwaysOpen>
{appointments.map((item, index) => (
  <CAccordionItem
    style={{ backgroundColor: '#f9f9f9' }}
    key={index}
    itemKey={index}
  >
    <CAccordionHeader>
    <strong>{item.appointment.application_type}: </strong>{' '}{item.appointment.appsub_type}
    </CAccordionHeader>
    <CAccordionBody>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <CFormLabel
          htmlFor="consultant"                          
          style={{ marginBottom: '10px', display: 'block' }}
        >
          <strong>Application Details</strong>
        </CFormLabel>

        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {item.appointment.application_type} : {item.appointment.appsub_type}
        </CFormLabel>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '10px', display: 'block' }}
        >
          <strong>User Details</strong>
        </CFormLabel>

        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {item.user.user_name_en}
        </CFormLabel>
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {item.user.user_email} | {item.user.user_phone}
        </CFormLabel>
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {item.user.street_no}, {item.user.street_name},
          {item.user.city}, {item.user.state}, {item.user.zip},{' '}
          {item.user.country}
        </CFormLabel>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '10px', display: 'block' }}
        >
          <strong>Time Slot</strong>
        </CFormLabel>

        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {item.appointment.timeslot_date} {item.appointment.timeslot_start_time}-{' '}
          {item.appointment.timeslot_end_time}
        </CFormLabel>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '10px', display: 'block' }}
        >
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
                <span
                  className={`badge ${
                    subItem.is_optional ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {subItem.is_optional ? 'Optional' : 'Required'}
                </span>
              </div>
            </CListGroupItem>
          ))}
        </CListGroup>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '10px', display: 'block' }}
        >
          <strong>Price Breakdown</strong>
        </CFormLabel>

        <CFormLabel
          htmlFor="consultant"
          style={{ marginBottom: '5px', display: 'block' }}
        >
          {'Charged Fees'} : ${item.appointment.consultant_fee}
        </CFormLabel>
      </div>

      {/* <div style={{ textAlign: 'right' }}>
        <CButton color="primary" onClick={() => handleDownload(item)}>
          Download PDF
        </CButton>
      </div> */}
    </CAccordionBody>
  </CAccordionItem>
))}
</CAccordion>