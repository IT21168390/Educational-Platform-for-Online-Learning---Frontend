import { useState } from "react";
import { Link } from "react-router-dom";

function CourseCard(props) {
    const [course, setCourse] = useState(props.course);
    
    return (
        <div class="card m-3" style={{ width: "18rem" }}>
            <img src={course.thumbnail} class="card-img-top" alt="..." style={{ height: '100%' }} />
            <div class="card-body">
                <h5 class="card-title limit-text">{course.name}</h5>
                <p class="card-text limit-text" >{course.description}</p>
                {props.isEnrolled ?
                    <Link to={`/viewCourseContent/${course.id}`} style={{ width: '60px' }} className="btn btn-primary btn-sm round-border">View</Link>
                    :
                    <Link to={`/viewCourse/${course.id}`} style={{ width: '60px' }} className="btn btn-primary btn-sm round-border">View</Link>}
                {props.isEnrolled && <button type="button" style={{ width: '60px' }} className="btn btn-danger btn-sm mx-1 round-border " onClick={(e) => props.onCancel(course)} data-bs-toggle="modal" data-bs-target="#cancelCourseModal">Cancel</button>}

            </div>
        </div>
    );
}

export default CourseCard;