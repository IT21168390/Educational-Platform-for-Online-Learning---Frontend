import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const enrollmentView = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        function getData() {
            axios.get("http://localhost:8081/api/v1/courses/public/all")
                .then((res) => {
                    setData(res.data);
                    setFilteredData(res.data); // Initialize filtered data with all courses
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    // Display error message to the user
                });
        }

        getData();
    }, []);

    // Function to handle search query change
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        // Filter data based on search query
        const filteredCourses = data.filter(course => {
            return course.name.toLowerCase().includes(value.toLowerCase());
        });

        setFilteredData(filteredCourses);
    };

    return (
        <>
            <h1>Listed Courses</h1>
            {/* Search Bar */}
            <TextField
                label="Search Course"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
            />
            {/* Table of Courses */}
            <TableContainer component={Paper} style={{ height: 400, width: '80%', align: 'center', margin: 'auto', marginTop: "20px" }}>
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
                        {filteredData.filter(course => course.status === "PENDING").map((course) => (
                            <TableRow key={course._id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.course_content.lecture_note.weight}</TableCell>
                                <TableCell>{course.course_content.video.weight}</TableCell>
                                <TableCell>${course.price}</TableCell>
                                <TableCell>{course.status}</TableCell>
                                <TableCell>
                                    {course.status === 'PENDING' && ( // Render button only if status is PENDING
                                        <Button onClick={() => handleAcceptCourse(course._id)}>View</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default enrollmentView;
