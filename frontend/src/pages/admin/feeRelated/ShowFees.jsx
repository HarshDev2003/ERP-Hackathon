import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Box, IconButton, Chip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import axios from 'axios';

const ShowFees = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [feesList, setFeesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFees();
    }, [currentUser._id]);

    const fetchFees = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/FeeList/${currentUser._id}`);
            if (response.data.message) {
                setFeesList([]);
            } else {
                setFeesList(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteHandler = async (deleteID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this fee record?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Fee/${deleteID}`);
                fetchFees();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Paid': return 'success';
            case 'Overdue': return 'error';
            case 'Partial': return 'info';
            case 'Pending': return 'warning';
            default: return 'default';
        }
    };

    const feeColumns = [
        { id: 'studentName', label: 'Student Name', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 100 },
        { id: 'feeType', label: 'Fee Type', minWidth: 120 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'amountPaid', label: 'Paid', minWidth: 100 },
        { id: 'dueDate', label: 'Due Date', minWidth: 120 },
        { id: 'paymentStatus', label: 'Status', minWidth: 100 },
    ];

    const feeRows = feesList && feesList.length > 0 && feesList.map((fee) => {
        return {
            studentName: fee.student?.name || 'N/A',
            sclassName: fee.sclassName?.sclassName || 'N/A',
            feeType: fee.feeType,
            amount: `₹${fee.amount}`,
            amountPaid: `₹${fee.amountPaid}`,
            dueDate: new Date(fee.dueDate).toLocaleDateString(),
            paymentStatus: (
                <Chip 
                    label={fee.paymentStatus} 
                    color={getStatusColor(fee.paymentStatus)}
                    size="small"
                />
            ),
            id: fee._id,
        };
    });

    const FeeButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate("/Admin/fees/fee/" + row.id)}
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
            name: 'Add New Fee',
            action: () => navigate("/Admin/fees/add")
        },
        {
            icon: <DeleteIcon color="error" />, 
            name: 'Delete All Fees',
            action: async () => {
                const confirmDelete = window.confirm("Are you sure you want to delete all fees?");
                if (confirmDelete) {
                    try {
                        await axios.delete(`${import.meta.env.VITE_BASE_URL}/Fees/${currentUser._id}`);
                        fetchFees();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    ];

    return (
        <>
            <PageContainer title="Fee Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : feesList.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Fee Records Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/Admin/fees/add")}
                        >
                            Add Fee
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(feesList) && feesList.length > 0 && (
                        <TableTemplate buttonHaver={FeeButtonHaver} columns={feeColumns} rows={feeRows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
        </>
    );
};

export default ShowFees;

