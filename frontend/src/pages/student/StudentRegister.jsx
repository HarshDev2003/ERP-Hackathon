import React, { useState } from 'react'
import { Container, Paper, TextField, Typography, Stack, Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import Popup from '../../components/Popup'

const StudentRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/StudentApplication`, { name, email, mobile, password })
      setMessage('Submitted! Your registration is pending admin approval.')
      setShowPopup(true)
      setName(''); setEmail(''); setMobile(''); setPassword('')
    } catch (err) {
      setMessage('Error submitting application')
      setShowPopup(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Student Registration</Typography>
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Full Name" value={name} onChange={e=>setName(e.target.value)} required/>
            <TextField label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <TextField label="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={22} /> : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} />
    </Container>
  )
}

export default StudentRegister
