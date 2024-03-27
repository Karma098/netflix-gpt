import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
  name:'movies',
  initialState:{
    nowPlayingMovies:null,
    trailerVideo:null,
    popularMovies:null,
    topRatedMovies:null,
    upcomingMovies:null,
    trendingMovies:null,
    miniTrailerVideo:[],
  },
  reducers:{
    addNowPlayingMovies:(state,action)=>{
      state.nowPlayingMovies=action.payload;
    },
    addPopularMovies:(state,action)=>{
      state.popularMovies=action.payload;
    },
    addTrailerVideo:(state,action)=>{
      state.trailerVideo=action.payload;
    },
    addTopRatedMovies:(state,action)=>{
      state.topRatedMovies=action.payload;
    },
    addUpcomingMovies:(state,action)=>{
      state.upcomingMovies=action.payload;
    },
    addTrendingMovies:(state,action)=>{
      state.trendingMovies=action.payload;
    },
    addMiniTrailerVideo:(state,action)=>{
      state.miniTrailerVideo.push(action.payload);
    }
  },
});


export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addTrendingMovies,addMiniTrailerVideo}=movieSlice.actions;

export default movieSlice.reducer;