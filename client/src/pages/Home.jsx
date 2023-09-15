import { Box, CircularProgress } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from '../components/CreatePost'
import ProfileCard from '../components/ProfileCard'
import DisplayPost from './DisplayPost'
import FindFriends from './FindFriends'

const Home = () => {
  const auth = useSelector(state => state.auth)
  const refresh = useSelector(state=>state.refresh)
  const user = useMemo(() => auth, [auth, refresh]);

  return (
      user ?
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box flex={"25%"} display={{ xs: "none", sm: "none", lg: "block" }}>
          <ProfileCard user={user} followers={user.followers} />
        </Box>

        <Box flex={"40%"} display={"flex"} flexDirection={"column"} gap={3}>
          <CreatePost />
          <DisplayPost />
        </Box>

        <Box flex={"25%"} display={{ xs: "none", sm: "block", lg: "block" }}>
          <FindFriends />
        </Box>
      </Box>
    :
      <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <CircularProgress />
      </Box>

  )
}

export default Home