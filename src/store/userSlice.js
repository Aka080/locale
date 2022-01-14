import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  filterAge: 0,
  queryItem: 0,
  numberOfUsers: 0,
  userById: {},
  userByArea: {},
  userByAge: {},
  userByGender: { M: [], F: [] },
  isPro: [],
  userByMatches: {},
  isDataLoading: true,
};

export const userDetails = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUsersByArea: (state, action) => {
      state.userByArea = action.payload;
    },
    setUserByAge: (state, action) => {
      state.userByAge = action.payload;
    },
    setUserById: (state, action) => {
      state.userById = action.payload;
    },
    setUserByGender: (state, action) => {
      state.userByGender = action.payload;
    },
    setIsPro: (state, action) => {
      state.isPro = action.payload;
    },
    setNumberOfUsers: (state, action) => {
      state.numberOfUsers = action.payload;
    },
    setUserByMatches: (state, action) => {
      state.userByMatches = action.payload;
    },
    setQueryItem: (state, action) => {
      state.queryItem = action.payload;
    },
    setFilterAge: (state, action) => {
      state.filterAge = action.payload;
    },
    setIsDataLoading: (state, action) => {
      state.isDataLoading = action.payload;
    },
  },
});

export const getUserById = (state) => state.userDetails.userById;
export const getIsPro = (state) => state.userDetails.isPro;
export const getUserByAge = (state) => state.userDetails.userByAge;
export const getUserByArea = (state) => state.userDetails.userByArea;
export const getUserByGender = (state) => state.userDetails.userByGender;
export const getUserByMatches = (state) => state.userDetails.userByMatches;
export const getNumberOfUsers = (state) => state.userDetails.numberOfUsers;
export const getQueryItem = (state) => state.userDetails.queryItem;

export const {
  setUserByAge,
  setNumberOfUsers,
  setUserByGender,
  setUserById,
  setUsersByArea,
  setIsPro,
  setUserByMatches,
  setQueryItem,
  setFilterAge,
  setIsDataLoading
} = userDetails.actions;

export default userDetails.reducer;
