import React, { useState } from 'react';

const EditDocumentModal = ({ document, onSave, onClose }) => {
  const [docName, setDocName] = useState(document.name);

  const handleSave = () => {
    onSave({ ...document, name: docName });
    onClose();
  };

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Edit Document</p>
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M12.364 11.636a.999.999 0 1 1-1.414 1.414L9 10.414l-1.95 1.95a.999.999 0 1 1-1.414-1.414l1.95-1.95-1.95-1.95a.999.999 0 1 1 1.414-1.414l1.95 1.95 1.95-1.95a.999.999 0 1 1 1.414 1.414l-1.95 1.95 1.95 1.95z"
                />
              </svg>
            </div>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="docName">Document Name</label>
              <input
                type="text"
                id="docName"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const DocumentTable = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = (document) => {
    setSelectedDocument(document);
    setModalOpen(true);
  };

  const handleSave = (updatedDocument) => {
    // Example: Save to API
    console.log("Updated Document:", updatedDocument);
    // Implement API call to save the updated document
  };

  return (
    <div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{document.name}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button className="text-blue-500" onClick={() => handleEditClick(document)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <EditDocumentModal
          document={selectedDocument}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

// Example usage:
const documents = [
  { id: 1, name: 'Document 1' },
  { id: 2, name: 'Document 2' },
  { id: 3, name: 'Document 3' }
];

const App = () => {
  return (
    <div className="container mx-auto mt-8">
      <DocumentTable documents={documents} />
    </div>
  );
};

export default App;
