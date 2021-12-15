import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from './context/authContext';

const GuardedRoute = ({path}) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet /> : <Navigate to={path} />
}

export default GuardedRoute;