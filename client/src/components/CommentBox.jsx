import React, { useEffect, useState } from 'react'
import { FavoriteBorder } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardActions, Checkbox, Divider, IconButton, InputBase, Modal, Typography } from '@mui/material'
import styled from '@emotion/styled'
import FlexBetween from "../styles/FlexBetween"
import moment from "moment"
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, deleteComment, setRefresh } from '../store/reducers/modeReducer'
import { Link } from 'react-router-dom'

const Comments = styled(Box)({
    display: "flex",
    backgroundColor: "transparent",
})

function CommentMenu({ id, postId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const rootApi = useSelector(state => state.rootApi)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        console.log(id);
    }

    const handleDelete = async () => {
        dispatch(setRefresh(false))
        const res = await fetch(rootApi + `/post/${postId}/comments/${id}/remove`, {
            method: "PUT",
            headers: {
                token: token
            },
        })
        const data = await res.json()
        if (res.ok) {
            console.log(data);
            dispatch(setRefresh(true))
        } else {
            console.log(data);
        }
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleClose(); handleUpdate() }}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); handleDelete() }}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}

const DisplayComments = (props) => {
    const { _id, comment, createdAt, user } = props.comment;
    const {postId} = props;
    // const rootApi = useSelector(state=>state.rootApi)
    const auth = useSelector(state => state.auth)
    return (
        <Card sx={{ display: "flex", my:2, flexDirection: "column", gap: 1, boxShadow: "none", fontSize: { sm: "13px", xs: "12px", lg: "15px" }, width: "100%" }} key={_id}>
            <Comments gap={3}>
                <Link to={"/"+user._id}><Avatar src={`http://localhost:2000/${user.logo}`} /></Link>
                <Box sx={{ mr: "auto" }}>
                    <FlexBetween><Typography variant='p'>{user.name}.</Typography><Typography variant='body2' color={"text.secondary"}>{moment(createdAt).fromNow()}</Typography></FlexBetween>
                    <Typography variant='body'>{comment}</Typography>

                    <FlexBetween sx={{ mt: 1 }}>
                        <Checkbox icon={<FavoriteBorder />} checkedIcon={<FavoriteIcon color='secondary' />} />

                        <IconButton>
                            <MessageIcon />
                        </IconButton>

                    </FlexBetween>
                </Box>
                {auth._id === user._id && <CommentMenu id={_id} postId={postId} />}
            </Comments>


        </Card>)
}

const CommentPost = ({ id }) => {
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light;
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const rootApi = useSelector(state => state.rootApi)
    const [comment, setComment] = useState("")

    const handleSubmit = async () => {
        dispatch(setRefresh(false))
        const res = await fetch(rootApi + `/post/${id}/comments/add`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ comment })
        })
        const data = await res.json()
        if (res.ok) {
            console.log(data);
            dispatch(setRefresh(true))
            setComment("")
        } else {
            console.log(data);
        }
    }
    return (
        <Box sx={{ my: 2, width: "100%" }}>
            <Box sx={{ width: "100%" }} display={"flex"} gap={3} alignItems={"start"}>
                <Avatar src={`http://localhost:2000/${auth.logo}`} />
                <Box width={"100%"}>
                    <InputBase placeholder='type here' sx={{ width: "100%", borderRadius: 2, background: neutralLight, p: 1, mb: 1 }} rows={2} value={comment} onChange={(e) => setComment(e.target.value)} multiline />
                    <Button endIcon={<SendIcon />} color="info" onClick={handleSubmit}>send</Button>
                </Box>
            </Box>
        </Box>
    )
}

const CommentBox = ({ comments, postId }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log(comments);

    const style = {
        position: 'fixed',
        top: '50%',
        left: "50%",
        transform: 'translate(-50%, -50%)',
        width: { lg: "500px", sm: "80%", xs: "90%" },
        bgcolor: 'background.paper',
        boxShadow: 24,
        px: 2,
        py: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: "500px",
        borderRadius: 3,
    };
    return (
        <>

            <IconButton onClick={handleOpen}><MessageIcon /></IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Box sx={{ height: "max-content", overflow: "auto", px: 2 }}>
                        <CommentPost id={postId} />
                        {comments && comments.map(comment =>
                            <DisplayComments comment={comment} postId={postId} key={comment._id} />
                        )}
                    </Box>
                </Card>
            </Modal>

        </>
    )
}

export default CommentBox