import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export default function LogoutPage() {
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    }
  }, [isAuthenticated, logout]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging out...</p>
    </div>
  );
}