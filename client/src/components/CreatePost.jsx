import { useTheme } from '@emotion/react'
import { Avatar, Box, Button, Card, InputBase } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from '../styles/FlexBetween'
import { Image } from "@mui/icons-material"
import { AddReaction } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux"
import { addPost, setRefresh } from '../store/reducers/modeReducer'

const CreatePost = () => {
  const [post, setPost] = useState({ media: null, content: "", timestamp: Date.now() })
  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light;
  const dispatch = useDispatch()
  const rootApi = useSelector(state => state.rootApi)
  const token = useSelector(state => state.token)
  const user = useSelector(state=>state.auth)

  const handleFile = (e) => {
    const media = e.target.files[0]
    setPost({ ...post, media: media })
  }

  const handleSubmit = async () => {
    // console.log(post);
    const formData = new FormData()
    formData.append("content", post.content)
    formData.append("media", post.media)
    // dispatch(addPost(formData))
    const res = await fetch(rootApi + "/post/", {
      method: "POST",
      headers: {
        token: token
      },
      body: formData
    })
    const data = await res.json()
    if (res.ok) {
      dispatch(setRefresh(false))
      console.log(data);
    } else {
      console.log(data);
    }
    setPost({ content: "", media: "" })
  }

  return (
    <Card sx={{ boxShadow: "none", px: { lg: 3, sm: 2, xs: 2 }, py: 3, borderRadius: 3, display: "flex", flexDirection: "column", gap: 2 }} component={"form"} encType={"multipart/formdata"}>
      <FlexBetween gap={1}>
        <Avatar src={"http://localhost:2000/"+user.logo} />
        <InputBase
          name='content'
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          value={post.content}
          placeholder="what's in your mind?"
          sx={{ background: neutralLight, p: "7px 13px", width: "100%", borderRadius: 6 }}
        />
      </FlexBetween>

      {post.media &&
        <Box sx={{ border: "dashed", borderColor: "#555", p: 1, borderRadius: 4, width: "100%", height: "100%" }}>
          <img src={URL.createObjectURL(post.media)} width={"100%"} height={"auto"} style={{ borderRadius: 5, objectFit: "contain" }} />
        </Box>
      }

      <FlexBetween gap={1}>
        <Button variant='outlined' color="info" sx={{ borderRadius: 6 }} component="label" startIcon={<Image />}>
          <input hidden accept="image/*" type="file" onChange={handleFile} />
          media
        </Button>
        <Button variant='outlined' color='warning' sx={{ borderRadius: 6 }} startIcon={<AddReaction />}>emoji</Button>
        <Button variant='contained' sx={{ ml: "auto", borderRadius: 6, boxShadow: "none" }} color='secondary' endIcon={<SendIcon />} onClick={handleSubmit}>Post</Button>
      </FlexBetween>

    </Card>
  )
}

export default CreatePost