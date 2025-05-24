import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../api/api-client";

const LoginButton = () => {
  const { loginWithRedirect, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [user, setUser] = useState({});
  useEffect(() => {

    const setAccessToken = async () => {
      if (!isAuthenticated) return;

      const domain = "dev-shandaauto.ca.auth0.com";
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
        window.localStorage.setItem('access-token', accessToken);
        console.log(`access token ${accessToken}`);
      } catch (error) {
        console.log(`FAILED TO GET TOKEN ${error}`);
      }
    }

    const getUser = async () => {
      const data: any = await fetchUserData();
      setUser(data);
    }
    setAccessToken().then(() => getUser()).catch(error => console.log(`error logging in: ${error}`));
  }, [isAuthenticated, loginWithRedirect]);

  return <>
    { !isAuthenticated &&
      <button onClick={() => {
        loginWithRedirect();
      }}>Log In with Auth0</button>
    }
    { isAuthenticated && user &&
      <div className='user-container'>
        <h3>Welcome {user?.data.me.user.firstName} {user?.data.me.user.lastName}</h3>
        {JSON.stringify(user)}
      </div>
    }
  </>;
};

export default LoginButton;