import { useSelector } from "react-redux"



function MessageListing({message}) {

  const {user} =useSelector(state=>state.auth)

  return (
    <li className={`${user?._id===message?.sender?`justify-end`:''} flex `}>
      <p className="bg-white  rounded-sm  px-4 py-[6px] whitespace-normal break-words max-w-md shadow-sm">
       {message?.message} 
      </p>
    </li>
  )

}
export default MessageListing
