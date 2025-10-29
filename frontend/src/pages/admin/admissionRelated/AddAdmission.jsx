import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, TextField, MenuItem, Typography, Paper, Grid } from '@mui/material';
import { BlueButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import axios from 'axios';

const AddAdmission = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    
    const [classList, setClassList] = useState([]);
    const [formData, setFormData] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phoneNumber: '',
        email: '',
        previousSchool: '',
        sclassName: '',
        applicationStatus: 'Pending',
        remarks: ''
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
            if (response.data.message) {
                setClassList([]);
            } else {
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
            const admissionData = {
                ...formData,
                adminID: currentUser._id
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/AdmissionCreate`,
                admissionData
            );

            if (response.data._id) {
                setMessage("Admission application created successfully");
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/Admin/admissions");
                }, 2000);
            }
        } catch (error) {
            setMessage("Error creating admission application");
            setShowPopup(true);
            console.log(error);
        }
        setLoader(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    New Admission Application
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Student Name"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Father's Name"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Mother's Name"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
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

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Previous College"
                                name="previousSchool"
                                value={formData.previousSchool}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Application Status"
                                name="applicationStatus"
                                value={formData.applicationStatus}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
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
                                {loader ? 'Creating...' : 'Create Admission'}
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

export default AddAdmission;

