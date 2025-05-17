import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
  // get from dot entv `import.meta.env.VITE_API`
    domain="dev-shandaauto.ca.auth0.com"
    clientId="XrF1RcIzMwLDmtZNSeikLFzEL5qgeQ5l"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
