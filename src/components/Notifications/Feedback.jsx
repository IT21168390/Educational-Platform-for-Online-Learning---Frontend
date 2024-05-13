import React, { useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar';

const FeedbackForm = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/users/save', { title, details });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <><NavBar />
      <div className='p-3 background' >
        <center>
          <div className='row mt-5 mb-5 rounded shadow-lg' style={{
            backgroundColor: 'rgba(173, 216, 230, 0.6)',
            backdropFilter: 'blur(5px)',
            width: '40%', // Adjust width here
            //  height: '200px' // Adjust height here
          }}>


            <h1 className='text-center'>Feedback Form</h1>
            <form onSubmit={handleSubmit} className='mt-5'>
              <div className="mb-3 col-12">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control bg-warning-subtle" value={title}
                  onChange={(e) => setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="This is title" />
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleFormControlTextarea1" className="form-label ">Description</label>
                <textarea className="form-control bg-warning-subtle" id="exampleFormControlTextarea1" rows="10" value={details}
                  onChange={(e) => setDetails(e.target.value)}></textarea>
              </div>
              <button type="submit" className='btn btn-dark px-5'>Submit</button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
}

export default FeedbackForm;
