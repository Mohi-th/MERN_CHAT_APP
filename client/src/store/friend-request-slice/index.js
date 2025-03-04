
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    friendRequest: null,
    isLoading: false,
}

export const sendingFriendRequest = createAsyncThunk("/chat/sendFriendRequest", async (formData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER}/api/friend-request/send`,
            formData,
            {
                // headers: {
                //     "Content-Type": "application/json",
                // }

            }
        );
        return response.data;

    } catch (error) {
        return error.response.data;
    }
})



export const rejectFriendRequest = createAsyncThunk("/chat/rejectFriendRequest", async (id) => {

    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_SERVER}/api/friend-request/delete/${id}`, {},
            {
                // headers: {
                //     "Content-Type": "application/json",
                // }

            }
        )
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
});

export const acceptFriendRequestAndCreateChat = createAsyncThunk("/chat/acceptFriendRequestAndCreateChat", async (formData) => {
    console.log(formData,"formdata")
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/friend-request/accept`, formData,
        {
            // headers: {
            // "Authorization": `Bearer ${token}`
            // }
        }
    )
    return response.data;
})

export const fetchAllFriendRequest = createAsyncThunk("/chat/fetchAllFriendRequest", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/friend-request/get/${id}`,
        {
            // headers: {
            // "Authorization": `Bearer ${token}`
            // }
        }
    )
    return response.data;
})



export const friendRequestSlice = createSlice({
    initialState,
    name: "friendRequestSlice",
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(sendingFriendRequest.pending, (state) => {
            state.isLoading = true;
        }).addCase(sendingFriendRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendRequest=action?.payload?.data
        }).addCase(sendingFriendRequest.rejected, (state) => {
            state.isLoading = false;
            state.friendRequest=null;
        }).addCase(rejectFriendRequest.pending, (state) => {
            state.isLoading = true;
        }).addCase(rejectFriendRequest.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(rejectFriendRequest.rejected, (state) => {
            state.isLoading = false;
        }).addCase(acceptFriendRequestAndCreateChat.pending, (state) => {
            state.isLoading = true;
        }).addCase(acceptFriendRequestAndCreateChat.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(acceptFriendRequestAndCreateChat.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchAllFriendRequest.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFriendRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendRequest=action?.payload?.data
        }).addCase(fetchAllFriendRequest.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

// export const { setUserToken, logOut } = friendRequestSlice.actions;

export default friendRequestSlice.reducer