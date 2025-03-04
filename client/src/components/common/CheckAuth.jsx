import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckAuth({ children, user, isAuthorized }) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        if(!user){
            if((!location.pathname.includes("/auth/"))){
                navigate('/auth/login');
                return
            }
        }
        if(user){
            if(location.pathname.includes("/auth")||location.pathname.includes("/home")){
                navigate('/chats/chat');
                return
            }
        }   

    }, [user, isAuthorized, location.pathname]);

    return children;
}

export default CheckAuth;
