
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();

    if (loader) {
        return <div className='flex justify-center items-center py-[200px]'><span className="loading loading-spinner loading-lg "></span></div>
    }

    if (user) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node,
}