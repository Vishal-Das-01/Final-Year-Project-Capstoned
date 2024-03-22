import { createSlice } from "@reduxjs/toolkit";

export const AuthDetails = createSlice({
    name: "AuthDetails",
    initialState:{
        accessToken: null,
        role: null, 
        email: null,
        profileID: null
    },
    reducers: {
        setAuthDetails: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.profileID = action.payload.profileID;
        },
        removeAuthDetails: (state) => {
            state.accessToken = null;
            state.role = null;
            state.email = null;
            state.profileID = null;
        }
    }

})

export const { setAuthDetails, removeAuthDetails } = AuthDetails.actions;