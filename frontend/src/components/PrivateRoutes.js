import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = {'token': false}
    const user = localStorage.getItem('user');
    if(!user){
        auth.token = false
    }else{
        auth.token = true
    }

    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes