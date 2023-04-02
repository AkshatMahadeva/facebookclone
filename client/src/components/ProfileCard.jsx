import { Avatar, Divider, Card, CardHeader, IconButton, Typography, CardActions, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { setRefresh } from '../store/reducers/modeReducer';
import { Box } from '@mui/system';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';


const ProfileCard = (props) => {
    const { logo, name, _id, followers, occupation, education, bio } = props.user
    const theme = useTheme()
    const light = theme.palette.primary.main
    const navigator = useNavigate()
    const user = useSelector(state => state.auth)
    const rootApi = useSelector(state => state.rootApi)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()


    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(setRefresh(true))
        navigator("/login")
        window.location.reload(false)
    }

    const handleAddFollow = async () => {
        const res = await fetch(rootApi + "/user/" + _id + "/follower/add", {
            method: "PUT",
            headers: {
                token: token
            }
        })
        const data = await res.json()
        if (res.ok) {
            // console.log(data);
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
            // console.log(data);
            dispatch(setRefresh(true))
        }
        else {
            console.log(data);
        }
    }

    return (
        <Card sx={{ borderRadius: 3, p: 1, px: 2, boxShadow: "none" }}>
            <CardHeader
                avatar={
                    <Link to={`/${user._id}`}><Avatar sx={{ cursor: "pointer" }} src={`http://localhost:2000/${logo}`} /></Link>
                }
                title={name}
                subheader={`followed by ${followers.length}`}

                action={user._id === _id ?

                    <IconButton onClick={handleLogout}>
                        <Logout />
                    </IconButton>

                    : followers && followers.find(follower => follower._id === user._id) ?
                        <IconButton onClick={handleRemoveFollow}>
                            <PersonRemoveIcon color='secondary' />
                        </IconButton>
                        :
                        <IconButton onClick={handleAddFollow}>
                            <PersonAddIcon color='info' />
                        </IconButton>
                }
            />
            <Divider />
            <Box fontSize={"12px"}>
                <Card sx={{ border: 'none', boxShadow: 'none', }}>

                    <CardHeader
                        avatar={<Avatar><WorkIcon /></Avatar>}
                        title={"Occupation"}
                        subheader={occupation}
                    />
                    <Divider />
                    <CardHeader
                        avatar={<Avatar><SchoolIcon /></Avatar>}
                        title={"Education"}
                        subheader={education}
                    />
                    <Divider />
                    {bio &&
                        <> <Box m={2}>
                            <Typography variant='h6'>Bio</Typography>
                            <Typography mt={2} variant='p' color={"#888"}>{bio.slice(0, 200)}...</Typography>
                        </Box>
                            <Divider />
                        </>
                    }
                </Card>
            </Box>

            <Typography variant='h6' sx={{ m: 1 }}>
                More Links
            </Typography>
            <Divider />

            <CardActions sx={{ my: 1 }}>
                <IconButton>
                    <FacebookIcon color={light} />
                </IconButton>

                <IconButton>
                    <YouTubeIcon color={light} />
                </IconButton>

                <IconButton>
                    <LinkedInIcon color={light} />
                </IconButton>


            </CardActions>

        </Card>

    )
}

export default ProfileCard