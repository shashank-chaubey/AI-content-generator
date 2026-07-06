"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput, UserSubscription } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import { HistoryRecord } from '../history/page'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsage } from '@/app/(context)/UpdateCreditUsage'
import { useRouter } from "next/navigation";

export function UsageTrack() {
    const router = useRouter();
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const [maxWords, setMaxWords] = useState(10000);
    const { creditUsage, setCreditUsage } = useContext(UpdateCreditUsage);

    useEffect(() => {
        if (user) {
            GetData();
            IsUserSubscribed();
        }
    }, [user]); 

    useEffect(() => {
        if (user) {
            GetData();
        }
    }, [creditUsage, user]); 

    const GetData = async () => {
        if (!user || !user.primaryEmailAddress?.emailAddress) return;

        const userEmail = user.primaryEmailAddress.emailAddress;

        const result = await db.select().from(AIOutput)
            .where(eq(AIOutput.createdBy, userEmail));

        const formattedResult: HistoryRecord[] = result.map((item) => ({
            id: item.id,
            formData: item.FormData,
            aiResponse: item.aiResponse || "",
            templateSlug: item.templateSlug,
            createdBy: item.createdBy,
            createdAt: item.createdAt || "",
        }));

        GetTotalUsage(formattedResult);
    };

    const IsUserSubscribed = async () => {
        if (!user || !user.primaryEmailAddress?.emailAddress) return;

        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));

        if (result.length > 0) { 
            setUserSubscription(true);
            setMaxWords(100000);
        }
    };

    const GetTotalUsage = (result: HistoryRecord[]) => {
        let total = result.reduce((acc, item) => acc + (item.aiResponse?.length || 0), 0);
        console.log("Total Usage:", total);
        setTotalUsage(total);
    };

    return (
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3'>
            <div>
                <div className='flex items-center justify-between'><h2 className='text-sm font-semibold text-slate-800'>Monthly credits</h2><span className='text-xs text-slate-500'>{Math.round(Math.min((Number(totalUsage) / maxWords) * 100, 100))}%</span></div>
                <div className='mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200'>
                    <div className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500' style={{ width: Math.min((Number(totalUsage) / maxWords) * 100, 100) + "%" }}></div>
                </div>
                <h2 className='mt-2 text-xs text-slate-500'>{Number(totalUsage).toLocaleString()} / {maxWords.toLocaleString()} used</h2>
            </div>
            <Button className="mt-3 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800" onClick={() => router.push("/dashboard/billing")}>
                Upgrade
            </Button>
        </div>
    );
}

export default UsageTrack;
