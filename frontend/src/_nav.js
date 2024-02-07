import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilNotes,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavItem,
    name: 'Consultant',
    to: '/forms/form-control',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },


  {
    component: CNavItem,
    name: 'Consultancy',
    to: '/consultancy',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },

  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
]

export default _nav
