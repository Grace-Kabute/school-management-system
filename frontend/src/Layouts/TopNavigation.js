import React, { useEffect, useState } from 'react';
import './Layouts.css'
import { useNavigate } from 'react-router-dom';


const TopNavigation = ({ altText = 'User Avatar' }) => {
  const navigate = useNavigate();

  const logOutUser = () => {

    localStorage.clear();
  
    navigate('/landingPage');
  
  }

  const [profile, setProfile] = useState('');

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    setProfile(savedProfile);
  }, []);

  return (
    <div className='topnavContainer'>
      <h2 className='schoolName'>Akatsi college practice school</h2>
      <div className='profile'>
      {profile === 'SUPER-ADMIN' && <p>Super Admin</p>}
      {profile === 'HEADTEACHER' && <p>Admin</p>}
      {profile === 'TEACHER' && <p>Teacher</p>}
      <button className='profileButton' onClick={logOutUser}>Logout</button>
      </div>
    </div>
  )
}



export default TopNavigation