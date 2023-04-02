import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../components/PostCard'

const DisplayPost = () => {
    const posts =  useSelector(state=>state.posts)
    const refresh = useSelector(state=>state.refresh)
    const memoizedPosts = useMemo(() => posts, [posts, refresh]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column-reverse", gap: 3, width: "100%", margin: "auto" }}>
            {memoizedPosts && memoizedPosts.map(post => (
                <PostCard post={post} key={post._id} />
            ))}
        </Box>
    )
}

export default DisplayPost