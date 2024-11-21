import React from 'react'
import TopNavigation from './Layouts/TopNavigation';
import SideNavigation from './Layouts/SideNavigation';
import { Outlet } from 'react-router-dom';


const Layouts = () => {
  return (
    <div className='layout'>
        <div className='topNavbar'>
            <TopNavigation/>
        </div>
        <div className='sideNavigation'>
            <SideNavigation/>
        </div>
        <div className='mainBox'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layouts