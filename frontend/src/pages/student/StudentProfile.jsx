import React, { useState } from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState(currentUser?.email || '')
  const [mobile, setMobile] = useState(currentUser?.mobile || '')
  const [address, setAddress] = useState(currentUser?.address || '')
  const [motherName, setMotherName] = useState(currentUser?.motherName || '')
  const [fatherName, setFatherName] = useState(currentUser?.fatherName || '')

  const save = (e) => {
    e.preventDefault();
    dispatch(updateUser({ email, mobile, address, motherName, fatherName }, currentUser._id, 'Student'))
  }

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Student Roll No: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Class: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  College: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Complete Your Profile
            </Typography>
            <form onSubmit={save}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" value={address} onChange={e=>setAddress(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Mother's Name" value={motherName} onChange={e=>setMotherName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Father's Name" value={fatherName} onChange={e=>setFatherName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">Save</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default StudentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;