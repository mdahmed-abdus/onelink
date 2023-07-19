import Link from '../components/Link';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

function Logout() {
  const { user: isLoggedIn } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 300);
  }, []);

  return (
    <div className="gridMainContainer mt-24">
      <div className="gridContainer text-center">
        <h1 className="text-4xl mb-2">Please Wait</h1>
        {isLoggedIn ? (
          <p className="italic">Logging out...</p>
        ) : (
          <div>
            <p>You have successfully logged out.</p>
            <Link href="/" text="Login" externalStyle="block mt-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Logout;
