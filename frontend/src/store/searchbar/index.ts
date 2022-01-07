import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  searchbarOpen: boolean;
}

const initialState: InitialState = {
  searchbarOpen: false,
};

const searchBarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    open: (state) => {
      state.searchbarOpen = true;
    },
    close: (state) => {
      state.searchbarOpen = false;
    },
  },
});

export const { open, close } = searchBarSlice.actions;
export default searchBarSlice.reducer;
