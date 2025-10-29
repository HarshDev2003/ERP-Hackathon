import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, Chip, IconButton, Typography } from '@mui/material'
import TableTemplate from '../../components/TableTemplate'
import VisibilityIcon from '@mui/icons-material/Visibility'
import axios from 'axios'

const TeacherExams = () => {
  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser?.teachSclass?._id
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ClassExams/${classID}`)
        if (res.data.message) setExams([]); else setExams(res.data)
      } catch (e) { console.log(e) }
      finally { setLoading(false) }
    }
    if (classID) fetchExams()
  }, [classID])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Ongoing': return 'info';
      case 'Scheduled': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  }

  const columns = [
    { id: 'examName', label: 'Exam Name', minWidth: 170 },
    { id: 'examType', label: 'Type', minWidth: 120 },
    { id: 'startDate', label: 'Start Date', minWidth: 120 },
    { id: 'endDate', label: 'End Date', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ]

  const rows = Array.isArray(exams) && exams.map(exam => ({
    examName: exam.examName,
    examType: exam.examType,
    startDate: new Date(exam.startDate).toLocaleDateString(),
    endDate: new Date(exam.endDate).toLocaleDateString(),
    status: (<Chip label={exam.status} color={getStatusColor(exam.status)} size="small" />),
    id: exam._id,
  }))

  const ButtonHaver = ({ row }) => (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
      <IconButton size="small" disabled>
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </Box>
  )

  return (
    <>
      {loading ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : Array.isArray(exams) && exams.length > 0 ? (
        <TableTemplate buttonHaver={ButtonHaver} columns={columns} rows={rows} />
      ) : (
        <Typography color="text.secondary">No exams found.</Typography>
      )}
    </>
  )
}

export default TeacherExams
