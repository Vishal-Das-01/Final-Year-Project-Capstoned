import { createSlice } from "@reduxjs/toolkit";

export const AuthDetails = createSlice({
    name: "AuthDetails",
    initialState:{
        role: null, 
        email: null,
        profileID: null,
        accessToken: null,
        profileImage: null,
        firstName: null,
        lastName: null,
        gender: null,
    },
    reducers: {
        setAuthDetails: (state, action) => {
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.profileID = action.payload.profileID;
            state.accessToken = action.payload.accessToken;
            state.profileImage = action.payload.profileImage;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.gender = action.payload.gender;
        },
        removeAuthDetails: (state) => {
            state.role = null;
            state.email = null;
            state.profileID = null;
            state.accessToken = null;
            state.profileImage = null;
            state.firstName = null;
            state.lastName = null;
            state.gender = null;
        }
    }
})

export const { setAuthDetails, removeAuthDetails } = AuthDetails.actions;

export default AuthDetails.reducer;