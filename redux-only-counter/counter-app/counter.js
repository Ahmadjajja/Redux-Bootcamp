// steps:
const { createStore } = require("redux");
// Initial state
const initialState = {
  count: 0,
};
// actions - action -action creator
// increments
// decrements
// reset
// increaseByAmount

// action

//increase Action creator
const incrementAction = () => {
  // This function is called action creator.
  return {
    // This returning abject is called action.
    type: "INCREMENT",
  };
};
//decrease Action creator
const decrementAction = () => {
  return {
    type: "DECREMENT",
  };
};
//reset Action creator
const resetAction = () => {
  return {
    type: "RESET",
  };
};
//increase by amount Action creator
const increaseByAmountAction = (anyAmount) => {
  return {
    type: "INCREASE_BY_AMOUNT",
    payload: anyAmount,
  };
};

// reducers
const counterReducer = (state = initialState, action) => {
  // Reducer always listen to the action to perform business logic
  console.log(action);
  if (action.type == "INCREMENT") {
    return {
      count: state.count + 1,
    };
  }
  if (action.type == "DECREMENT") {
    return {
      count: state.count - 1,
    };
  }
  if (action.type == "RESET") {
    return {
      count: 0,
    };
  }
  if (action.type == "INCREASE_BY_AMOUNT") {
    return {
      count: state.count + action.payload,
    };
  }
};
// store

const store = createStore(counterReducer); // this reducer is registered listener

// subscribe to store
store.subscribe(() => {
  // get state
  const stateData = store.getState();
  console.log(stateData);
});

// dispatch action

// store.dispatch(incrementAction());
// store.dispatch(resetAction());
// store.dispatch(decrementAction());

// dispatch action with payload
store.dispatch(increaseByAmountAction(100)); // stateDate = 100
store.dispatch(increaseByAmountAction(100)); // stateDate = 200
