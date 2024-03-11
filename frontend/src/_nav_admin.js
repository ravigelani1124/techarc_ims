import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilLibraryAdd,
  cilNoteAdd,
  cibAddthis,
  cilNotes,
  cilSpeedometer,
  cilStar,
  cilPuzzle,
  cilCursor,
  cilTablet,
  cilDoubleQuoteSansRight,
  cilFeaturedPlaylist,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav_admin = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
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
        to: '/addconsultant',
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

  {
    component: CNavGroup,
    name: 'Applications',
    icon: <CIcon icon={cilDoubleQuoteSansRight} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Application Type',
        to: '/addapplicationtype',
        icon: <CIcon icon={cibAddthis} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },

      {
        component: CNavItem,
        name: 'Application SubType',
        to: '/addsubtypetype',
        icon: <CIcon icon={cibAddthis} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },

      {
        component: CNavItem,
        name: 'Application List',
        to: '/applicationtypes',
        icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
    ],
  },
]

export default _nav_admin
