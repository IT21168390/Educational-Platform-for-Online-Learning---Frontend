import React, { useEffect, useRef, useState } from "react";
import CourseCard from "../components/CourseCard";
import axios from "axios";
//import CourseData from "../util/CourseData";

function ViewUserEnrolledCoursesPage() {
    const [userId, setUserId] = useState("2");// Need to get the user id from the session
    const [courseList, setCourseList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState([]);

    const btnClose = useRef(null);

    useEffect(() => {
        //To Do - Make an API call to Learner Service to find user Enrolled courses and set courseList
        getUserEnrolledCourses();
    }, []);


    function handleSearch(value){
        if(value==''){
            setFilteredList(courseList);
        } else {
            const filtered = courseList.filter(i=>i.title.toLowerCase().includes(value.toLowerCase()));
            setFilteredList(filtered);
        }
    }

    //To Do :  Need to Call an API to cancel the user enrolled course
    async function handleCancelCourse(){
        try {
            const response = await axios.post('http://localhost:8081/api/LearnerService/cancelCourseEnroll', {
                userId: userId, 
                courseId: selectedCourse.id 
            });
            
            // Handle the response, e.g., show a success message, update the UI, etc.
            console.log('Course canceled successfully:', response.data);
            
            // Close the modal after successful cancellation
            btnClose.current.click();
            
            // Optionally, you may want to update the list of enrolled courses after cancellation
            // Call getUserEnrolledCourses() again to refresh the list
            getUserEnrolledCourses();
        } catch (error) {
            console.error('Error canceling course:', error);
        }
    }
    

    async function getUserEnrolledCourses(){
        try {
            const req = {
                userId:"2"
            }
            const enrolledCourses = await axios.post('http://localhost:8081/api/LearnerService/getUserEnrolledCourses',req);
            setCourseList(enrolledCourses.data);
            console.log("Retrieved all Courses: ", courseList);
        } catch (error) {
            console.log("Error fetching enrolled courses: ", error);
        }
    }

    return ( 
        <div className="container">
            <div className="row my-3 mx-3 d-flex justify-content-center align-items-center">
                <input style={{ width: '50%' }} type="text" name="search" id="search" 
                onChange={(e)=>handleSearch(e.target.value)} className="form-control round-border" placeholder="Search" />
            </div>
            <div className="row  d-flex align-items-top">
                {filteredList != null && filteredList.map(
                    course =>
                        <div key={course.id} className="col-lg-4 col-md-6 col-sm-12 col-12">
                            <CourseCard course={course} isEnrolled={true} onCancel={setSelectedCourse} />
                        </div>
                )}
            </div>


            <div class="modal fade" id="cancelCourseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cancel Course</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-5">
                            <p>Do you want to cancel '<span style={{fontWeight:'bold',color:'red'}}>{selectedCourse.title}</span>'</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" ref={btnClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onClick={handleCancelCourse}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ViewUserEnrolledCoursesPage;