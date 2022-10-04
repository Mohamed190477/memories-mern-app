import * as api from "../api";

//dispatches

//Action creators (functions that return actions)

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
    });
    const { data } = await api.fetchPost(id);
    dispatch({
      type: "FETCH_POST",
      payload: data, //data where we store all of our posts
    });

    dispatch({
      type: "END_LOADING",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
    });
    const { data } = await api.fetchPosts(page);

    dispatch({
      type: "FETCH_ALL",
      payload: data, //data where we store all of our posts
    });

    dispatch({
      type: "END_LOADING",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
    });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({
      type: "SEARCH",
      payload: data,
    });
    dispatch({
      type: "END_LOADING",
    });
  } catch (error) {
    console.log(error);
  }
};
//dispatch comes from redux-thunk
export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: "START_LOADING",
    });
    const { data } = await api.createPost(post);
    dispatch({
      type: "CREATE",
      payload: data,
    });
    dispatch({
      type: "END_LOADING",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({
      type: "DELETE",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: "LIKE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({
      type: "COMMENT",
      payload: data,
    });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};