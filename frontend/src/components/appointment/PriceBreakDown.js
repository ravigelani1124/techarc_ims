const PriceBreakDown = ({ data, onNext, onBack }) => {
  const handleNext = () => {
    // Validate other data if needed
    const otherData = {}
    onNext({ ...data, otherData })
  }

  const handleBack = () => {
    // Validate other data if needed
    const otherData = {}
    onBack({ ...data, otherData })
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Price Summary</h2>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Consultant Fee:</span>
        <span className="font-bold">$500</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Service Fee:</span>
        <span className="font-bold">$100</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Federal Government Tax:</span>
        <span className="font-bold">$50</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <span className="text-gray-700">Total:</span>
        <span className="font-bold">$650</span>
      </div>
      {/* <button type="submit" onClick={handleNext} className="btn btn-primary px-4">
        Next
      </button>

      <button type="submit" onClick={handleBack} className="btn btn-primary px-4">
        Back
      </button> */}
    </div>
  )
}

export default PriceBreakDown
