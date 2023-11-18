import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';


const UserAvatar = () => {
    const {user}=useUser();

  return (
    <Avatar className='h-12 w-12'>
        <AvatarImage src={user?.imageUrl}></AvatarImage>
    </Avatar>
  )
}

export default UserAvatar