import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, TextField, MenuItem, Typography, Paper, Grid } from '@mui/material';
import { BlueButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import axios from 'axios';

const AddFee = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    
    const [classList, setClassList] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const [formData, setFormData] = useState({
        student: '',
        sclassName: '',
        feeType: 'Tuition',
        amount: '',
        dueDate: '',
        academicYear: '',
        semester: 'First',
        remarks: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchClasses();
        fetchStudents();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/SclassList/${currentUser._id}`);
            if (!response.data.message) {
                setClassList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Students/${currentUser._id}`);
            if (!response.data.message) {
                setStudentsList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Auto-populate class when student is selected
        if (name === 'student') {
            const selectedStudent = studentsList.find(s => s._id === value);
            if (selectedStudent) {
                setFormData(prev => ({
                    ...prev,
                    student: value,
                    sclassName: selectedStudent.sclassName._id
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        
        try {
            const feeData = {
                ...formData,
                adminID: currentUser._id
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/FeeCreate`,
                feeData
            );

            if (response.data._id) {
                setMessage("Fee record created successfully");
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/Admin/fees");
                }, 2000);
            }
        } catch (error) {
            setMessage("Error creating fee record");
            setShowPopup(true);
            console.log(error);
        }
        setLoader(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Fee Record
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Student"
                                name="student"
                                value={formData.student}
                                onChange={handleInputChange}
                                required
                            >
                                {studentsList.map((student) => (
                                    <MenuItem key={student._id} value={student._id}>
                                        {student.name} ({student.rollNum})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Class"
                                name="sclassName"
                                value={formData.sclassName}
                                onChange={handleInputChange}
                                required
                                disabled
                            >
                                {classList.map((classItem) => (
                                    <MenuItem key={classItem._id} value={classItem._id}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Fee Type"
                                name="feeType"
                                value={formData.feeType}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Tuition">Tuition</MenuItem>
                                <MenuItem value="Transport">Transport</MenuItem>
                                <MenuItem value="Hostel">Hostel</MenuItem>
                                <MenuItem value="Library">Library</MenuItem>
                                <MenuItem value="Sports">Sports</MenuItem>
                                <MenuItem value="Exam">Exam</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Due Date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Academic Year"
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleInputChange}
                                placeholder="e.g., 2024-2025"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="First">First</MenuItem>
                                <MenuItem value="Second">Second</MenuItem>
                                <MenuItem value="Annual">Annual</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Remarks"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <BlueButton 
                                type="submit" 
                                variant="contained"
                                disabled={loader}
                            >
                                {loader ? 'Creating...' : 'Create Fee Record'}
                            </BlueButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
        </Box>
    );
};

export default AddFee;

