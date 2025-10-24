import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Paper, Box, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
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
            <>
                <IconButton onClick={() => deleteHandler(row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/fees/fee/" + row.id)}>
                    View
                </BlueButton>
            </>
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {feesList.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/fees/add")}>
                                Add Fee
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(feesList) && feesList.length > 0 &&
                                <TableTemplate buttonHaver={FeeButtonHaver} columns={feeColumns} rows={feeRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
        </>
    );
};

export default ShowFees;

