import React, { useState } from 'react'
import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { Image } from "@mui/icons-material"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", occupation: "", password: "", education: "", bio: "" })
  const [logo, setLogo] = useState(null)
  const rootUrl = useSelector(state=>state.rootApi)
  const navigator = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    const { name, email, password, occupation, education, bio } = user
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("occupation", occupation)
    formData.append("education", education)
    formData.append("bio", bio)
    formData.append("logo", logo)
    // for (const [key, value] of formData.entries()) {
    //   console.log(key + ": " + value);
    // }
    const res = await fetch(rootUrl + "/user/register", {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    if(res.ok){
      console.log(data);
      navigator("/login")
    }else{
      console.log(data.error);
    }
  }
  

  const handleFile = (e) => {
    const logo = e.target.files[0]
    setLogo(logo)
  }
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: 4, boxShadow: "none", borderRadius: 3, p: 5, maxWidth: "600px", margin: "auto", mt: 6 }}
      component={"form"}
      encType="multipart/form-data"
    >
      <Box>

      <Typography
        variant='h4'
        sx={{ m: 0, p: 0 }}
      >
        Register Here!
      </Typography>
      <Typography sx={{ mt: 2, alignItems: "center", display: "flex", gap:1 }} variant='p'>Already have an account?<Link style={{ textDecoration: "none" }} to={"/login"}><Typography color={"secondary"}>Login</Typography></Link>
      </Typography>

      </Box>

      <TextField id="outlined-basic" label="name" variant="outlined" name='name' onChange={handleChange} value={user.name} />
      <TextField id="outlined-basic" label="email" variant="outlined" name='email' type={"email"} onChange={handleChange} value={user.email} />
      <TextField id="outlined-basic" label="password" variant="outlined" name='password' type={"password"} onChange={handleChange} value={user.password} />
      <TextField id="outlined-basic" label="occupation" variant="outlined" name='occupation' onChange={handleChange} value={user.occupation} />
      <TextField id="outlined-basic" label="education" variant="outlined" name='education' onChange={handleChange} value={user.education} />
      <TextField id="outlined-basic" label="bio" variant="outlined" name='bio' onChange={handleChange} value={user.bio} rows={3}  multiline/>

      <Button startIcon={<Image />} component={"label"}>
        <input type="file" hidden name="logo" onChange={handleFile} />
        upload logo
      </Button>

      {logo &&
        <Box sx={{ border: "dashed", borderColor: "#555", p: 1, maxWidth: "160px", m: "auto", borderRadius: 5 }}>
          <img src={URL.createObjectURL(logo)} style={{ margin: "10px auto", objectFit: "contain", maxHeight: "100%", maxWidth: "100%", borderRadius: 5 }} />
        </Box>
      }

      <Button variant='contained' color='secondary' startIcon={<HowToRegIcon />} onClick={handleSubmit}>Register</Button>
      
    </Card>
  )
}

export default Register