import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [newCourse, setNewCourse] = useState({
    courseTitle: '',
    courseDescription: '',
    coursePrice: '',
    courseThumbnail: null
  });

  async function fetchAllCoursesData() {
    const allCoursesData = await axios.get("http://localhost:8081/api/v1/courses/public/all");
    if (allCoursesData.status === 200) {
      setCourses(allCoursesData.data);
      console.log("Retrieved all Courses: ", allCoursesData.data);
    }
  }

  useEffect(() => {
    fetchAllCoursesData();
  }, [])

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse({ ...newCourse, [name]: value })
  }

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setNewCourse({ ...newCourse, courseThumbnail: file });
  }

  const handleCourseSubmit = (e) => {
    e.preventDefault();

    const courseFormData = new FormData();

    courseFormData.append("name", newCourse.courseTitle);
    courseFormData.append("description", newCourse.courseDescription);
    courseFormData.append("thumbnail", newCourse.courseThumbnail);
    courseFormData.append("price", newCourse.coursePrice);

    console.log(courseFormData);
    console.log(newCourse.courseDescription);
    console.log(newCourse.coursePrice);
    console.log(newCourse.courseTitle);

    axios.post("http://localhost:8081/api/v1/courses/instructor/add-course", courseFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 201) {
          alert("Course created successfully.");
          fetchAllCoursesData();
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleCourseRemove = async (course_id) => {

    await axios.delete(`http://localhost:8081/api/v1/courses/instructor/remove/course/${course_id}`);
    fetchAllCoursesData();
  }

  return (
    <div>
      <form className="row g-3 shadow p-3 mt-3" onSubmit={handleCourseSubmit} style={{ marginBottom: '50px' }}>
        <h3>Add New Course</h3>
        <div className="col-md-9">
          <label htmlFor="inputTitle" className="form-label" style={{ fontWeight: 'bold' }}>Course Title</label>
          <input type="text" className="form-control" id="inputTitle" name='courseTitle' value={newCourse.courseTitle} onChange={handleCourseChange} />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputPrice" className="form-label" style={{ fontWeight: 'bold' }}>Price</label>
          <input type="number" className="form-control" id="inputPrice" name='coursePrice' value={newCourse.coursePrice} onChange={handleCourseChange} style={{ textAlign: 'center' }} />
        </div>
        <div className="col-12">
          <label htmlFor="inputDescription" className="form-label" style={{ fontWeight: 'bold' }}>Description</label>
          <textarea className="form-control" id="inputDescription" rows="3" name='courseDescription' value={newCourse.courseDescription} onChange={handleCourseChange} style={{ textAlign: 'center' }}></textarea>
        </div>
        <div className="input-group mb-3">
          <input type="file" className="form-control" id="inputThumbnail" name='courseThumbnail' onChange={handleThumbnailChange} />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">SUBMIT</button>
        </div>
      </form>

      <hr />

      <div className='mt-4'>
        <h3 className='mb-3'>COURSES</h3>
        {courses.map(course => (
          <div className="card shadow" key={course.id} style={{ marginLeft: '50px', marginRight: '50px', marginBottom: '17px', position: 'relative' }}>
            <div className="row g-0">
              <div className="col-md-3">
                <img src={course.thumbnail} className="card-img img-fluid rounded-start" alt={course.id} style={{ height: '200px', objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: 'left' }}>{course.name}</h5>
                  <p className="card-text" style={{ textAlign: 'left' }}>{course.description}</p>
                </div>
                <div className="position-absolute top-0 end-0 p-2">
                  <a href={`/course?id=${course.id}`} className="btn btn-primary" style={{ width: '87px', marginTop: '10px', marginRight: '10px' }}>OPEN</a>
                </div>
                <div className="position-absolute bottom-0 end-0 p-2">
                  <span className={course.status === 'PENDING' ? `badge bg-warning` : course.status === 'DRAFT' ? 'badge bg-dark' : course.status === 'DECLINED' ? 'badge bg-danger' : course.status === 'APPROVED' ? 'badge bg-success' : 'badge bg-primary'} style={{ fontSize: '15px', paddingInline: '15px', paddingTop: '5px', paddingBottom: '5px', marginRight: '575px' }}>{course.status}</span>
                  <button onClick={() => handleCourseRemove(course.id)} className="btn btn-danger" style={{ marginBottom: '10px', marginRight: '10px' }}>REMOVE</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
