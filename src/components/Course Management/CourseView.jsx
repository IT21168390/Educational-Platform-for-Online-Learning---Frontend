// import axios from 'axios';

// import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';

// function CourseView() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const courseId = searchParams.get('id');
//   console.log(courseId)

//   const [quizzes, setQuizzes] = useState([]);
//   const [course, setCourse] = useState({});

//   async function fetchAllCoursesData() {
//     const coursesData = await axios.get(`http://localhost:8081/api/v1/courses/public/${courseId}`);
//     if (coursesData.status === 200) {
//       setCourse(coursesData.data);
//       console.log("Retrieved all Courses: ", coursesData.data);
//     }
//   }

//   useEffect(() => {
//     fetchAllCoursesData();
//   }, [])

//   const handleAddQuiz = () => {
//     if (quizzes.length < 10) {
//       setQuizzes([...quizzes, { question: '', answer: '', score: '', texts: ['', '', ''] }]);
//     }
//   };

//   const handleQuizChange = (index, field, value) => {
//     const updatedQuizzes = [...quizzes];
//     updatedQuizzes[index][field] = value;
//     setQuizzes(updatedQuizzes);
//   };

//   return (
//     <div className="container">
//       <h2>Basic Course Information</h2>
//       <div className="row">
//         <div className="col-md-3">
//           <img src={course ? course.thumbnail : ''} alt="Thumbnail" style={{maxHeight: '250px'}}/>
//         </div>
//         <div className="col-md-9">
//           <form>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">Title</label>
//               <input type="text" value={course.name} className="form-control" id="title" placeholder="Enter title" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="description" className="form-label">Description</label>
//               <textarea className="form-control" value={course.description} id="description" rows="3" placeholder="Enter description"></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="price" className="form-label">Price</label>
//               <input type="text" className="form-control" value={course.price} id="price" placeholder="Enter price" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="status" className="form-label">Status</label>
//               <select className="form-select" id="status">
//                 <option>Active</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Save</button>
//           </form>
//         </div>
//       </div>

//       <hr />

//       <h2>Lecture Notes</h2>
//       {/* Implement Lecture Notes section input fields */}

//       <hr />

//       <h2>Course Video</h2>
//       {/* Implement Course Video section input fields */}

//       <hr />

//       <h2>Quizzes</h2>
//       {quizzes.map((quiz, index) => (
//         <div key={index}>
//           <div className="mb-3">
//             <label htmlFor={`question-${index}`} className="form-label">Question</label>
//             <input
//               type="text"
//               className="form-control"
//               id={`question-${index}`}
//               value={quiz.question}
//               onChange={(e) => handleQuizChange(index, 'question', e.target.value)}
//             />
//           </div>
//           {/* Similar input fields for answer, score, and texts */}
//         </div>
//       ))}
//       {quizzes.length < 10 && (
//         <button className="btn btn-secondary" onClick={handleAddQuiz}>Add Quiz</button>
//       )}
//     </div>
//   );
// };

// export default CourseView




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

function CourseView() {
  /*const [course, setCourse] = useState({
    thumbnail: '',
    name: '',
    description: '',
    price: '',
    status: 'Draft',
    lectures: [],
    videos: [],
    quizzes: [],
  });*/

  const [newQuiz, setNewQuiz] = useState({
    question: 'QUESTION',
    answer: 'ANSWER',
    weight: '',
    options: ['OPTION 1', 'OPTION 2', 'OPTION 3', 'OPTION 4'],
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('id');
  //console.log(courseId)

  const [courseData, setCourseData] = useState({});

  const [videoFile, setVideoFile] = useState();
  const [lectureFile, setLectureFile] = useState();
  /*const [basicCourseInfo, setBasicCourseInfo] = useState({
    name: '',
    description: '',
    price: ''
  });*/

  async function fetchAllCoursesData() {
    const coursesData = await axios.get(`http://localhost:8081/api/v1/courses/public/${courseId}`);
    if (coursesData.status === 200) {
      setCourseData(coursesData.data);
      console.log("Retrieved all Courses: ", coursesData.data);
    }
  }

  useEffect(() => {
    fetchAllCoursesData();
  }, [])

  function isPDF() {
    return courseData.course_content && courseData.course_content.lecture_note && courseData.course_content.lecture_note.note_Url.endsWith('.pdf');
  }
  function isImage() {
    return courseData.course_content && courseData.course_content.lecture_note && courseData.course_content.lecture_note.note_Url.endsWith('.jpg') || courseData.course_content.lecture_note.note_Url.endsWith('.png');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //setCourse({ ...course, [name]: value });
    setCourseData({ ...courseData, [name]: value });
  };

  const handleVideoFileChange = (event) => {
    //setCourse({ ...course, [event.target.name]: event.target.files[0] });
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleLectureFileChange = (event) => {
    setLectureFile(event.target.files[0]);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const description = courseData.course_content.video.description;

    console.log("Submitted Video:", courseData.course_content.video);
  };

  const handleLectureNoteSubmit = (e) => {
    e.preventDefault();
    const description = courseData.course_content.lecture_note.description;

    console.log("Submitted Lecture Note:", courseData.course_content.lecture_note);
  };

  /*const handleQuizChange = (event) => {
    const { name, value, index } = event.target;
    if (name === 'options') {
      const newOptions = [...newQuiz.options];
      newOptions[index] = value;
      setNewQuiz({ ...newQuiz, options: newOptions });
    } else {
      setNewQuiz({ ...newQuiz, [name]: value });
    }
  };*/
  const handleQuizChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuizzes = [...courseData.course_content.quizzes];
    updatedQuizzes[index] = { ...updatedQuizzes[index], [name]: value };
    setCourseData({ ...courseData, course_content: { ...courseData.course_content, quizzes: updatedQuizzes } })
  };

  const addQuiz = (e) => {
    e.preventDefault();
    //setCourse({ ...course, quizzes: [...course.quizzes, newQuiz] });
    setCourseData({ ...courseData, course_content: { ...courseData.course_content, quizzes: [...courseData.course_content.quizzes, newQuiz] } })
    setNewQuiz({ question: 'QUESTION', answer: 'ANSWER', weight: '', options: ['OPTION 1', 'OPTION 2', 'OPTION 3', 'OPTION 4'] });
    console.log("QUIZZES: ", courseData.course_content.quizzes);
  };

  const removeQuiz = (quizIndex) => {
    const updatedQuizzes = [...courseData.course_content.quizzes];
    updatedQuizzes.splice(quizIndex, 1);
    //setCourse({ ...course, quizzes: updatedQuizzes });
    setCourseData({ ...courseData, course_content: { ...courseData.course_content, quizzes: updatedQuizzes } });
    console.log(updatedQuizzes);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newOptions = [...courseData.course_content.quizzes[index].options];
    newOptions[optionIndex] = event.target.value;

    const updatedQuizzes = [...courseData.course_content.quizzes];
    updatedQuizzes[index] = { ...updatedQuizzes[index], options: newOptions };
    //setNewQuiz(prevState => ({ ...prevState, options: newOptions }));
    setCourseData({ ...courseData, course_content: { ...courseData.course_content, quizzes: updatedQuizzes } });
  };

  /*const handleOptionChange = (index, event) => {
    const newOptions = [...newQuiz.options];
    newOptions[index] = event.target.value;
    setNewQuiz({ ...newQuiz, options: newOptions });
  };*/

  const addOption = () => {
    setNewQuiz({ ...newQuiz, options: [...newQuiz.options, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const basicCourseInfo = {
        name: courseData.name,
        description: courseData.description,
        price: courseData.price
      }

      //const response = await axios.put(`http://localhost:8081/api/v1/courses/instructor/update/info/${courseId}?courseName=${courseData.name}&coursePrice=${courseData.price}&description=${courseData.description}`);
      const response = await axios.put(`http://localhost:8081/api/v1/courses/instructor/update/info/${courseId}`, basicCourseInfo);

      console.log('UPDATED', response.data);
      //fetchAllCoursesData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuizzesSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8081/api/v1/courses/instructor/add/${courseId}/quizzes`, courseData.course_content.quizzes)
      .then((response) => {
        if (response.status === 201) {
          alert("Quizzes submitted successfully!");
          fetchAllCoursesData();
        }
      }).catch((error) => {
        console.error(error);
      })
    // Implement logic to submit all quizzes (e.g., send data to server)
    console.log("Submitted all quizzes:", courseData.course_content.quizzes);
  };

  return (
    <div className="container">
      <div className="container shadow p-3 mb-5 bg-white rounded">
        <h2>Course Information</h2>
        {/* <div className="row">
        <div className="col-md-6">
          <img src={courseData.thumbnail} alt="Course Thumbnail" style={{ maxHeight: '250px' }} />
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={courseData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <span className="badge bg-secondary">{course.status}</span>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div> */}
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ marginTop: '25px' }}>
            <div className="col-md-6">
              <img src={courseData.thumbnail} alt="Course Thumbnail" style={{ maxHeight: '250px' }} />
            </div>
            <div className="col-md-6">
              <div className="form-group" style={{ textAlign: 'left', marginBottom: '7px' }}>
                <label htmlFor="title" style={{ fontWeight: 'bold' }}>Title :</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={courseData && courseData.name ? courseData.name : ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group" style={{ textAlign: 'left', marginBottom: '7px' }}>
                <label htmlFor="description" style={{ fontWeight: 'bold' }}>Description :</label>
                <textarea
                  className="form-control"
                  rows={3}
                  id="description"
                  name="description"
                  value={courseData && courseData.description ? courseData.description : ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group" style={{ textAlign: 'left', marginBottom: '7px' }}>
                    <label htmlFor="price" style={{ fontWeight: 'bold' }}>Price :</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={courseData && courseData.price ? courseData.price : ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <span className={courseData.status === 'PENDING' ? `badge bg-dark` : courseData.status === 'DECLINED' ? 'badge bg-danger' : courseData.status === 'APPROVED' ? 'badge bg-success' : 'badge bg-primary'} style={{ fontSize: '15px', paddingInline: '25px', paddingTop: '8px', paddingBottom: '8px', marginLeft: 'auto' }}>{courseData.status}</span>
                </div>
              </div>
            </div>
          </div>
          <center><div /*className="d-flex justify-content-end mt-1"*/ className="mt-1" style={{ marginLeft: '45%' }}>  <button type='submit' className="btn btn-warning" style={{ width: '200px', fontWeight: 'bold' }}>UPDATE</button>
          </div></center>
        </form>
      </div>

      <hr />
      {/* <h3>Lecture Notes</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="lectureFile">File</label>
            <input
              type="file"
              className="form-control"
              id="lectureFile"
              name="lectures"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="lectureDescription">Description</label>
            <textarea
              className="form-control"
              id="lectureDescription"
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lectureScore">Score</label>
            <input
              type="number"
              className="form-control"
              id="lectureScore"
              name="score"
              value={course.lectures.length > 0 ? course.lectures[0].score : ''}
              onChange={(e) => {
                const newLectures = [...course.lectures];
                if (newLectures.length === 0) {
                  newLectures.push({});
                }
                newLectures[0].score = e.target.value;
                setCourse({ ...course, lectures: newLectures });
              }}
            />
          </div>
          <button className="btn btn-primary">Save</button>
        </div>
      </div> */}
      <div className="container shadow p-4 mb-4">
        <h3>Lecture Notes</h3>
        <center>
          <div className="col-md-12 mb-3">
            {courseData.course_content && courseData.course_content.lecture_note && courseData.course_content.lecture_note.note_Url ? (
              isPDF() ? (
                <a href={courseData.course_content.lecture_note.note_Url} download>
                  <FontAwesomeIcon icon={faFilePdf} fontSize={'30px'} /> <label style={{ fontSize: '20px' }}> Download {courseData.name} Notes</label>
                </a>
                // <Document file={courseData.course_content.lecture_note.note_Url} />
              ) : isImage() ? (
                <img src={courseData.course_content.lecture_note.note_Url} style={{ maxWidth: '50%' }} alt="Lecture Note" />
              ) : (
                <p>Unsupported file format</p>
              )
            ) : (
              ''
            )}
          </div>
        </center>

        {/* <center>
          <div className="col-md-12 mb-3">
            {courseData.course_content && courseData.course_content.lecture_note && courseData.course_content.lecture_note.note_Url ? <Document file={courseData.course_content.lecture_note.note_Url} />
              : ''}
          </div>
        </center> */}
        <form onSubmit={handleLectureNoteSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="lectureFile" style={{ fontWeight: 'bold' }}>File</label>
                <input
                  type="file"
                  className="form-control"
                  id="lectureFile"
                  name="lectures"
                  required={true}
                  onChange={handleLectureFileChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="lectureScore" style={{ fontWeight: 'bold' }}>Weight</label>
                <input
                  type="number"
                  className="form-control"
                  id="lectureScore"
                  name="weight"
                  disabled={true}
                  style={{ textAlign: 'center' }}
                  //value={course.lectures.length > 0 ? course.lectures[0].score : ''}
                  value={courseData.course_content && courseData.course_content.lecture_note ? courseData.course_content.lecture_note.weight : ''}
                  // onChange={(e) => {
                  //   const newLectures = [...course.lectures];
                  //   if (newLectures.length === 0) {
                  //     newLectures.push({});
                  //   }
                  //   newLectures[0].score = e.target.value;
                  //   setCourse({ ...course, lectures: newLectures });
                  // }}
                  onChange={() => { }} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="lectureDescription" style={{ fontWeight: 'bold' }}>Description</label>
                <textarea
                  className="form-control"
                  id="lectureDescription"
                  name="description"
                  style={{ textAlign: 'center' }}
                  required={true}
                  value={courseData.course_content && courseData.course_content.lecture_note && courseData.course_content.lecture_note.description ? courseData.course_content.lecture_note.description : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-end">
              <button type='submit' className="btn btn-primary">Save</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* Add view to preview existing Lecture note */}
            </div>
          </div>
        </form>
      </div>

      <div className="container shadow p-4 mb-4">
        <h3>Course Video</h3>

        <div className="row" >
          <center>
            <div className="col-md-12 mb-3">
              {courseData.course_content && courseData.course_content.video && courseData.course_content.video.video_Url ? <ReactPlayer url={courseData.course_content && courseData.course_content.video && courseData.course_content.video.video_Url /*? courseData.course_content.video.video_Url : ''*/} width={'60%'} controls={true} light={<img src={courseData.thumbnail} alt='Thumbnail' width={'65%'} />} />
                : ''}
            </div>
          </center>
        </div>
        <form onSubmit={handleVideoSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="videoFile" style={{ fontWeight: 'bold' }}>File</label>
                <input
                  type="file"
                  className="form-control"
                  id="videoFile"
                  name="videos"
                  required={true}
                  onChange={handleVideoFileChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="videoScore" style={{ fontWeight: 'bold' }}>Weight</label>
                <input
                  type="number"
                  className="form-control"
                  id="videoScore"
                  name="weight"
                  disabled={true}
                  style={{ textAlign: 'center' }}
                  //value={course.videos.length > 0 ? course.videos[0].score : ''}
                  value={courseData.course_content && courseData.course_content.video && courseData.course_content.video.weight ? courseData.course_content.video.weight : ''}
                  // onChange={(e) => {
                  //   const newVideos = [...course.videos];
                  //   if (newVideos.length === 0) {
                  //     newVideos.push({});
                  //   }
                  //   newVideos[0].score = e.target.value;
                  //   setCourse({ ...course, videos: newVideos });
                  // }}
                  onChange={() => { }} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="videoDescription" style={{ fontWeight: 'bold' }}>Description</label>
                <textarea
                  className="form-control"
                  id="videoDescription"
                  name="description"
                  style={{ textAlign: 'center' }}
                  required={true}
                  value={courseData.course_content && courseData.course_content.video && courseData.course_content.video.description ? courseData.course_content.video.description : ''}
                  //onChange={handleInputChange}
                  onChange={() => { }}
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-end">
              <button type='submit' className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>

      {/* <h3>Quizzes</h3>
      <div>
        {course.quizzes.map((quiz, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-header">Quiz {index + 1}</div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question</label>
                <input
                  type="text"
                  className="form-control"
                  id={`question-${index}`}
                  name="question"
                  value={quiz.question}
                  onChange={(e) =>
                    handleQuizChange({ ...e.target, index })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`answer-${index}`}>Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id={`answer-${index}`}
                  name="answer"
                  value={quiz.answer}
                  onChange={(e) =>
                    handleQuizChange({ ...e.target, index })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`score-${index}`}>Score</label>
                <input
                  type="number"
                  className="form-control"
                  id={`score-${index}`}
                  name="score"
                  value={quiz.score}
                  onChange={(e) =>
                    handleQuizChange({ ...e.target, index })
                  }
                />
              </div>
              <div className="form-group">
                <label>Options</label>
                {quiz.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(optionIndex, e)
                      }
                    />
                  </div>
                ))}
                <button
                  className="btn btn-sm btn-secondary"
                  disabled={quiz.options.length >= 3}
                  onClick={addOption}
                >
                  Add Option
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" disabled={course.quizzes.length >= 10} onClick={addQuiz}>
          Add Quiz
        </button>
      </div> */}
      <div className="container shadow" style={{ marginTop: '50px' }}>
        <h3>QUIZZES</h3>
        <div>
          <form onSubmit={handleQuizzesSubmit}>
            {courseData.course_content && courseData.course_content.quizzes && courseData.course_content.quizzes.map((quiz, index) => (
              <div className="card mb-3 quiz-card" key={index}>
                <div className="card-header d-flex justify-content-between">
                  <span>Quiz {index + 1}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeQuiz(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div className="form-group">
                    <label htmlFor={`question-${index}`} style={{ fontWeight: 'bold' }}>Question</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`question-${index}`}
                      name="question"
                      style={{ textAlign: 'center' }}
                      required={true}
                      value={quiz.question}
                      onChange={(e) => handleQuizChange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`answer-${index}`} style={{ fontWeight: 'bold' }}>Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`answer-${index}`}
                      name="answer"
                      style={{ backgroundColor: 'lightgreen', textAlign: 'center' }}
                      required={true}
                      value={quiz.answer}
                      onChange={(e) => handleQuizChange(e, index)}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Options</label>
                    {quiz.options && quiz.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder={`Option ${optionIndex + 1}`}
                          style={{ backgroundColor: 'lightyellow', textAlign: 'center' }}
                          required={true}
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label htmlFor={`score-${index}`} style={{ fontWeight: 'bold' }}>Weight</label>
                    <input
                      type="number"
                      className="form-control"
                      id={`score-${index}`}
                      name="weight"
                      style={{ textAlign: 'center' }}
                      value={quiz.weight}
                      onChange={(e) => handleQuizChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Submit All Quizzes
          </button>
          <button className="btn btn-secondary float-right" disabled={!courseData.course_content || courseData.course_content.quizzes.length >= 10} onClick={addQuiz}>
            Add Quiz
          </button> */}
            <div className="d-flex justify-content-between mt-3 p-2">
              <label></label>
              <button type='submit' className="btn btn-warning float-right">
                Submit All Quizzes
              </button>
            </div>
            {/* <div className="d-flex justify-content-between mt-3 p-2">
              <button className="btn btn-success float-right" disabled={!courseData.course_content || courseData.course_content.quizzes.length >= 10} onClick={addQuiz}>
                Add Quiz
              </button>
              <button type='submit' className="btn btn-warning">
                Submit All Quizzes
              </button>
            </div> */}

          </form>
          <div className="d-flex justify-content-between mt-3 p-2">
            <button className="btn btn-success float-left" disabled={!courseData.course_content || courseData.course_content.quizzes.length >= 10} onClick={addQuiz}>
              Add Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;