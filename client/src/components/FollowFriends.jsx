import { Button, Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import FriendCard from '../components/FriendCard'

const UserFriends = ({title, friends}) => {
  const [more, setMore] = useState(6)

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
      {friends && friends.length !== 0 ? friends.slice(0, more).map(friend => (<>
        <FriendCard friend={friend} />
      </>))
      :
        <Typography variant='p' ml={2}>No followers yet</Typography>
      }
      {friends && friends.length > 3 &&
        <Button onClick={handleMore}>more...</Button>
      }
    </Card>
  )
}

export default UserFriends;