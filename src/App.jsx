import './App.css'

import { Courses } from './components/Course Management/Courses';
import CourseView from './components/Course Management/CourseView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HostedCheckout from './components/PaymentService/routes/HostedCheckout'
import Success from './components/PaymentService/routes/Success'
import Failure from './components/PaymentService/routes/Failure'
import ApprovalDashboard from './components/AdminService/courseApproval';
import ViewCourses from './components/AdminService/viewCourses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='/course' element={<CourseView />} />
        <Route path='/approvalDashboard' element={<ApprovalDashboard />} />
        
        <Route path='/viewCourses' element={<ViewCourses />} />
        <Route path='/hosted-checkout' element={<HostedCheckout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/failure' element={<Failure />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
