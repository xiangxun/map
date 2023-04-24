import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  modelInfo: null,
  newSolutions: null,
  canvasRef: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_MODEL_INFO":
      return { ...state, modelInfo: action.payload };
    case "ADD_SOLUTION":
      return { ...state, newSolutions: action.payload };
    case "SET_CANVAS_REF":
      return { ...state, canvasRef: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  // reducer: rootReducer,
  reducer,
});
export default store;

// const rootReducer = {
//   data: (state = { data: null }, action) => {
//     switch (action.type) {
//       case "SET_DATA":
//         return { ...state, data: action.payload };
//       default:
//         return state;
//     }
//   },
//   modelInfo: (state = { modelInfo: null }, action) => {
//     switch (action.type) {
//       case "SET_MODEL_INFO":
//         return { ...state, modelInfo: action.payload };
//       default:
//         return state;
//     }
//   },
// };
// // action types
// const SET_CANVAS_REF = "SET_CANVAS_REF";

// // action creator
// export const setCanvasRef = (
//   canvasRef: React.RefObject<HTMLCanvasElement>
// ) => ({
//   type: SET_CANVAS_REF,
//   payload: canvasRef,
// });

// const initialState = {
//   data: null,
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_DATA":
//       return { ...state, data: action.payload };
//     default:
//       return state;
//   }
// };
// const modelInfoReducer = (state = { modelInfo: null }, action) => {
//   switch (action.type) {
//     case "SET_MODEL_INFO":
//       return { ...state, modelInfo: action.payload };
//     default:
//       return state;
//   }
// };

// const store = configureStore({
//   reducer,
//   modelInfoReducer,
// });
