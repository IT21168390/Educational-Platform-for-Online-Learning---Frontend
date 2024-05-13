import React from 'react';
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Success() {
    // const [enrolledCourseId, setEnrolledCourseId] = useState("");
    // const [userId, setUserId] = useState("");
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/");
    };

    // useEffect(() => {
    //     const enrollUser = async () => {
    //         try {
    //             const data = {
    //                 userEnrolledCourseDto: {
    //                     enrolledCourseId: enrolledCourseId,
    //                     userId: userId
    //                 }
    //             };
    //             await axios.post("http://localhost:8081/api/LearnerService/enrollCourse", data);
    //             // Redirect to viewMyCourses after successful enrollment
    //             window.location.href = '/viewMyCourses';
    //         } catch (error) {
    //             console.error("Error occurred while enrolling:", error);
    //         }
    //     };
        
    //     enrollUser();

    //     // Cleanup function (if needed)
    //     return () => {
    //         // Any cleanup code here
    //     };
    // }, []);

    return (
        <Center h="100vh" color="green">
            <VStack spacing={3}>
                <Heading fontSize="4xl">Payment Success!</Heading>
                {/* <Text color="black">{queryParams.toString().split("&").join("\n")}</Text> */}
                <Button onClick={onButtonClick} colorScheme="green">Go Home</Button>
            </VStack>
        </Center>
    );
}

export default Success;
