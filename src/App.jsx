import './App.css'

import { Courses } from './components/Course Management/Courses';
import CourseView from './components/Course Management/CourseView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HostedCheckout from './components/PaymentService/routes/HostedCheckout';
import Success from './components/PaymentService/routes/Success';
import Failure from './components/PaymentService/routes/Failure';
import ApprovalDashboard from './components/AdminService/courseApproval';
import ViewCourses from './components/AdminService/viewCourses';
import EnrollmentView from './components/AdminService/enrollmentView';

import FeedbackForm from './components/Notifications/Feedback';

import HomePage from './components/Learner Service/pages/HomePage';
import ViewUserEnrolledCoursesPage from './components/Learner Service/pages/ViewUserEnrolledCoursesPage';

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
        <Route path='/enrolled' element={<EnrollmentView />} />

        <Route path='/feedback' element={<FeedbackForm />} />


        <Route path='/learnerHome' element={<HomePage />} />
        <Route path='/viewMyCourses' element={<ViewUserEnrolledCoursesPage />} />
        {/* <Route path='/viewCourse/:id' element={<ViewCoursePage />} />
        <Route path='/viewCourseContent/:id' element={<ViewCourseContentPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
