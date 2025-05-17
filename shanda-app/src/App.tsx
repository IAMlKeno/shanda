import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchSomeData } from './api/api-client'
import LoginButton from './components/auth0/Auth0Login'
import LogoutButton from './components/auth0/Auth0Logout'

function App() {
  const [count, setCount] = useState(0)
  const test = fetchSomeData();

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
      <h1>Shanda</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <LoginButton />
      </div>
      <hr />
      <div>
        <LogoutButton />
      </div>
      <div>
        <h2>Data from api</h2>
        { test }
      </div>
    </>
  )
}

export default App
