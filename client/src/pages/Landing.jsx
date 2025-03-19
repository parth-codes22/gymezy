import { Image } from '@heroui/react'
import React from 'react'
import GymLogo from '../assets/logo.jpg';

const Landing = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center align-middle items-center p-10'>
      <Image src={GymLogo} width={300} height={300} />
      <p className='text-[64px] font-bold'>Welcome to <span className="text-blue-500">GYMEZY !!</span></p>
    </div>
  )
}

export default Landing;