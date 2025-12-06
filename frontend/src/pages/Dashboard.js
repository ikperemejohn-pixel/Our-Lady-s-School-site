import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Header({role}){
  return (<div style={{background:'#0b3b8c',color:'#fff',padding:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}><img src='/logo.png' style={{height:40}} alt='logo' /><div><div style={{fontWeight:700}}>Our Lady's Catholic Secondary School</div><div style={{fontSize:12}}>Kulende - Ilorin</div></div></div>
    <div>Role: <strong>{role}</strong></div>
  </div>);
}

function StudentView(){
  return (<div style={{padding:20}}>
    <h3>Student Dashboard</h3>
    <p>My Results</p>
    <ul><li>Maths - 78 (B)</li><li>English - 85 (A)</li></ul>
    <p><a href='#'>Download Report Card (PDF)</a></p>
  </div>);
}
function TeacherView(){
  return (<div style={{padding:20}}>
    <h3>Teacher Dashboard</h3>
    <p>Manage classes and upload results</p>
    <p><Link to='/'>Back to Home</Link></p>
  </div>);
}
function ParentView(){
  return (<div style={{padding:20}}>
    <h3>Parent Dashboard</h3>
    <p>Child: Student One (JSS1)</p>
    <p><a href='#'>View Result Slip</a></p>
  </div>);
}
function AdminView(){
  return (<div style={{padding:20}}>
    <h3>Admin Dashboard</h3>
    <p>Manage students, teachers, classes</p>
    <p><Link to='/'>Back to Home</Link></p>
  </div>);
}

export default function Dashboard(){
  const { role } = useParams();
  return (<div style={{fontFamily:'sans-serif',minHeight:'100vh'}}>
    <Header role={role} />
    <div style={{padding:20}}>
      {role==='student' && <StudentView/>}
      {role==='teacher' && <TeacherView/>}
      {role==='parent' && <ParentView/>}
      {role==='admin' && <AdminView/>}
    </div>
  </div>);
}
