// initial state
// Action (action, action creator)
// reducer
// store
// dispatch

// This is how above redux flow looks like

const { createStore, combineReducers } = require("redux");

// initial state
const initialState = {
  posts: [],
};

//users
const usersInitialState = {
  users: [],
};

// Action (action, action creator)

// Action types
//              We write these constants to reduce typo (means spell error) errors in the entire app
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const ADD_USER = "ADD_USER";

// Add post action creator
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};
// Add user action creator
const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

// Remove post action creator
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id, // confusion
  };
};

// post reducer
const postReducer = (state = initialState, action) => {
  // one thing about the reducer, we should'nt mutate the origional state
  //   if (action.type === ADD_POST) {
  // return {
  //   posts: [...state.posts, action.payload], // consfusion here
  // };
  //   } else if (action.type === REMOVE_POST) {
  //   return {
  //     posts: state.posts.filter((post) => {
  //       return post.id !== action.id;
  //     }),
  //   };
  //   } else {
  //     return state;
  //   }

  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload], // consfusion here
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id !== action.id;
        }),
      };

    default:
      return state;
  }
};
// user reducer
const userReducer = (state = usersInitialState, action) => {
  // one thing about the reducer, we should'nt mutate the origional state

  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload], // consfusion here
      };

    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});
// store
const store = createStore(rootReducer);

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log(data.posts);
  console.log(data.users);
});
// dispatch
// add post action
store.dispatch(
  addPostAction({
    id: 1,
    title: "Best Course",
  })
);
store.dispatch(
  addPostAction({
    id: 2,
    title: "How to master redux",
  })
);

// remove post
store.dispatch(removePostAction(1));

// add new user
store.dispatch(
  addUserAction({
    id: 1,
    name: "Ahmad",
    email: "ahmadjajja86@gmail.com",
  })
);
