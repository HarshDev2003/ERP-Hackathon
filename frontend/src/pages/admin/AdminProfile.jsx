import { useSelector } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <CenteredContainer>
      <ProfileCard elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Admin Profile
        </Typography>

        <InfoText>
          <strong>Name:</strong> {currentUser.name}
        </InfoText>
        <InfoText>
          <strong>Email:</strong> {currentUser.email}
        </InfoText>
        <InfoText>
          <strong>School:</strong> {currentUser.schoolName}
        </InfoText>
      </ProfileCard>
    </CenteredContainer>
  );
};

// 🔹 Thoda upar position
const CenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 70vh;
  margin-top: 60px;
`;

// 🔹 Profile Card style (color untouched)
const ProfileCard = styled(Paper)`
  padding: 32px 48px;
  border-radius: 16px;
  background: oklch(12.9% 0.042 264.695);
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const InfoText = styled(Typography)`
  font-size: 1.1rem;
  margin-bottom: 12px;
`;

export default AdminProfile;
