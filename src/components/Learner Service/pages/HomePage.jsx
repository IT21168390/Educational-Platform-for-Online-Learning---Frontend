import React, { useEffect, useRef, useState } from "react";
import CourseCard from "../components/CourseCard";
//import CourseData from "../util/CourseData";
import axios from "axios";

function HomePage() {
    const [courseList, setCourseList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        handleGetAllCourses();
    }, []);


    function handleSearch(value){
        if(value==''){
            setFilteredList(courseList);
        } else {
            const filtered = courseList.filter(i=>i.title.toLowerCase().includes(value.toLowerCase()));            
            setFilteredList(filtered);
        }
    }

    // To Do - find all courses using course management service API ans set courseList state
    async function handleGetAllCourses(){
        const allCourses = await axios.get("http://localhost:8081/api/v1/courses/public/available");
        if (allCourses.status === 200) {
            setCourseList(allCourses.data);
            setFilteredList(allCourses.data);
            console.log("Retrieved all Courses: ", allCourses.data);
          }
        //setCourseList()
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
                            <CourseCard course={course} isEnrolled={false} />
                        </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;