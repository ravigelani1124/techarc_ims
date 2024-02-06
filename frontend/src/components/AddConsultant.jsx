import { useState } from "react";

export default function AddConsultant({ handleLogin }) {
  const [consultantName, setConsultantName] = useState("");
  const [consultancyGroup, setConsultancyGroup] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform validation and submit the form data
    // For now, let's just log the form data
    console.log({
      consultantName,
      consultancyGroup,
      licenseNumber,
      contactNumber,
      email,
    });

    // After submitting the form, let's assume the consultant is logged in
    handleLogin("consultant");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add New Consultant
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="consultantName" className="block mb-1">
                Consultant Name
              </label>
              <input
                type="text"
                id="consultantName"
                value={consultantName}
                onChange={(e) => setConsultantName(e.target.value)}
                className="w-full border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-white-500"
                required
              />
            </div>
            <div>
              <label htmlFor="consultancyGroup" className="block mb-1">
                Consultancy Group
              </label>
              <select
                id="consultancyGroup"
                value={consultancyGroup}
                onChange={(e) => setConsultancyGroup(e.target.value)}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select</option>
                {/* Add your consultancy group options here */}
                <option value="Option 1">IDP</option>
                <option value="Option 2">World Education</option>
                <option value="Option 3">Prime Consultant</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label htmlFor="licenseNumber" className="block mb-1">
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="block mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
