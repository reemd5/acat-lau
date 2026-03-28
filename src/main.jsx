import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';


// import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    //   <BrowserRouter>
    <AuthProvider>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </AuthProvider>
    //   </BrowserRouter>
)
