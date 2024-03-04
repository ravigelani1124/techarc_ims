<div>
<div className="body flex-grow-1 px-3">
  {isLoading && (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <CSpinner />
    </div>
  )}
  <form onSubmit={handleSubmit}>
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
      <label htmlFor="servicesList" className="form-label">
        Services
      </label>
      <select
        id="servicesList"
        className="form-select form-select-md"
        aria-label=".form-select-sm example"
        required
        value={service.service_type_name}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="" disabled selected>
          Select..
        </option>
        {servicesList.map((service) => (
          <option key={service._id} value={service._id}>
            {service.service_type_name}
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
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="" disabled selected>
          Select..
        </option>
        {timeSlots.map((time) => (
          <option key={time._id} value={time._id}>
            {time.day} {time.start_time} - {time.end_time}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>
</div>