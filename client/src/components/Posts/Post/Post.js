import React, { useState } from "react";
import useStyles from "./styles";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const handleClick = async () => {
    dispatch(likePost(post?._id));
    if (
      likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      )
    ) {
      setLikes(
        likes.filter(
          (id) => id !== (user?.result?.googleId || user?.result?._id)
        )
      );
    } else {
      setLikes([...likes, user?.result?.googleId || user?.result?._id]);
    }
  };
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post?.likes?.length > 2
            ? `you and ${post?.likes?.length - 1} others`
            : `${post?.likes?.length} like${
                post?.likes?.length > 1 ? `s` : ``
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp; {post?.likes?.length}{" "}
          {post?.likes?.length === 1 ? `like` : `likes`}
        </>
      );
    }
    return (
      <>
        {" "}
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp; Like
      </>
    );
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card raised elevation={12} className={classes.card}>
      {/* <ButtonBase className={classes.cardActions} onClick={openPost}> */}
      <CardMedia
        className={classes.media}
        image={post?.selectedFile}
        title={post?.title}
        style={{ cursor: "pointer" }}
        onClick={openPost}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post?.name}</Typography>
        <Typography variant="body2">
          {moment(post?.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(post?.creator === user?.result?._id ||
          post?.creator === user?.result?.googleId) && (
          <>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post?.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        variant="h5"
        style={{ color: "black" }}
        gutterBottom
        color="textSecondary"
      >
        {post?.title}
      </Typography>
      <CardContent>
        <Typography variant="h6" gutterBottom color="textSecondary">
          {post?.message}
        </Typography>
      </CardContent>
      {/* </ButtonBase> */}
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleClick}
        >
          <Likes />
        </Button>

        {(post?.creator === user?.result?._id ||
          post?.creator === user?.result?.googleId) && (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(post?._id))}
            >
              <DeleteIcon fontSize="small" />
              &nbsp; Delete{" "}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;
