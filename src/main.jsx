import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import InfoApp from './info/InfoApp.jsx'
import './index.css'
import './info/info.css'
import { LanguageProvider } from './context/LanguageContext.jsx'

// Vercel may serve the static index.html before applying an SPA rewrite.
// Select the independent info experience at runtime for its subdomain, while
// preserving the primary portfolio unchanged on every other hostname.
const isInfoSubdomain =
  window.location.hostname === 'info.abouminyar.ly' ||
  window.location.hostname.startsWith('info.');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isInfoSubdomain ? (
      <InfoApp />
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )}
  </React.StrictMode>,
)
