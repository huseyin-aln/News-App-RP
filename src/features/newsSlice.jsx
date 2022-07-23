import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsList: [],
  loading: true,
};

const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = "6fb3bce3688d441dbf7bd064c81823c0";

export const getNews = createAsyncThunk(
  "news/getNews",

  async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    try {
      const { data } = await axios(url);
      return data.articles;
    } catch (error) {
      console.log(error);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: {
    [getNews.pending]: (state, action) => {
      state.loading = true;
    },
    [getNews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.newsList = payload;
    },
    [getNews.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
