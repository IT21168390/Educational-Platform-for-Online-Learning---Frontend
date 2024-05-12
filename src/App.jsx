import './App.css'

import { Courses } from './components/Course Management/Courses';
import CourseView from './components/Course Management/CourseView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/PaymentService/routes/Home'
import HostedCheckout from './components/PaymentService/routes/HostedCheckout'
import Success from './components/PaymentService/routes/Success'
import Failure from './components/PaymentService/routes/Failure'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='/course' element={<CourseView />} />

        <Route path='/h' element={<Home />} />
        <Route path='/hosted-checkout' element={<HostedCheckout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/failure' element={<Failure />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
