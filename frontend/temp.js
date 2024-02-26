<DatePicker
  selected={selectedDate}
  minDate={new Date()}
  onChange={(date) => setSelectedDate(date)}
  className="form-control" // Add this className to make it span full width
/>
