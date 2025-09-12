import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const location = useLocation();

  if (!user) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
