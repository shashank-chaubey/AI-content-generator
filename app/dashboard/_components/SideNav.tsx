"use client"
import React from 'react';
import Image from 'next/image';
import { History, CreditCard, User, HomeIcon, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import UsageTrack from './UsageTrack';

function SideNav({ onNavigate }: { onNavigate?: () => void }){
  const MenuList = [
    {
      name: 'Home',
      icon: HomeIcon,
      path: '/dashboard'
    },
    {
      name: 'History',
      icon: History,
      path: '/dashboard/history'
    },
    {
      name: 'Billing',
      icon: CreditCard,
      path: '/dashboard/billing'
    },
    {
      name: 'Profile',
      icon: User,
      path: '/dashboard/profile'
    }
  ];

  const path = usePathname();

  return (
    <motion.div 
      className='relative flex h-full min-h-screen flex-col overflow-y-auto border-r border-slate-200 bg-white p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex items-center gap-3 px-2 py-3'>
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Image src={'/logo.svg'} alt='ContGen logo' width={44} height={44} className='h-11 w-11 rounded-xl'/>
        </motion.div>
        <div><p className='font-bold tracking-tight text-slate-900'>ContGen</p><p className='text-xs text-slate-500'>AI content studio</p></div>
      </div>

      <Link href='/' onClick={onNavigate} className='mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'><ArrowLeft className='h-4 w-4' /> Back to website</Link>


      <div className='mt-6 flex-1'>
        {MenuList.map((menu) => (
          <Link key={menu.path} href={menu.path} className="block" onClick={onNavigate}>
            <motion.div 
              className={`mb-1.5 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${path === menu.path ? 'bg-slate-950 text-white shadow-md shadow-slate-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}
              `}
            >
              <menu.icon className='h-4 w-4'/>
              <motion.h2>
                {menu.name}
              </motion.h2>
            </motion.div>
          </Link>
        ))}
      </div>
      
      <motion.div 
        className='mt-5 w-full'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UsageTrack />
      </motion.div>
    </motion.div>
  )
}

export default SideNav;
