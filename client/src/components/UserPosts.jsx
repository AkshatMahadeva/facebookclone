import { Box, Typography } from '@mui/material'
import React from 'react'
import PostCard from '../components/PostCard'

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