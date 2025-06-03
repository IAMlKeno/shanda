import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from './components/auth0/Auth0Login'
import LogoutButton from './components/auth0/Auth0Logout'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to the Shanda Platform</h1>

      <div>
        <LoginButton />
      </div>
      <hr />
      <div>
        <LogoutButton />
      </div>
    </>
  )
}

export default App
