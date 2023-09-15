import { Button, Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import FriendCard from '../components/FriendCard'

const UserFriends = ({ title, friends }) => {
  const [more, setMore] = useState(4)

  const handleMore = () => {
    setMore(prev => prev + 3)
  }

  return (
    <Card sx={{ borderRadius: 3, p: 1, pb: 3, display: "flex", flexDirection: "column", gap: 1, boxShadow: "none" }}>
      <Card sx={{ boxShadow: "none" }}>
        <CardHeader
          title={title}
        />
        <Divider />
      </Card>
      {friends && friends.length !== 0 ? friends.slice(0, more).map(friend => (
        <FriendCard friend={friend} key={friend._id} />
      )) : (
        <Typography variant='p' ml={2}>No {title} yet</Typography>
      )}
      {friends && friends.length > 4 &&
        <Button onClick={handleMore}>more...</Button>
      }
    </Card>
  )
}

export default UserFriends;