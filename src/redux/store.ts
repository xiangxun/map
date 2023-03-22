import { createStoreHook } from "react-redux";

const initialState = {
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const store = createStoreHook(reducer);

export default store;
