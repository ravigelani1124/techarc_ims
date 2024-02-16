import React,{useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { logo } from 'src/assets/brand/logo'

// sidebar nav config
import _nav_admin from '../_nav_admin'
import UserContext from 'src/utils/UserContext'
import _nav_consultant from '../_nav_consultant'
import _nav_user from '../_nav_user'

const AppSidebar = () => {

  const { user } = useContext(UserContext);

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)


const getSidebarNavItems = () => {
  if (user && user.role === 'admin') {
    return _nav_admin;
  } else if (user && user.role === 'consultant') {
    return _nav_consultant;
  }
  // Return default navigation items or handle other roles as needed
  return _nav_user;
};


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">      
        <CIcon className="sidebar-brand-full" icon={logo} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={getSidebarNavItems()} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
