import React, {useState, useEffect} from 'react';
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Success() {
    const [enrolledCourseId, setEnrolledCourseId] = useState("");
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const courseId = localStorage.getItem('courseId');
    const userId = localStorage.getItem('userId');

    const onButtonClick = () => {
        navigate("/viewMyCourses");
    };

    useEffect(() => {
        const enrollUser = async () => {
            try {
                const data = {
                    userEnrolledCourseDto: {
                        enrolledCourseId: courseId,
                        userId: userId
                    }
                };
                await axios.post("http://localhost:8081/api/LearnerService/enrollCourse", data);
                // Redirect to viewMyCourses after successful enrollment
                window.location.href = '/viewMyCourses';
            } catch (error) {
                console.error("Error occurred while enrolling:", error);
            }
        };
        
        enrollUser();

        localStorage.removeItem("couseId");

        // Cleanup function (if needed)
        return () => {
            // Any cleanup code here
        };
    }, []);

    return (
        <Center h="100vh" color="green">
            <VStack spacing={3}>
                <Heading fontSize="4xl">Payment Success!</Heading>
                {/* <Text color="black">{queryParams.toString().split("&").join("\n")}</Text> */}
                <Button onClick={onButtonClick} colorScheme="green" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '10px 20px', fontWeight: 'bold', border: 'none' }}>Go Back to My Courses</Button>

            </VStack>
        </Center>
    );
}

export default Success;
