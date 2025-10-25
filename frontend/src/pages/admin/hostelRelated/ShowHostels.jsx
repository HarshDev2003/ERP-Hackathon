import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import axios from 'axios';

const ShowHostels = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [hostelsList, setHostelsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHostels();
    }, [currentUser._id]);

    const fetchHostels = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/HostelList/${currentUser._id}`);
            if (response.data.message) {
                setHostelsList([]);
            } else {
                setHostelsList(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteHandler = async (deleteID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this hostel?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Hostel/${deleteID}`);
                fetchHostels();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const hostelColumns = [
        { id: 'hostelName', label: 'Hostel Name', minWidth: 170 },
        { id: 'hostelType', label: 'Type', minWidth: 100 },
        { id: 'totalRooms', label: 'Total Rooms', minWidth: 100 },
        { id: 'occupiedRooms', label: 'Occupied Rooms', minWidth: 120 },
        { id: 'feePerSemester', label: 'Fee/Semester', minWidth: 120 },
    ];

    const hostelRows = hostelsList && hostelsList.length > 0 && hostelsList.map((hostel) => {
        const occupiedRooms = hostel.rooms?.filter(room => room.occupiedBeds > 0).length || 0;
        return {
            hostelName: hostel.hostelName,
            hostelType: hostel.hostelType,
            totalRooms: hostel.totalRooms,
            occupiedRooms: occupiedRooms,
            feePerSemester: `₹${hostel.feePerSemester}`,
            id: hostel._id,
        };
    });

    const HostelButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate("/Admin/hostels/hostel/" + row.id)}
                    size="small"
                    sx={{
                        color: '#8b5cf6',
                        '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                    onClick={() => deleteHandler(row.id)}
                    size="small"
                    sx={{
                        color: '#ef4444',
                        '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        );
    };

    const actions = [
        {
            icon: <AddIcon color="primary" />, 
            name: 'Add New Hostel',
            action: () => navigate("/Admin/hostels/add")
        },
        {
            icon: <DeleteIcon color="error" />, 
            name: 'Delete All Hostels',
            action: async () => {
                const confirmDelete = window.confirm("Are you sure you want to delete all hostels?");
                if (confirmDelete) {
                    try {
                        await axios.delete(`${import.meta.env.VITE_BASE_URL}/Hostels/${currentUser._id}`);
                        fetchHostels();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    ];

    return (
        <>
            <PageContainer title="Hostel Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : hostelsList.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Hostels Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/Admin/hostels/add")}
                        >
                            Add Hostel
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(hostelsList) && hostelsList.length > 0 && (
                        <TableTemplate buttonHaver={HostelButtonHaver} columns={hostelColumns} rows={hostelRows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
        </>
    );
};

export default ShowHostels;

