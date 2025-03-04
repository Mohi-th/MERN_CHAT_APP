import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import FriendRequestListing from "./FriendRequestListing"



function NotificationDiag({openNotificationDialog,setOpenNotificationDialog,friendRequests,setFriendRequests}) {


    const removeRejectedFriendRequest=(id)=>{
         setFriendRequests(prev=>prev?.filter((item)=>item?._id!==id))
    }

  return (
    <Dialog open={openNotificationDialog} onOpenChange={setOpenNotificationDialog} className="md:max-w-[90%]" >
            <DialogContent className="max-w-[90%] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        Friend Requests
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <ul className='flex flex-col py-2 px-4 rounded-sm gap-2 max-h-[500px] ] overflow-auto no-scrollbar border'>
                        {
                            friendRequests?.length > 0 ? friendRequests?.map(friendRequestItem => <FriendRequestListing removeRejectedFriendRequest={removeRejectedFriendRequest} key={friendRequestItem._id} requestId={friendRequestItem._id} friendRequest={friendRequestItem?.sender} />) : 
                            <p>no friend requests</p>
                        }
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
  )
}

export default NotificationDiag
