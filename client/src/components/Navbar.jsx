import React, {useEffect, useMemo, useState} from 'react'
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Button, Avatar, useMediaQuery } from "@mui/material"
import { Notifications, DarkMode, LightMode, Search, Login } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';
import styled from '@emotion/styled';
import {useDispatch, useSelector} from "react-redux"
import { changeMode } from '../store/reducers/modeReducer';
import { useTheme } from '@emotion/react';
import FlexBetween from '../styles/FlexBetween';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = styled(Box)({
  borderRadius: 4,
  padding: "1px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

const Navbar = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode);
  const navigator = useNavigate()
  const token = useSelector(state=>state.token)
  const auth = useSelector(state=>state.auth)
  const largeDevice = useMediaQuery("(min-width: 800px)")

  useEffect(() => {
    setUser(auth)
  }, [auth, token])


  const handleMode = () => {
    dispatch(changeMode())
    // console.log(mode);
  }
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;

  return (
    <AppBar sx={{ padding: "5px 4%", boxShadow: "none", background: alt}}>
      <Toolbar sx={{ justifyContent: "space-between", gap:2 }}>
      
      <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.7rem, 2rem)"
          color="primary"
          onClick={()=>navigator("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Facebook
        </Typography>

        <FlexBetween sx={{gap:{lg:3, sm:2, xs:1}}}>

        <SearchBar sx={{background: neutralLight, marginRight: "40px"}} display={{xs: "none", sm: "none", lg: "block"}}>
          <InputBase type="text" name="search" placeholder='search...'/>
          <IconButton>
              <Search />
            </IconButton>
        </SearchBar>

          <IconButton onClick={handleMode}>
            {mode && mode === "light"? <DarkMode /> : <LightMode/>}
          </IconButton>


          <IconButton>
            <Notifications />
          </IconButton>

          <IconButton>
            <CommentIcon />
          </IconButton>

          {user ? 
          <Avatar src={"http://localhost:2000/" + user.logo} onClick={()=>navigator(`/${user._id}`)} sx={{cursor: "pointer"}} />
          :<Link to={"login"} style={{textDecoration: "none"}}>
            {largeDevice ? <Button variant='outlined' startIcon={<Login/>}>Sign In</Button> : <IconButton><Login/></IconButton>}
          </Link>}

        </FlexBetween>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar