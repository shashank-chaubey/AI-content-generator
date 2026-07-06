"use client"
import React from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react'
import {  LoaderIcon } from 'lucide-react';

interface PROPS{
    selectedTemplate?:TEMPLATE;
    userFormInput:any,
    loading:boolean
}

function FormSection({selectedTemplate,userFormInput,loading}:PROPS) {

    const [formData, setFormData]=useState<any>();

    const handleInputChange=(event:any)=>{
        const {name,value}=event.target;
        setFormData({...formData,[name]:value})
    }

    const onSubmit = (e:any) =>{
        e.preventDefault();
        userFormInput(formData);
    }

  return (
    <div className='min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-24'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100'><Image src={selectedTemplate?.icon as string} alt='' width={38} height={38}/></div>
        <h2 className='mb-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl'>{selectedTemplate?.name}</h2>
        <p className='text-sm leading-6 text-slate-500'>{selectedTemplate?.desc}</p>

        <form className='mt-6' onSubmit={onSubmit}>
            {selectedTemplate?.form?.map((item, index)=>(
                <div key={item.name} className='mb-5 flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700'>{item.label}</label>
                    {item.field == 'input'?
                        <Input name={item.name} required={item?.required}
                        className='h-11 rounded-xl border-slate-200'
                        onChange={handleInputChange}
                        />
                        :item.field=='textarea'?
                        <Textarea name={item.name} required={item?.required} className='min-h-28 resize-y rounded-xl border-slate-200'
                        onChange={handleInputChange}/>:null
                    }
                </div>
            ))}
            <Button type="submit" className='h-12 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800' disabled={loading}>
                {loading&&<LoaderIcon className='animate-spin'/>}
                Generate Content
            </Button>
        </form>

    </div>
  )
}

export default FormSection
