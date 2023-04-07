import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
const initialState1 = {
  modelScene: null,
};
const exportModelsReducer = (state = initialState1, action) => {
  switch (action.type) {
    case "MODEL_SCENE":
      return { ...state, modelScene: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    data: reducer,
  },
});

export default store;
