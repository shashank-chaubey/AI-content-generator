import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-start justify-center overflow-x-auto p-4 sm:p-8 lg:p-20'>
        <UserProfile routing="hash"/>
    </div>
  )
}

export default Profile
