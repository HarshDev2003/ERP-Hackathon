import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Guest flow disabled

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate('/Adminlogin');
    } else if (user === "Student") {
      navigate('/Studentlogin');
    } else if (user === "Teacher") {
      navigate('/Teacherlogin');
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle sx={{ fontSize: 70, color: '#8b5cf6', transition: 'all 0.3s ease' }} />
                </Box>
                <StyledTypography>
                  Admin
                </StyledTypography>
                <Description>
                  Login as an administrator to access the dashboard to manage app data.
                </Description>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <School sx={{ fontSize: 70, color: '#8b5cf6', transition: 'all 0.3s ease' }} />
                </Box>
                <StyledTypography>
                  Student
                </StyledTypography>
                <Description>
                  Login as a student to explore course materials and assignments.
                </Description>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Teacher")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <Group sx={{ fontSize: 70, color: '#8b5cf6', transition: 'all 0.3s ease' }} />
                </Box>
                <StyledTypography>
                  Teacher
                </StyledTypography>
                <Description>
                  Login as a teacher to create courses, assignments, and track student progress.
                </Description>
              </StyledPaper>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 40px 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.98);
  color: #374151;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
    
    .MuiSvgIcon-root {
      transform: scale(1.1);
      color: #7c3aed;
    }
  }
`;

const StyledTypography = styled.h2`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;
