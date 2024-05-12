import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [dataRes, setResData] = useState([]);

    useEffect(() => {
        function getData() {
            axios.get("http://localhost:8060/admin/")
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    // Display error message to the user
                });
        }
    
        getData();
    }, []);

    const handleAcceptCourse = (courseId) => {
        const url = `http://localhost:8060/admin/courses/${courseId}/status`;
        const requestBody = {
            courseName: "Updated Course Name3",
            status: "APPROVED" // Assuming ACCEPTED is the new status
        };

        axios.put(url, requestBody)
            .then((res) => {
                // If update is successful, refresh the data
                setResData(res.data, () => {
                    console.log("Success: ", dataRes); // Logging updated data response
                });
            })
            .catch((error) => {
                console.error("Error updating course status:", error);
                // Display error message to the user
            });
    };

    return (
        <TableContainer component={Paper} style={{ height: 400, width: '80%', align: 'center',  margin: 'auto', marginTop: "100px",  }}>
            <Table aria-label="course table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell>Lecture Note Weight</TableCell>
                        <TableCell>Video Weight</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell> {/* New column for actions */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.course_content.lecture_note.weight}</TableCell>
                            <TableCell>{course.course_content.video.weight}</TableCell>
                            <TableCell>${course.price}</TableCell>
                            <TableCell>{course.status}</TableCell>
                            <TableCell>
                                {course.status === 'PENDING' && ( // Render button only if status is PENDING
                                    <Button onClick={() => handleAcceptCourse(course._id)}>Accept</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Dashboard;
