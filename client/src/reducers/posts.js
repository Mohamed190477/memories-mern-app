export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case "FETCH_POST":
      return {
        ...state,
        post: action.payload,
      };

    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };

    case "START_LOADING":
      return { ...state, isLoading: true };

    case "END_LOADING":
      return { ...state, isLoading: false };

    case "LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    //return the array as it is except for the post that has the id matched with the payload then it will be replaced with the updated one,
    //then the array is returned with the posts as it is with the exception of the post that was meant to be updated will be replaced with the updated one

    case "SEARCH":
      return {
        ...state,
        posts: action.payload,
      };
    //changing the entire state to the search results so that when it is selected by posts component that
    //renders the post will see only the posts that is overwritten by this action changing it from all
    //posts to only the one that matches our search

    case "DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case "COMMENT":
      return {
        ...state,
        post: action.payload,
      };
    //posts array represents the state of the data whatever state it is in

    default:
      return state;
  }
};
