import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
//import CourseData from "../util/CourseData";


function ViewCoursePage() {
    const { id } = useParams();
    if (id) {
        localStorage.setItem("coursId", id);
        localStorage.setItem("userId", '2');
    }
    const [course, setCourse] = useState([]);

    // const [cardNumber, setCardNumber] = useState('');
    // const [expiryDate, setExpiryDate] = useState('');
    // const [cvv, setCvv] = useState('');

    // const btnClose = useRef(null);



    useEffect(() => {
        //To Do : Make an api call to Course Management Service to get the course by ID
        getCourseById();

        /////////// Dummy Data /////////////////////
        //setCourse(CourseData.find(s => s.id == id));
        ///////////////////////////////////////////
    }, []);

    async function getCourseById() {
        try {
            await axios.get(`http://localhost:8081/api/v1/courses/public/${id}`).then(res => {
                if (res.status === 200) {
                    setCourse(res.data)
                }
            }).catch(err => {
                console.log(err)
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = () => {
        window.location.href = '/hosted-checkout';
    };
    return (
        <div className="container">

            <div className="row mt-5">
                <div className="col-lg-6" style={{ width: '50%' }}>
                    <img src={course.thumbnail} style={{ width: '100%' }} alt="" />
                </div>
                <div className="col-lg-6">
                    <h1 style={{ fontWeight: '200' }}>{course.title}</h1>
                    <p>{course.description}</p>
                    <h4>${course.price}</h4>
                    <button className="btn btn-primary" type="button" class="btn btn-primary" data-bs-toggle="modal"  onClick={(handlePayment)}>Enroll Now</button>
                </div>
            </div>

            
        </div>
    );
}

export default ViewCoursePage;