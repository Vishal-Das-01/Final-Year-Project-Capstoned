import { createSlice } from "@reduxjs/toolkit";

export const Profile = createSlice({
    name: "Profile",
    initialState:{
        profile:null
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        removeProfile: (state) => {
            state.profile = null;
        }
    }
})

export const { setProfile, removeProfile } = Profile.actions;

export default Profile.reducer;