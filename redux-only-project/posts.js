const { createStore, applyMiddleware } = require("redux");
// const loggerMiddleware = require("redux-logger").createLogger();
const thunk = require("redux-thunk").default;
const axios = require("axios");
// // custom middleware
// // syntax is scarry but that's fine
// const customLogger = () => {
//   return (next) => {
//     return (action) => {
//       console.log("Action fired", action);
//       next(action);
//       // 1) - will log the state written in subscribe function
//       // 2) - the purpose for the next is that is going
//       // to allow another middleware in the pipeline
//       // to be executed
//     };
//   };
// };

// Action constants
const REQUEST_STARTED = "REQUEST_STARTED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const REQUEST_FAILED = "REQUEST_FAILED";

// initial state
const initialState = {
  posts: [],
  error: "",
  loading: false,
};
// Actions
const fetchPostRequest = () => {
  return {
    type: REQUEST_STARTED,
  };
};
const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_SUCCESS,
    payload: posts,
  };
};
const fetchPostFailed = (error) => {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
};
// This is the step that we are going to follow every time
// when are beggining redux application

// action to make the request
const fetchPosts = () => {
  return async (dispatch) => {
    try {
      // dispatch
      dispatch(fetchPostRequest());
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // success
      dispatch(fetchPostSuccess(data));
    } catch (error) {
      // err action
      dispatch(fetchPostFailed(error.message));
    }
  };
};

// Reducers
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      // one point about the reducer is that we should'nt mutate the origional data, therefore we are going to spread the origional data as that
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
// store
const store = createStore(
  postReducer,
  //   applyMiddleware(customLogger, loggerMiddleware) // we can pass here multiple middlewares(Each middle ware for their own purpose)
  applyMiddleware(thunk)
);
// subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});
// dispatch
store.dispatch(fetchPosts());

// action REQUEST_STARTED @ 14:28:54.023
// prev state undefined             // what does this prev state = undefined means ? i am confused here...
// action     { type: 'REQUEST_STARTED' }
// next state { posts: [ 'CSS' ] }
