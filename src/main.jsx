import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'regenerator-runtime/runtime';
import { LanguageProvider } from './pages/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
    <App />
    </LanguageProvider>
   
  </StrictMode>,
)
