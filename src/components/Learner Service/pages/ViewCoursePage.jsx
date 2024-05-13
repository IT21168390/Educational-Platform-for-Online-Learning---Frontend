import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
//import CourseData from "../util/CourseData";


function ViewCoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState([]);

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const btnClose = useRef(null);

    

    useEffect(() => {
        //To Do : Make an api call to Course Management Service to get the course by ID
        getCourseById();

        /////////// Dummy Data /////////////////////
        //setCourse(CourseData.find(s => s.id == id));
        ///////////////////////////////////////////
    }, []);

    async function getCourseById(){
        try {
            await axios.get(`http://localhost:8081/api/v1/courses/public/${id}`).then(res=>{
                if(res.status===200){
                    setCourse(res.data)
                }   
            }).catch(err=>{
                console.log(err)
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = () => {
        //To Do - Call an API to enroll the course

        //If Api call is success 
        window.location.href = '/viewMyCourses';
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
                    <button className="btn btn-primary" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Enroll Now</button>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Payment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-5">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        placeholder="Enter card number"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        placeholder="Enter CVV"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button"  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={handlePayment}>Make Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCoursePage;