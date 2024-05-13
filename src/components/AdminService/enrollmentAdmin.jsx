import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


const EnrollmentAdmin = () => {
    const [data, setData] = useState([]);
    const [dataRes, setResData] = useState([]);

    const history = useHistory();

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


    return (
        <TableContainer component={Paper} style={{ height: 400, width: '80%', align: 'center',  margin: 'auto', marginTop: "100px",  }}>
            <Table aria-label="course table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell>Learner Id</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Actions</TableCell> {/* New column for actions */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((course) => (
                        <TableRow key={course._id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>${course.price}</TableCell>
                            <TableCell>{course.status}</TableCell>
                            <TableCell>{course.status}</TableCell>
                            <TableCell>
                                {course.status === 'PENDING' && ( // Render button only if status is PENDING
                                    <Button onClick={() =>  handleAcceptCourse(course._id)}>Accept</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EnrollmentAdmin;
