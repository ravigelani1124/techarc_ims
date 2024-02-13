import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilLibraryAdd,
  cilNoteAdd,
  cilNotes,
  cilSpeedometer,
  cilStar,
  cilPuzzle,
  cilCursor,
  cilTablet
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

  // Consultant
  {
    component: CNavGroup,
    name: 'Consultant',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Consultant',
        to: '/consultant',
        icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
      {
        component: CNavItem,
        name: 'Consultant List',
        to: '/consultant',
        icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
    ],
  },

  // Organization
  {
    component: CNavGroup,
    name: 'Organization',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Organization',
        to: '/addorg',
        icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },

      {
        component: CNavItem,
        name: 'Organizations',
        to: '/organization',
        icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
    ],
  },
]

export default _nav
