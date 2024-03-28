import { createSlice } from "@reduxjs/toolkit";

const configSlice=createSlice({
  name:'config',
  initialState:{
    lang:"en",
    mute:1,
    miniTrailerInfo:{
      posterPath:null,
      matchId:null,
    },
  },
  reducers:{
    changeLanguage:(state,action)=>{
      state.lang=action.payload;
    },
    changeMuteToUnmute:(state)=>{
      state.mute=0;
    },
    changeUnmuteToMute:(state)=>{
      state.mute=1;
    },
    addPosterPath:(state,action)=>{
      state.miniTrailerInfo.posterPath=action.payload;
    },
    addMatchId:(state,action)=>{
      state.miniTrailerInfo.matchId=action.payload;
    },
    removeMiniTrailerInfo:(state)=>{
      state.miniTrailerInfo.posterPath=null;
      state.miniTrailerInfo.matchId=null;
    }
  },
});

export const {changeLanguage,changeMuteToUnmute,changeUnmuteToMute,addPosterPath,addMatchId,removeMiniTrailerInfo}=configSlice.actions;

export default configSlice.reducer;