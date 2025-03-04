
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import AddFriendDialogUserList from './AddFriendDialogUserList';


function AddFriendDialog({ openAddFriendDialog, setOpenAddFriendDialog ,tempUsers,setUsers,users,keyword,setKeyword}) {

   const filterUsers=(singleUser)=>{
        setUsers(prev=>prev.filter((userItem)=>userItem?._id!=singleUser))
   }


    return (
        <Dialog open={openAddFriendDialog} onOpenChange={setOpenAddFriendDialog}>
            <DialogContent className="max-w-[90%] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        Add Friend
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className='mb-4'>
                        <Input value={keyword} onChange={(event) => {
                            setKeyword(event.target.value)
                        }} placeholder={"Search for a friend"} />
                    </div>
                    <ul className='flex flex-col py-2 px-4 rounded-sm gap-2 max-h-[500px] overflow-auto no-scrollbar border'>
                        {
                            tempUsers?.length > 0 ? tempUsers?.map(user => <AddFriendDialogUserList key={user._id} User={user} filterUsers={filterUsers} />) : null
                        }
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddFriendDialog
