import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  postCreateOpen: boolean;
}

const initialState: InitialState = {
  postCreateOpen: false,
};

const postCreate = createSlice({
  name: "postCreate",
  initialState,
  reducers: {
    open: (state) => {
      state.postCreateOpen = true;
    },
    close: (state) => {
      state.postCreateOpen = false;
    },
  },
});

export const { open, close } = postCreate.actions;
export default postCreate.reducer;
