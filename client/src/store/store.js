import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import friendRequestReducer from './friend-request-slice'
import chatRequestReducer from './chat'


const store=configureStore({
    reducer:{
        auth:authReducer,
        friendRequest:friendRequestReducer,
        chatRequest:chatRequestReducer
    }
})

export default store;