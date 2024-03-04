import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import { EcommerceApp } from './EcommerceApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <EcommerceApp />
    </React.StrictMode>
  </BrowserRouter>
)
