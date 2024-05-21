"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Product({product, name, email}:{product:any, name:string, email:string}) {
      const [isLoading, setIsLoading]=useState(false)
      const [isSuccess, setIsSuccess]=useState(false)
      const [id, setId]=useState<string>()

      const handleClick=async ()=>{
            setIsLoading(true);
            try {
                  
                  const response=await axios.post('/api/sendemail', {
                        name, email, id:product.id
                  })
                  
                  if(response.data.success){
                        toast.success("Check your email to get Product or you can directly download from here", {duration:5000})
                        setIsSuccess(true)
                        setIsLoading(false)
                        setId(response.data.href)
                  }
                  else
                        toast.error(response.data.message)
                  } catch (error:any) {
                        toast.error("You have already purchased this product, check your email or visit my orders page",error)
                  } finally{
                        setIsLoading(false)
                  }
      }

  return (
      <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className='text-4xl font-bold'>{"Payment Successful!"}</h1>
      <div className='flex gap-4 items-center'>
            <div className='aspect-video flex-shrink-0 w-1/3 relative'>
                  <img src={product?.imagePath} alt={product?.name}  className='object-cover'/>
            </div>
            <div>
                  <h1 className='text-2xl font-bold'>{product?.name}</h1>
                  <div className='line-clamp-3 text-muted-foreground'>{product?.description}</div>
            
            {isSuccess ? <Button className='mt-4'>
                  <a href={id}>{isLoading?"Downloading...":"Download"}</a>
                  </Button>:
                  <Button className='mt-4' size="lg" onClick={handleClick} disabled={isLoading}>
                        {isLoading? "confirming...": "Get the Product"}
                  </Button>
            }
            </div>
            </div>
</div>
  )
}

export default Product