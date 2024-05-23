import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user? user : null,
    error: false,
    success: false,
    loading: false,
};

//  register an user an sign in

export const register = createAsyncThunk("auth/register",
    async (user,thunkAPI) =>{
        const data = await authService.register(user);
    }
);
