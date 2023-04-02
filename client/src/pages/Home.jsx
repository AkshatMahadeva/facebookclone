import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../components/CreatePost'
import ProfileCard from '../components/ProfileCard'
import DisplayPost from './DisplayPost'
import FindFriends from './FindFriends'

const Home = () => {
  const user = useSelector(state=>state.auth)
  return (
    <Box sx={{display: "flex", gap:3}}>
      <Box flex={"25%"} display={{xs: "none", sm:"none", lg: "block" }}>
        <ProfileCard user={user} followers={user.followers} />
      </Box>

      <Box flex={"40%"} display={"flex"} flexDirection={"column"} gap={3}>
        <CreatePost/>
        <DisplayPost/>
      </Box>

      <Box flex={"25%"} display={{xs: "none", sm: "block", lg: "block" }}>
        <FindFriends/>
      </Box>
    </Box>
  )
}

export default Home