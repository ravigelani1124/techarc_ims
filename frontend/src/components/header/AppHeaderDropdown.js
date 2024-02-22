import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar2 from './../../assets/images/avatars/2.jpg'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("Logout user")
    localStorage.clear()
    localStorage.removeItem('user')      
    const userLoggedIn = localStorage.getItem('user'); 
    console.log("Launcher----------: ",userLoggedIn);
    if (!userLoggedIn) {    
      navigate('/')
    }    
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar2} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">    
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>        
        <CDropdownItem  onClick={ handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Sign out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
