
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isAuthorized: false,
    isLoading: false,
    token: null
}


export const handleUserRegister = createAsyncThunk("/auth/register", async (formData) => {
    try {
        const response = await axios.post(
                `${import.meta.env.VITE_SERVER}/api/auth/register`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                }

            }
        );
        return response.data;

    } catch (error) {
        return error.response.data;
    }
})



export const handleUserLogin = createAsyncThunk("/auth/login", async ({ userId, password }) => {

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER}/api/auth/login/${userId}/${password}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }

            }
        )
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
});

export const checkAuthUser = createAsyncThunk("/auth/checkAuth", async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth/check-auth`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
    return response.data;
})



export

    const authSlice = createSlice({
        initialState,
        name: "authSlice",
        reducers: {
            setUserToken: (state) => {
                localStorage.setItem("token", state.token)
            },
            logOut: (state) => {
                state.isAuthorized = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token")
            }

        },
        extraReducers: (builder) => {
            builder.addCase(handleUserRegister.pending, (state) => {
                state.isLoading = true;
            })
                .addCase(handleUserRegister.fulfilled, (state, action) => {
                    state.isLoading = false;
                }).addCase(handleUserRegister.rejected, (state) => {
                    state.isLoading = false;
                    state.isAuthorized = false;
                    state.user = null;
                }).addCase(handleUserLogin.pending, (state) => {
                    state.isLoading = true;
                    state.isAuthorized = false;
                    state.user = null;
                }).addCase(handleUserLogin.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isAuthorized = action?.payload?.success;
                    state.user = action?.payload?.data?.user;
                    state.token = action?.payload?.data?.token;
                }).addCase(handleUserLogin.rejected, (state) => {
                    state.isLoading = false;
                    state.isAuthorized = false;
                    state.user = null;
                    state.token = null;
                }).addCase(checkAuthUser.pending, (state) => {
                    state.isLoading = true;
                }).addCase(checkAuthUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isAuthorized = action?.payload?.success;
                    state.user = action?.payload?.user?.user;
                }).addCase(checkAuthUser.rejected, (state) => {
                    state.isLoading = false;
                    state.isAuthorized = false;
                    state.user = null;
                    state.token = null;
                })
        }
    })

export const { setUserToken, logOut } = authSlice.actions;

export default authSlice.reducer