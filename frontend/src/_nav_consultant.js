import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilDescription,
  cilLibraryAdd,
  cilNoteAdd,
  cilNotes,
  cilSpeedometer,
  cilStar,
  cilPuzzle,
  cilCursor,
  cilTablet,
  cilSpreadsheet,
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

const _nav_consultant = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/consultant/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name: 'Client',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Client',
        to: '/consultant/adduser',
        icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
      {
        component: CNavItem,
        name: 'Clients',
        to: '/consultant/users',
        icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Schedule',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Set Availability',
        to: '/consultant/setavailality',
        icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
        badge: {
          color: 'info',
          // text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'MyCalender',
        to: '/consultant/mycalender',
        icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
        badge: {
          color: 'info',
        },
      },
    ],
  },
  
];

export default _nav_consultant;
