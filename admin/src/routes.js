import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Forms
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
]

export default routes
