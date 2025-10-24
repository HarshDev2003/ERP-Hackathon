import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, TextField, MenuItem, Typography, Paper, Grid } from '@mui/material';
import { BlueButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import axios from 'axios';

const AddExam = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    
    const [classList, setClassList] = useState([]);
    const [formData, setFormData] = useState({
        examName: '',
        examType: 'Mid-term',
        sclassName: '',
        academicYear: '',
        startDate: '',
        endDate: '',
        instructions: '',
        status: 'Scheduled'
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchClasses();
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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        
        try {
            const examData = {
                ...formData,
                adminID: currentUser._id
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ExamCreate`,
                examData
            );

            if (response.data._id) {
                setMessage("Exam created successfully");
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/Admin/exams");
                }, 2000);
            }
        } catch (error) {
            setMessage("Error creating exam");
            setShowPopup(true);
            console.log(error);
        }
        setLoader(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Exam
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Exam Name"
                                name="examName"
                                value={formData.examName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Exam Type"
                                name="examType"
                                value={formData.examType}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Mid-term">Mid-term</MenuItem>
                                <MenuItem value="Final">Final</MenuItem>
                                <MenuItem value="Unit Test">Unit Test</MenuItem>
                                <MenuItem value="Quarterly">Quarterly</MenuItem>
                                <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                                <MenuItem value="Annual">Annual</MenuItem>
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
                                type="date"
                                label="Start Date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="End Date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Scheduled">Scheduled</MenuItem>
                                <MenuItem value="Ongoing">Ongoing</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                placeholder="Enter exam instructions, rules, and guidelines..."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <BlueButton 
                                type="submit" 
                                variant="contained"
                                disabled={loader}
                            >
                                {loader ? 'Creating...' : 'Create Exam'}
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

export default AddExam;

