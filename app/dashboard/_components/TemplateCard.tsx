import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/' + item?.slug} className='group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500'>
      <div className='flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-slate-200/70 sm:p-6'>
        <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-cyan-50'><Image src={item.icon} alt='' width={32} height={32} className='h-8 w-8 object-contain' /></div>
        <h2 className='font-semibold text-slate-900'>{item.name}</h2>
        <p className='line-clamp-3 text-sm leading-6 text-slate-500'>
          {item.desc}
        </p>
      </div>
    </Link>
  )
}

export default TemplateCard
