import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App(){
  return (<BrowserRouter><Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/dashboard/:role' element={<Dashboard/>} />
  </Routes></BrowserRouter>);
}
function Home(){
  return (<div style={{fontFamily:'sans-serif',padding:30}}>
    <img src='/logo.png' style={{height:80}} alt='logo' />
    <h1>Our Lady's Catholic Secondary School, Ilorin</h1>
    <p>Motto: God is Good</p>
    <p><Link to='/login'>Portal Login</Link></p>
  </div>);
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
