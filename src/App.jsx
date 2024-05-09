import './App.css'

import { Courses } from './components/Course Management/Courses';
import CourseView from './components/Course Management/CourseView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='/course' element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
