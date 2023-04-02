import LoginIcon from '@mui/icons-material/Login';
import { Button, Card, TextField, Typography, Box } from '@mui/material'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { setRefresh, startSession } from '../store/reducers/modeReducer';

const Login = () => {
  const [user, setUser] = useState({email: "", password: ""})
  const rootUrl = useSelector(state=>state.rootApi)
  const navigator = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    const res = await fetch(rootUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
      console.log(data);
      dispatch(startSession(data.token))
      navigator("/")
      window.location.reload(false)
    }else{
      console.log(data);
    }
  }
  return (
    <Card 
    sx={{ display: "flex", flexDirection: "column", gap: 4, boxShadow: "none", borderRadius: 3, p: 5, maxWidth: "600px", m: "80px auto" }}
    >
      <Box>
      <Typography  variant='h4'>Login Here!</Typography>
      <Typography sx={{ mt: 2, alignItems: "center", display: "flex", gap:1 }} variant='p'>Create an account?
        <Link style={{ textDecoration: "none" }} to={"/register"}>
          <Typography color={"secondary"}>Register</Typography>
        </Link>
      </Typography>
      </Box>

      <TextField id="outlined-basic" label="email" variant="outlined" name='email' type={"email"} onChange={handleChange} value={user.email} />
      <TextField id="outlined-basic" label="password" variant="outlined" name='password' type={"password"} onChange={handleChange} value={user.password} />

      <Button variant='contained' color='secondary' onClick={handleSubmit} startIcon={<LoginIcon/>}>Login</Button>

        
    </Card>
  )
}

export default Login