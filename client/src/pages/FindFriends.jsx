import { Button, Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import FriendCard from '../components/FriendCard'
import { useSelector } from "react-redux"

const FindFriends = () => {
  const friends = useSelector(state=>state.findFriends)
  const [more, setMore] = useState(6)

  const handleMore = () => {
    setMore(prev => prev + 3)
  }

  return (
    <Card sx={{ borderRadius: 3, p: 1, pb: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "none" }}>
      <Card sx={{ boxShadow: "none" }}>
        <CardHeader
          title={"Follow People"}
        />
        <Divider />
      </Card>
      {friends && friends.length !== 0 && friends.slice(0, more).map(friend => (
        <FriendCard friend={friend} key={friend._id} />
      ))}
      {friends && 
        <Button onClick={handleMore}>more...</Button>
      }
    </Card>
  )
}

export default FindFriends;