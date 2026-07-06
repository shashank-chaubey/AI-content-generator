"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsage } from '../(context)/UpdateCreditUsage';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const[totalUsage,setTotalUsage]=useState<Number>(0);
    const[userSubscription, setUserSubscription]=useState<boolean>(false);
    const[creditUsage, setCreditUsage]=useState<any>()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <UserSubscriptionContext.Provider value={{userSubscription, setUserSubscription}}>
    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <UpdateCreditUsage.Provider value={{creditUsage, setCreditUsage}}>
    <div className='min-h-screen bg-slate-50 text-slate-900'>
        <div className='fixed inset-y-0 left-0 z-40 hidden w-72 lg:block'>
            <SideNav/>
        </div>
        {isMobileNavOpen && (
          <div className='fixed inset-0 z-50 lg:hidden'>
            <button
              aria-label='Close navigation'
              className='absolute inset-0 bg-black/50'
              onClick={() => setIsMobileNavOpen(false)}
            />
            <div className='relative h-full w-[min(86vw,18rem)]'>
              <SideNav onNavigate={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}
        <div className='min-w-0 lg:ml-72'>
          <Header onMenuClick={() => setIsMobileNavOpen(true)}/>
          <main className='min-w-0'>{children}</main>
        </div>
    </div>
    </UpdateCreditUsage.Provider>
  </TotalUsageContext.Provider>
  </UserSubscriptionContext.Provider>
  )
}

export default layout
