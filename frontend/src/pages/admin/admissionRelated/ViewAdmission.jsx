import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, MenuItem, Typography, Paper, Grid, Chip } from '@mui/material';
import { BlueButton, RedButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import axios from 'axios';

const ViewAdmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchAdmissionDetails();
    }, [id]);

    const fetchAdmissionDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Admission/${id}`);
            if (!response.data.message) {
                setFormData({
                    ...response.data,
                    dateOfBirth: response.data.dateOfBirth.split('T')[0],
                    sclassName: response.data.sclassName._id
                });
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

    const handleUpdate = async () => {
        setLoader(true);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/Admission/${id}`,
                formData
            );

            if (response.data) {
                setMessage("Admission updated successfully");
                setShowPopup(true);
                setIsEditing(false);
                fetchAdmissionDetails();
            }
        } catch (error) {
            setMessage("Error updating admission");
            setShowPopup(true);
            console.log(error);
        }
        setLoader(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this admission?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Admission/${id}`);
                navigate("/Admin/admissions");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'error';
            case 'Pending': return 'warning';
            default: return 'default';
        }
    };

    if (!formData) return <div>Loading...</div>;

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">
                        Admission Details
                    </Typography>
                    <Chip 
                        label={formData.applicationStatus} 
                        color={getStatusColor(formData.applicationStatus)}
                    />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Student Name"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Father's Name"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Mother's Name"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Previous School"
                            name="previousSchool"
                            value={formData.previousSchool || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                        />
                    </Grid>

                    {isEditing && (
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
                    )}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Remarks"
                            name="remarks"
                            value={formData.remarks || ''}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            disabled={!isEditing}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        {!isEditing ? (
                            <>
                                <BlueButton 
                                    variant="contained"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </BlueButton>
                                <RedButton 
                                    variant="contained"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </RedButton>
                            </>
                        ) : (
                            <>
                                <BlueButton 
                                    variant="contained"
                                    onClick={handleUpdate}
                                    disabled={loader}
                                >
                                    {loader ? 'Updating...' : 'Save Changes'}
                                </BlueButton>
                                <RedButton 
                                    variant="contained"
                                    onClick={() => {
                                        setIsEditing(false);
                                        fetchAdmissionDetails();
                                    }}
                                >
                                    Cancel
                                </RedButton>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
        </Box>
    );
};

export default ViewAdmission;

