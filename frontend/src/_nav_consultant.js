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
];

export default _nav_consultant;
