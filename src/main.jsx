import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'
import ScrollToTop from 'react-scroll-to-top'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
      <ScrollToTop smooth color='white' style={{backgroundColor:'#3882f6',display:"flex", alignItems:'center',justifyContent:"center"}}/> 
    </ThemeContextProvider>
  </StrictMode>
)
