import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material'
import { getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';

const TeacherSubjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { subjectDetails, subloading } = useSelector((state) => state.sclass);

  useEffect(() => {
    if (id) dispatch(getSubjectDetails(id, 'Subject'));
  }, [dispatch, id]);

  if (subloading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Subject Details</Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">Name: {subjectDetails?.subName}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">Code: {subjectDetails?.subCode}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">Sessions: {subjectDetails?.sessions}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">Class: {subjectDetails?.sclassName?.sclassName}</Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default TeacherSubjectDetails
