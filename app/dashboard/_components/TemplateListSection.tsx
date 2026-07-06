import React, { useEffect, useState } from 'react'
import Templates from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'

export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?: FORM[]
}

export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

function TemplateListSection({userSearchInput}:any) {

  const [templateList, setTemplateList]=useState(Templates)

  useEffect(()=>{
    
    if(userSearchInput){
      const filteredData = Templates.filter(item=>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filteredData);
    }
    else{
      setTemplateList(Templates);
    }

  },[userSearchInput])

  return (
    <section className='mx-auto max-w-7xl p-4 sm:p-6 lg:p-8'>
      <div className='mb-5 flex items-end justify-between gap-4'><div><h2 className='text-xl font-bold tracking-tight text-slate-950 sm:text-2xl'>Explore AI tools</h2><p className='mt-1 text-sm text-slate-500'>{templateList.length} templates ready to use</p></div></div>
      <div className='grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {templateList.map((item:TEMPLATE, index:number)=>(
            <TemplateCard key={index} {...item}/>
        ))}
      </div>
    </section>
  )
}

export default TemplateListSection
