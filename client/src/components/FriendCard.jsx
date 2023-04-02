import { Avatar, Card, CardHeader, IconButton, Divider, Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setRefresh } from '../store/reducers/modeReducer';


const FriendCard = (props) => {
  const { name, logo, followers, _id } = props.friend
  const user = useSelector(state => state.auth)
  const token = useSelector(state=>state.token)
  const rootApi = useSelector(state=>state.rootApi)
  const navigator = useNavigate()
  const dispatch = useDispatch()
  
  const handleAddFollow = async () => {
    const res = await fetch(rootApi + "/user/" + _id + "/follower/add", {
      method: "PUT",
      headers: {
        token: token
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      dispatch(setRefresh(true))
    }
    else {
      console.log(data);
    }
  }
  const handleRemoveFollow = async () => {
    const res = await fetch(rootApi + "/user/" + _id + "/follower/remove", {
      method: "PUT",
      headers: {
        token: token
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      dispatch(setRefresh(true))
    }
    else {
      console.log(data);
    }
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none" }}>
      <CardHeader
        avatar={
         <Link to={`/${_id}`}><Avatar sx={{cursor:"pointer"}} src={`http://localhost:2000/${logo}`} /></Link>
        }
        title={name}
        subheader={`followed by ${followers.length}`}

        action={
          followers.includes(user._id) ?
            <IconButton onClick={handleRemoveFollow}>
              <PersonRemoveIcon color='secondary' />
            </IconButton>
            :
            _id !== user._id &&
            <IconButton onClick={handleAddFollow}>
              <PersonAddIcon color='info' />
            </IconButton>
        }
      />
      <Divider />

    </Card>
  )
}

export default FriendCard