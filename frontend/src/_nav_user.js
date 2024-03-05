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
} from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';

const _nav_user = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/user/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Book Appointment',
    to: '/user/bookappointment',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    badge: {
      color: 'info',      
    },
  },
  // {
  //   component: CNavGroup,
  //   name: 'Application',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add Application',
  //       to: '/user/addapplication',
  //       icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  //       badge: {
  //         color: 'info',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Applications',
  //       to: '/user/applications',
  //       icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
  //       badge: {
  //         color: 'info',
  //       },
  //     },
  //   ],
  // },
];

export default _nav_user;
