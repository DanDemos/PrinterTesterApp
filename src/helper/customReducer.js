export const customReducer = {
  clearSlice: (state, action) => {
    state = {};
    return state;
  },
  clearSliceElement: (state, action) => {
    state[action?.payload] = {};
    return state;
  },
  myReducer: (state, action) => {
    return state;
  },
};

export default customReducer;
