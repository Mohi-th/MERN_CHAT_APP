
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Check, Trash, } from 'lucide-react'
import { acceptFriendRequestAndCreateChat, rejectFriendRequest } from '@/store/friend-request-slice'
import { getSocket } from '@/services/socket'
import { setChatss } from '@/store/chat'

function FriendRequestListing({ friendRequest, requestId, removeRejectedFriendRequest }) {

    const { user } = useSelector(state => state.auth)
    const { chats } = useSelector(state => state.chatRequest)

    const socket = getSocket();

    const dispatch = useDispatch()

    const friendRequestReject = () => {
        dispatch(rejectFriendRequest(requestId)).then((data) => {
            if (data?.payload?.success) {
                removeRejectedFriendRequest(requestId);
            }
        })
    }

    const friendRequestAccept = () => {
        dispatch(acceptFriendRequestAndCreateChat({ participants: [user?._id, friendRequest?._id], groupName: "", groupImage: "", requestId })).then((data) => {
            if (data?.payload?.success) {
                console.log("accepted",data?.payload?.data)
                removeRejectedFriendRequest(requestId);
                socket.emit('friend-request-accept', data?.payload?.data, friendRequest?._id)
                dispatch(setChatss([...chats, data?.payload?.data]))
            }
        })
    }


    if (friendRequest?._id === user?._id) return;


    return (

        <li className='flex flex-col gap-2'>
            <div className='flex justify-between w-full items-center'>
                <div className='flex items-center gap-4'>
                    <div className='w-[40px] h-[40px] rounded-full'>
                        <img className='w-full h-full object-center object-cover rounded-full' src={friendRequest?.image} />
                    </div>
                    <span className='text-[18px] '>{friendRequest?.userName}</span>
                    <span className='text-sm'>user id : {friendRequest?.userId} </span>
                </div>
                <div className='flex gap-4'>
                    <Button onClick={friendRequestAccept} className={"bg-green-500 rounded-full w-[30px] h-[30px]"}><Check /></Button>
                    <Button onClick={friendRequestReject} className={"bg-red-400 rounded-full w-[30px] h-[30px]"}><Trash /></Button>
                </div>
            </div>
            <Separator />
        </li>

    )
}

export default FriendRequestListing
