import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) window.localStorage.removeItem('access-token');
  }, [isAuthenticated, logout]);

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;