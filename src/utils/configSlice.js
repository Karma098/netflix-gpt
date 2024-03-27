import { createSlice } from "@reduxjs/toolkit";

const configSlice=createSlice({
  name:'config',
  initialState:{
    lang:"en",
    mute:1,
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
    }
  },
});

export const {changeLanguage,changeMuteToUnmute,changeUnmuteToMute}=configSlice.actions;

export default configSlice.reducer;