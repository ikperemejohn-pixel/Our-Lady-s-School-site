import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();
  function submit(e){ e.preventDefault(); 
    // simple demo: redirect based on email contains
    let role='student';
    if(email.includes('admin')) role='admin';
    else if(email.includes('teacher')) role='teacher';
    else if(email.includes('parent')) role='parent';
    navigate('/dashboard/'+role);
  }
  return (<div style={{fontFamily:'sans-serif',padding:30}}>
    <img src='/logo.png' style={{height:80}} alt='logo' />
    <h2>Portal Login</h2>
    <form onSubmit={submit} style={{maxWidth:400}}>
      <div style={{marginBottom:10}}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' style={{width:'100%',padding:8}} /></div>
      <div style={{marginBottom:10}}><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' style={{width:'100%',padding:8}} /></div>
      <button style={{padding:'10px 20px',background:'#0b3b8c',color:'#fff',border:'none'}}>Login</button>
    </form>
    <p style={{marginTop:10}}>Demo accounts: admin@olcssilorin.com / Admin@123, student1@olcssilorin.com / password123</p>
  </div>);
}
