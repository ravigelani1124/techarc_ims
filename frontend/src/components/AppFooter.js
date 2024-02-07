import React from 'react'
import { CFooter,CLink } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <span className="me-1">Powered by @ </span>
        <a href="https://techarc.com" target="_blank" rel="noopener noreferrer">
          Prime Time Consultancy
        </a>
      </div>    
    </CFooter>
  )
}

export default React.memo(AppFooter)
