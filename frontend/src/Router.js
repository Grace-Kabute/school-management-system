import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import Layouts from "./Layouts";
import Dashboard from './Routes/Dashboard'
import Attendance from './Routes/Attendance'
import Performance from './Routes/Performance'
import Students from './Routes/Students'
import Subjects from './Routes/Subjects'
import Teachers from './Routes/Teachers'
import Login from './Routes/Login'
import LandingPage from './Routes/LandingPage'
import HeadTeachersList from "./Routes/HeadTeachers";

const App = createBrowserRouter([
  {
        path: "/landingPage",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      

  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/landingPage",
        element: <LandingPage />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/performance",
        element: <Performance />,
      },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/subjects",
        element: <Subjects />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/head-teachers",
        element: <HeadTeachersList />,
      }
    ],
  },
]);
export default App