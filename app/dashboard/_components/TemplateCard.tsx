import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className='group h-full p-5 shadow-md rounded-md border bg-white
      flex flex-col gap-3 cursor-pointer transition-all
      hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white'>
        <Image src={item.icon} alt='icon' width={50} height={50} />
        <h2 className='font-semibold'>{item.name}</h2>
        <p className='text-sm text-gray-500 line-clamp-2 group-hover:text-white'>
          {item.desc}
        </p>
      </div>
    </Link>
  )
}

export default TemplateCard
