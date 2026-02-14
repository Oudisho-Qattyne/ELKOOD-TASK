import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './pages/Dashboard/Dashboard';
import Reservations from './pages/Reservations/Reservations';
import Header from './components/Header';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
     <Header/>
     <div className='relative top-20'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
     </div>
    </BrowserRouter>
  </StrictMode>,
)
