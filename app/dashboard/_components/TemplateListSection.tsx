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
    <div className='grid grid-cols-1 gap-4 bg-white p-4 min-[480px]:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4 xl:p-10'>
        {templateList.map((item:TEMPLATE, index:number)=>(
            <TemplateCard key={index} {...item}/>
        ))}
    </div>
  )
}

export default TemplateListSection
