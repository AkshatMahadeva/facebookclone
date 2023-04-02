import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Checkbox } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import moment from "moment"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from "../store/reducers/modeReducer"
import CommentBox from './CommentBox';
import { setRefresh } from '../store/reducers/modeReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function PostMenu({ id, userId, likes }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const rootApi = useSelector(state => state.rootApi)
  const navigator = useNavigate()
  const token = useSelector(state => state.token)
  const user = useSelector(state => state.auth)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async () => {
    // console.log(id);
    // console.log(user._id);
    const res = await fetch(rootApi + "/post/" + id, {
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

  const handleDelete = async () => {
    // console.log(id);
    const res = await fetch(rootApi + "/post/" + id, {
      method: "DELETE",
      headers: {
        token: token
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      dispatch(setRefresh(true))
    } else {
      console.log(data);
    }
  }

  const handleAddLike = async () => {
    const res = await fetch(rootApi + `/post/${id}/likes/add`, {
      method: "PUT",
      headers: {
        token: token
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      dispatch(setRefresh(true))
    } else {
      console.log(data);
    }
  }

  const handleRemoveLike = async () => {
    const res = await fetch(rootApi + `/post/${id}/likes/remove`, {
      method: "PUT",
      headers: {
        token: token
      }
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
        {user._id === userId && [
          <MenuItem key="edit" onClick={() => { handleClose(); handleUpdate() }}>
            Edit
          </MenuItem>,
          <MenuItem key="delete" onClick={() => { handleClose(); handleDelete() }}>
            Delete
          </MenuItem>
        ]}
        {!likes.includes(user._id)
        ?
        <MenuItem onClick={() => { handleClose(); handleAddLike() }}>
          like
        </MenuItem>
        :<MenuItem onClick={() => { handleClose(); handleRemoveLike() }}>
          dislike
        </MenuItem>}
        <MenuItem onClick={() => { handleClose() }}>
          report
        </MenuItem>
      </Menu>
    </div>
  );
}


export default function PostCard(props) {
  const { _id, user, media, content, createdAt, likes, comments } = props.post
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const rootApi = useSelector(state => state.rootApi)

  const handleAddLike = async () => {
    const res = await fetch(rootApi + `/post/${_id}/likes/add`, {
      method: "PUT",
      headers: {
        token: token
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data);
      dispatch(setRefresh(true))
    } else {
      console.log(data);
    }
  }

  const handleRemoveLike = async () => {
    const res = await fetch(rootApi + `/post/${_id}/likes/remove`, {
      method: "PUT",
      headers: {
        token: token
      }
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
    <Card sx={{ width: "100%", borderRadius: 3, boxShadow: "none", padding: "7px 15px" }} id={_id}>
      <CardHeader
        avatar={
          <Link to={`/${user._id}`}><Avatar aria-label="recipe" src={`http://localhost:2000/${user.logo}`} /></Link>
        }
        action={
          <PostMenu id={_id} userId={user._id} likes={likes} />
        }
        title={user.name}
        subheader={moment(createdAt).fromNow()}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      {media && <CardMedia
        component="img"
        height="auto"
        sx={{ borderRadius: 3 }}
        image={`http://localhost:2000/${media}`}
        alt={user}
      />}

      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          liked by {likes.length} people..
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comments.length} comments
        </Typography>
      </CardContent>

      <CardActions sx={{ gap: 1 }} disableSpacing>
        {likes && likes.find((like) => like === auth._id) ? (
          <IconButton onClick={handleRemoveLike}>
            <FavoriteIcon color="secondary" />
          </IconButton>
        ) : (
          <IconButton onClick={handleAddLike}>
            <FavoriteBorder />
          </IconButton>
        )}


        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <Box sx={{ ml: "auto" }}>
          <CommentBox comments={comments} postId={_id} />
        </Box>
      </CardActions>

    </Card>
  );
}