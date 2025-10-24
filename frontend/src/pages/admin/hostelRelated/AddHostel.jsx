import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, TextField, MenuItem, Typography, Paper, Grid } from '@mui/material';
import { BlueButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import axios from 'axios';

const AddHostel = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    
    const [formData, setFormData] = useState({
        hostelName: '',
        hostelType: 'Boys',
        totalRooms: '',
        address: '',
        wardenName: '',
        wardenPhone: '',
        wardenEmail: '',
        feePerSemester: '',
        facilities: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

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
            const hostelData = {
                hostelName: formData.hostelName,
                hostelType: formData.hostelType,
                totalRooms: parseInt(formData.totalRooms),
                address: formData.address,
                warden: {
                    name: formData.wardenName,
                    phone: formData.wardenPhone,
                    email: formData.wardenEmail
                },
                feePerSemester: parseFloat(formData.feePerSemester),
                facilities: formData.facilities.split(',').map(f => f.trim()).filter(f => f),
                adminID: currentUser._id
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/HostelCreate`,
                hostelData
            );

            if (response.data._id) {
                setMessage("Hostel created successfully");
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/Admin/hostels");
                }, 2000);
            }
        } catch (error) {
            setMessage("Error creating hostel");
            setShowPopup(true);
            console.log(error);
        }
        setLoader(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Hostel
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hostel Name"
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Hostel Type"
                                name="hostelType"
                                value={formData.hostelType}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="Boys">Boys</MenuItem>
                                <MenuItem value="Girls">Girls</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Total Rooms"
                                name="totalRooms"
                                value={formData.totalRooms}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Fee Per Semester"
                                name="feePerSemester"
                                value={formData.feePerSemester}
                                onChange={handleInputChange}
                                required
                            />
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

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                Warden Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Warden Name"
                                name="wardenName"
                                value={formData.wardenName}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Warden Phone"
                                name="wardenPhone"
                                value={formData.wardenPhone}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Warden Email"
                                name="wardenEmail"
                                type="email"
                                value={formData.wardenEmail}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Facilities (comma-separated)"
                                name="facilities"
                                value={formData.facilities}
                                onChange={handleInputChange}
                                placeholder="e.g., WiFi, Laundry, Gym, Library"
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <BlueButton 
                                type="submit" 
                                variant="contained"
                                disabled={loader}
                            >
                                {loader ? 'Creating...' : 'Create Hostel'}
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

export default AddHostel;

