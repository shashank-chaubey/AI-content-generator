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
    <div className='min-w-0 rounded-lg border bg-white p-4 shadow-md sm:p-5'>
        
        <Image src={selectedTemplate?.icon as string} alt='icon' width={70} height={70}/>
        <h2 className='mb-2 text-xl font-bold text-primary sm:text-2xl'>{selectedTemplate?.name}</h2>
        <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

        <form className='mt-7' onSubmit={onSubmit}>
            {selectedTemplate?.form?.map((item, index)=>(
                <div key={item.name} className='my-2 flex flex-col gap-2 mb-7'>
                    <label className='font-semibold'>{item.label}</label>
                    {item.field == 'input'?
                        <Input name={item.name} required={item?.required}
                        onChange={handleInputChange}
                        />
                        :item.field=='textarea'?
                        <Textarea name={item.name} required={item?.required}
                        onChange={handleInputChange}/>:null
                    }
                </div>
            ))}
            <Button type="submit" className='w-full py-6' disabled={loading}>
                {loading&&<LoaderIcon className='animate-spin'/>}
                Generate Content
            </Button>
        </form>

    </div>
  )
}

export default FormSection
