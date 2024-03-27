import React, { useState } from 'react';
import { CListGroupItem, CFormCheck, CButton, CButtonGroup } from '@coreui/react';

const DocumentListItem = ({ document, selectedDocs, setSelectedDocs }) => {
  const [isOptional, setIsOptional] = useState(false);

  const handleToggleDocument = () => {
    setSelectedDocs(prevSelectedDocs => {
        if (prevSelectedDocs.some(doc => doc._id === document._id)) {
          return prevSelectedDocs.filter(doc => doc._id !== document._id);
        } else {
          const updatedDoc = { ...document, is_optional: isOptional }; // Include is_optional in the document object
          return [...prevSelectedDocs, updatedDoc];
        }
      });
  };

  const handleSetOptional = () => {
    setIsOptional(!isOptional);

  };

  const handleSelectAll = () => {
    setSelectedDocs(documents.map(doc => doc._id));
  };

  const handleDeselectAll = () => {
    setSelectedDocs([]);
  };

  return (
    <CListGroupItem>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CFormCheck
          label={document.document_name}
          checked={selectedDocs.some(doc => doc._id === document._id)}
          onChange={handleToggleDocument}
        />
        <CFormCheck
          label="Optional"
          checked={isOptional}
          onChange={handleSetOptional}
        />
      </div>
      {/* <CButtonGroup role="group" aria-label="Basic outlined example">
        <CButton color="primary" onClick={handleSelectAll} variant="outline">
          Select All
        </CButton>
        <CButton color="primary" variant="outline" onClick={handleDeselectAll}>
          Deselect All
        </CButton>
      </CButtonGroup> */}
    </CListGroupItem>
  );
};

export default DocumentListItem;
