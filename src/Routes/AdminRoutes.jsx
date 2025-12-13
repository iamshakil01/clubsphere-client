import useRole from '../hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';
import useAuth from '../hooks/useAuth';


const AdminRoutes = ({ children }) => {
    const { isLoading } = useAuth();
    const { role, roleLoading } = useRole();

    if (isLoading || roleLoading) {
        return <Loading />;
    }

    if (role !== 'admin') {
        return <Forbidden />;
    }

    return children; 
};

export default AdminRoutes;