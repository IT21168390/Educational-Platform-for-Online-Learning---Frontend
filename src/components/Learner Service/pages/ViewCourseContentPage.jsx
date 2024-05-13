import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewCourseContentPage() {
    const { id } = useParams();
    const [courseDto, setCourseDto] = useState(null); 
    const [quiz, setQuiz] = useState(false);
    const [note, setNote] = useState(false);
    const [video, setVideo] = useState(false);
    const [progressStyle, setProgressStyle] = useState({ width: '0%' });
    const [progress, setProgress] = useState(0);
    const [quizzes, setQuizzes] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [embedUrl, setEmbedUrl] = useState('');


    useEffect(() => {

        let temp = [];
        temp.push(quiz);
        temp.push(note);
        temp.push(video);

        let count = temp.filter(s => s == true).length;

        if (count == 0) {
            setProgressStyle({ width: '0%' })
            setProgress(0);
        } else if (count == 1) {
            setProgressStyle({ width: '33%' })
            setProgress(33);
        } else if (count == 2) {
            setProgressStyle({ width: '66%' })
            setProgress(66);
        } else if (count == 3) {
            setProgressStyle({ width: '100%' })
            setProgress(100);
        }

        updateProgress();

    }, [quiz, note, video]);

    useEffect(() => {
       handleGetCourseContent();
       handleGetProgress();
    }, []);

    function handleCreateQuiz() {
        setIsSubmit(false)

        let temp = [];
        let i = 1;
        for (let q of courseDto.course_content.quizzes) {
            q.no = i;
            q.isCorrect = false;
            temp.push(q);
            i++;
        }
        setQuizzes(temp);
    }

    function handleCheckAnswers(no, answer) {
        const quizIndex = quizzes.findIndex(q => q.no == no);

        // If the quiz with the given quizId is found
        if (quizIndex !== -1) {
            // Create a copy of the quizzes array
            const updatedQuizzes = [...quizzes];

            // Update the isCorrect of the quiz at the found index
            if(updatedQuizzes[quizIndex].answer == answer){
                updatedQuizzes[quizIndex].isCorrect = true;
            } else {
                updatedQuizzes[quizIndex].isCorrect = false;
            }   
            // Update the state with the new array of quizzes
            setQuizzes(updatedQuizzes);
        }
    }

    // To Do - Call course management API and find the course by ID and set courseDto
    async function handleGetCourseContent(){
        // setCourseDto();
        try {
            const content = await axios.get(`http://localhost:8081/api/v1/courses/public/${id}`); // Replace 'url/to/course/content' with the actual endpoint
            const { course_content, video: hasVideo } = content.data;
            setCourseDto(content.data);
            setVideo(hasVideo);
            if (hasVideo) {
                const videoUrl = course_content.video.video_Url;
                setEmbedUrl(`https://www.youtube.com/embed/${videoUrl}`);
            }
        } catch (error) {
            console.error('Error fetching course content:', error);
        }
    }

    // To Do - Call Learner Service and find the user enrolled course by ID and user id 
    // Then set quiz,note and video boolean values
    async function handleGetProgress(){
        // setnote();
        // setvideo();
        // setquiz();
        try {
            const response = await axios.get('http://localhost:8081/api/LearnerService/CourseLearnerProgresses/{courseId}'); 
            const { quiz, note, video } = response.data;
            setQuiz(quiz);
            setNote(note);
            setVideo(video);
        } catch (error) {
            console.error('Error fetching learner progress:', error);
        }
    }

    // To Do - Call an Learner Service API to update quiz,note and video by userID and course Id
    async function updateProgress(){
        try {
            await axios.post('http://localhost:8081/api/LearnerService/updateEnrolledCourseContent', { quiz, note, video });
        } catch (error) {
            console.error('Error updating learner progress:', error);
        }
    }





    return (
        <div className="container">
            <div className="my-3">
                <h1 style={{ fontWeight: '200' }}>{courseDto.name}</h1>
                <div className="d-flex justify-content-center row my-3">
                    <iframe
                        width="560"
                        height="600"
                        src={embedUrl}
                        title="YouTube Video"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        className="round-border col-lg-10"></iframe>
                    <div className="col-lg-2">
                        <div class="form-check">
                            <input class="form-check-input" onChange={(e) => setQuiz(!quiz)} type="checkbox" id="flexCheckDefault" checked={quiz} />
                            <label class="form-check-label" for="flexCheckDefault">
                                Quiz
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={(e) => setVideo(!video)} id="flexCheckChecked" checked={video} />
                            <label class="form-check-label" for="flexCheckChecked">
                                Lecture Video
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={(e) => setNote(!note)} id="flexCheckChecked" checked={note} />
                            <label class="form-check-label" for="flexCheckChecked">
                                Lecture Note
                            </label>
                        </div>
                        <div class="progress my-3">
                            <div class="progress-bar" role="progressbar" style={progressStyle} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <p>{courseDto.description}</p>
                </div>
                <div className="">
                    <button className="btn btn-primary">Download Lecture Notes</button>
                    <button onClick={handleCreateQuiz} className="btn btn-warning mx-3" data-bs-toggle="modal" data-bs-target="#quizModal">Quiz</button>
                </div>
            </div>


            {/* Quiz Modal */}
            <div class="modal fade" id="quizModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Quiz</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-5">
                            {quizzes && quizzes.map(q =>
                                <div>
                                    <p>{q.no}. {q.question}</p>
                                    <div>
                                        <ol>
                                            {q.options.map(ans =>
                                                <li>
                                                    <div class="form-check">
                                                        <input class="form-check-input" value={ans} type="radio" name={q.no} id={q.no} onChange={(e) =>handleCheckAnswers(q.no, e.target.value)} />
                                                        <label class="form-check-label" for={q.no}>
                                                            {ans}
                                                        </label>
                                                    </div>
                                                </li>
                                            )}
                                        </ol>
                                    </div>
                                    {isSubmit ?
                                        (q.isCorrect ? <p className="alert alert-success">Correct</p> : <p className="alert alert-danger">Incorrect</p>)
                                    :""}
                                </div>
                            )}
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=> window.location.reload()} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {!isSubmit && <button type="button" class="btn btn-success" onClick={(e)=>setIsSubmit(true)} >Submit</button>}        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCourseContentPage;