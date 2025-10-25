import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { 
    TextField, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Box,
    CircularProgress 
} from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { LightPurpleButton } from '../../../components/buttonStyles';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <PageContainer title="Add Student">
                <Box 
                    component="form" 
                    onSubmit={submitHandler}
                    sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <TextField
                        label="Student Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8b5cf6',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8b5cf6'
                            }
                        }}
                    />

                    {situation === "Student" && (
                        <FormControl 
                            fullWidth 
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8b5cf6',
                                        borderWidth: '2px'
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#8b5cf6'
                                }
                            }}
                        >
                            <InputLabel>Select Class</InputLabel>
                            <Select
                                value={className}
                                onChange={changeHandler}
                                label="Select Class"
                            >
                                <MenuItem value='Select Class'>Select Class</MenuItem>
                                {sclassesList.map((classItem, index) => (
                                    <MenuItem key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <TextField
                        label="Roll Number"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8b5cf6',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8b5cf6'
                            }
                        }}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8b5cf6',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8b5cf6'
                            }
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                        <LightPurpleButton 
                            type="submit" 
                            disabled={loader}
                            sx={{ minWidth: 120 }}
                        >
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add Student'
                            )}
                        </LightPurpleButton>
                    </Box>
                </Box>
            </PageContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent