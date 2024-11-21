import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Components/Icon';

const SideNavigation = () => {

  let profile = localStorage.getItem('profile')
  console.log(profile);
  


  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link 
            to="/dashboard" >
            <Icon name="home"
            className="link" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/students">
            <Icon name="student"
            className="link"/>
            Students
          </Link>
        </li>
        <li>
          <Link 
            to="/subjects">
            <Icon name="subject"
            className="link" />
            Subjects
          </Link>
        </li>
        {profile === 'SUPER-ADMIN'  && <li>
          <Link 
            to="/head-teachers">
            <Icon name="teacher"
            className="link" />
            HeadTeachers
          </Link>
        </li>}
        {(profile === 'SUPER-ADMIN' || profile === 'HEADTEACHER') && <li>
          <Link 
            to="/teachers">
            <Icon name="teacher"
            className="link" />
            Teachers
          </Link>
        </li>}
        <li>
          <Link 
            to="/performance">
            <Icon name="performance"
            className="link" />
            Performance
          </Link>
        </li>
        <li>
          <Link 
            to="/attendance" >
            <Icon name="attendance"
            className="link" />
            Attendance
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;