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
      state.miniTrailerVideo=action.payload;
    },
    removeAllMovies:(state)=>{
      state.miniTrailerVideo=null;
      state.nowPlayingMovies=null;
      state.popularMovies=null;
      state.topRatedMovies=null;
      state.trailerVideo=null;
      state.trendingMovies=null;
      state.upcomingMovies=null;
    }
  },
});


export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addTrendingMovies,addMiniTrailerVideo,removeAllMovies}=movieSlice.actions;

export default movieSlice.reducer;