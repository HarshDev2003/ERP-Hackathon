import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Button, CircularProgress } from '@mui/material'
import TableTemplate from '../../../components/TableTemplate'
import axios from 'axios'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle'

const PendingRegistrations = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const { sclassesList } = useSelector(state => state.sclass)
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [assigningId, setAssigningId] = useState(null)
  const [selectedClass, setSelectedClass] = useState('')
  const [rollNum, setRollNum] = useState('')

  const fetchApps = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/StudentApplications`)
      setApps(res.data.message ? [] : res.data)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchApps(); }, [])
  useEffect(() => { if (currentUser?._id) dispatch(getAllSclasses(currentUser._id, 'Sclass')) }, [currentUser?._id, dispatch])

  const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'mobile', label: 'Mobile', minWidth: 120 },
  ]

  const rows = Array.isArray(apps) && apps.map(a => ({
    name: a.name,
    email: a.email || '—',
    mobile: a.mobile || '—',
    id: a._id,
  }))

  const approve = async (appId) => {
    if (!selectedClass || !rollNum) return
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/StudentApplication/approve/${appId}`, {
        sclassName: selectedClass,
        adminID: currentUser._id,
        rollNum: Number(rollNum)
      })
      setAssigningId(null); setSelectedClass(''); setRollNum('')
      fetchApps()
    } catch (e) { console.log(e) }
  }

  const reject = async (appId) => {
    try { await axios.put(`${import.meta.env.VITE_BASE_URL}/StudentApplication/reject/${appId}`); fetchApps() } catch (e) { console.log(e) }
  }

  const ButtonHaver = ({ row }) => (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
      {assigningId === row.id ? (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="cls">Class</InputLabel>
            <Select labelId="cls" label="Class" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
              {Array.isArray(sclassesList) && sclassesList.map(c => (
                <MenuItem key={c._id} value={c._id}>{c.sclassName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField size="small" label="Roll" type="number" value={rollNum} onChange={e=>setRollNum(e.target.value)} sx={{ width: 100 }} />
          <Button variant="contained" onClick={() => approve(row.id)}>Approve</Button>
          <Button variant="outlined" color="error" onClick={() => setAssigningId(null)}>Cancel</Button>
        </Box>
      ) : (
        <>
          <Button variant="contained" onClick={() => setAssigningId(row.id)}>Approve</Button>
          <Button variant="outlined" color="error" onClick={() => reject(row.id)}>Reject</Button>
        </>
      )}
    </Box>
  )

  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" gutterBottom>Pending Student Registrations</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableTemplate buttonHaver={ButtonHaver} columns={columns} rows={rows} />
      )}
    </Paper>
  )
}

export default PendingRegistrations
