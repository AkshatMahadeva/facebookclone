import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../components/PostCard'
import { setRefresh } from '../store/reducers/modeReducer'

const UserPosts = ({posts}) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column-reverse", gap: 3, width: "100%", margin: "auto" }}>
            {posts && posts.map((post) => (
                <PostCard post={post} key={post._id} />
            ))}
            {posts && posts.length === 0 && <Typography variant='h6' textAlign={"center"} mt={4} color={"text.secondary"}>No Post Yet</Typography>}
        </Box>
    )
}

export default UserPosts;