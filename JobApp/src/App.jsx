import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import AdminDashboard from './Components/AdminDashboard'
import UserDashboard from './Components/UserDashboard'
import BrowseJobs from './Components/BrowseJobs'
import AppliedJobs from './Components/AppliedJobs'

import Profile from './Components/Profile'
import RegisterCompany from './Components/Admin/RegisterCompany'
import GetCompany from './Components/Admin/GetCompany'
import CompanyDetails from './Components/Admin/CompanyDetails'

import GetJob from './Components/Admin/GetJob'
import JobDetails from './Components/Admin/JobDetails'
import PostJobForm from './Components/Admin/PostJobForm'
import JobTable from './Components/Admin/JobTable'

import ViewApplicants from './Components/Admin/ViewApplicants'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/user-dashboard/*' element={<UserDashboard/>}/>
        <Route path='/browser' element={<BrowseJobs/>}/>
        <Route path='/applied-job' element={<AppliedJobs/>}/>
       
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/registercompany' element={<RegisterCompany/>}/>
        <Route path='/getcompany' element={<GetCompany/>}/>
        <Route path="/getcompany/:id" element={<CompanyDetails/>} />

        <Route path='/registerjob' element={<PostJobForm/>}/>
        <Route path='/getjobs' element={<GetJob/>}/>
        <Route path='/getjob/:id' element={<JobDetails/>}/>
        <Route path='/viewjob' element={<JobTable/>}/>
        <Route path='/applicants/:id' element={<ViewApplicants/>}/>
      

      </Routes>
    </>
  )
}

export default App
