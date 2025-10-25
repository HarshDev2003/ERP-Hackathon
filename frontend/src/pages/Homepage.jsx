import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import { Login, HowToReg, School } from '@mui/icons-material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <LogoContainer>
                            <School sx={{ fontSize: 60, color: '#8b5cf6' }} />
                        </LogoContainer>
                        <StyledTitle>
                            Welcome to
                            <GradientText>School Management System</GradientText>
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton 
                                    variant="contained" 
                                    fullWidth
                                    startIcon={<Login />}
                                    sx={{ mb: 2, fontSize: '1rem' }}
                                >
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <GuestButton 
                                    variant="outlined" 
                                    fullWidth
                                    startIcon={<Login />}
                                >
                                    Login as Guest
                                </GuestButton>
                            </StyledLink>
                            <SignUpText>
                                Don't have an account?{' '}
                                <SignUpLink to="/Adminregister">
                                    <HowToReg sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />
                                    Sign up
                                </SignUpLink>
                            </SignUpText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const StyledPaper = styled.div`
  padding: 48px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  margin-top: 10px;
`;

const StyledText = styled.p`
  color: #6b7280;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px; 
  font-size: 1.1rem;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const GuestButton = styled(Button)`
  && {
    color: #8b5cf6;
    border-color: #8b5cf6;
    border-width: 2px;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(139, 92, 246, 0.08);
      border-color: #7c3aed;
      border-width: 2px;
      transform: translateY(-2px);
    }
  }
`;

const SignUpText = styled.p`
  color: #6b7280;
  text-align: center;
  font-size: 0.95rem;
  margin-top: 10px;
`;

const SignUpLink = styled(Link)`
  color: #8b5cf6;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;
  &:hover {
    color: #7c3aed;
  }
`;
