import React from 'react'
import { useSelector } from 'react-redux';
import { Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material'
import { Link } from 'react-router-dom';

const TeacherSubjects = () => {
  const { currentUser } = useSelector((state) => state.user);
  const subjects = currentUser?.teachSubjects || (currentUser?.teachSubject ? [currentUser?.teachSubject] : []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Subjects
      </Typography>
      {(!subjects || subjects.length === 0) ? (
        <Typography color="text.secondary">No subjects assigned.</Typography>
      ) : (
        <List>
          {subjects.map((s) => (
            <ListItem key={s._id} divider secondaryAction={
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Sessions: {s.sessions ?? '—'}
                </Typography>
              </Box>
            }>
              <ListItemText 
                primary={<Link to={`/Teacher/subject/${s._id}`}>{s.subName}</Link>} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default TeacherSubjects
