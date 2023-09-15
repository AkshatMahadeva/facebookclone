import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileCard from "../components/ProfileCard"
import UserFriends from '../components/UserFriends'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setRefresh } from '../store/reducers/modeReducer'
import UserPosts from '../components/UserPosts'

const ProfilePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])
    const rootUrl = useSelector(state => state.rootApi)
    const token = useSelector(state => state.token)
    const refresh = useSelector(state => state.refresh)
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(rootUrl + "/user/" + id, {
                method: "GET",
                headers: {
                    token: token
                }
            })
            const data = await res.json()
            if (res.ok) {
                // console.log(data);
                setUser(data)
                dispatch(setRefresh(false))
            }
            else {
                console.log(data);
            }
        }
        getUser()
    }, [id, refresh])

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(rootUrl + "/user/" + id + "/following", {
                method: "GET",
                headers: {
                    token: token
                }
            })
            const data = await res.json()
            if (res.ok) {
                // console.log(data);
                setFollowing(data)
                dispatch(setRefresh(false))
            }
            else {
                console.log(data);
            }
        }
        getUser()
    }, [id, refresh])

    useEffect(() => {
        const userPosts = async () => {
            const res = await fetch(rootUrl + `/post/user/${id}`, {
                method: "GET",
                headers: {
                    token: token
                }
            })
            const data = await res.json()
            if (res.ok) {
                // console.log(data);
                setPosts(data)
                dispatch(setRefresh(false))
            } else {
                console.log(data);
            }
        }
        userPosts()
    }, [refresh, id])

    return (
        <>{user ?
            <Box sx={{ display: "flex", margin: "auto", gap: 4, flexDirection: { xs: 'column', sm: 'row', lg: "row" } }}>
                <Box flex={"25%"} display={"flex"} flexDirection={"column"} gap={3}>
                    <ProfileCard user={user} followers={user.followers} />
                    <UserFriends title={"followers"} friends={user.followers && user.followers} />
                    <Box display={{ sm: "block", xs: "block", lg: "none" }}>
                        <UserFriends title={"following"} friends={following && following} />
                    </Box>
                </Box>
                <Box flex={"40%"}>
                    <UserPosts posts={posts} />
                </Box>

                <Box flex={"25%"} display={{ sm: "none", lg: "block", xs: "none" }}>
                    <UserFriends title={"following"} friends={following && following} />
                </Box>
            </Box>
            :
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>
        }
        </>)
}

export default ProfilePage