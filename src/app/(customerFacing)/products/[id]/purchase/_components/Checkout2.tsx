"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CryptoJS from 'crypto-js'



function Checkout2({product}:any) {
      const [isLoading, setIsLoading]=useState(false);
      const [errorMessage, setErrorMessage]=useState<string>()
      const [email, setEmail]=useState<string>()
      const [name, setName]=useState<string>()

      function handlePayButtonClick(e:any) {
            e.preventDefault()

            const uuid=new Date().getTime().toString().slice(-6);
            console.log(uuid);
            console.log(product.price)
          const jsonData:any = {
            "amount": product.price.toString(),
            "failure_url": `https://babish9887-ecommerce-nextjs.vercel.app/fail`,
            "product_delivery_charge": "0",
            "product_service_charge": "0",
            "product_code": "EPAYTEST",
            "signature": "",
            "signed_field_names": "total_amount,transaction_uuid,product_code",
            "success_url": `https://babish9887-ecommerce-nextjs.vercel.app/esewa/purchase-success?id=${product.id}&name=${name}&email=${email}&`,
            "tax_amount": "0",
            "total_amount": product.price.toString(),
            "transaction_uuid":uuid
          };
          let url="https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      
          const message = "total_amount=" + jsonData.total_amount + ",transaction_uuid=" + jsonData.transaction_uuid + ",product_code=" + jsonData.product_code;
          const signature = createSignature(message);
          jsonData.signature = signature;
      
      
          const form = document.createElement("form");
          for (const key in jsonData) {
            const field = document.createElement("input");
            field.setAttribute("type", "hidden");
            field.setAttribute("name", key);
            field.setAttribute("value", jsonData[key]);
            form.appendChild(field);
          }
      
          form.setAttribute("method", "post");
          form.setAttribute("action", url); // Replace "URL_TO_SUBMIT_TO" with your actual URL
          document.body.appendChild(form);
          form.submit();
        }
      
        function createSignature(message:string) {
          const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
          const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
          return hashInBase64;
        }
      


      return(
      <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className='flex gap-4 items-center'>
            <div className='aspect-video flex-shrink-0 w-1/3 relative'>
                  {/* <Image src={product.imagePath} alt={product.name} fill sizes='20' className='object-cover'/> */}
                  <img src={product.imagePath} alt={product.name} />
            </div>
            <div>
                 
                  <h1 className='text-2xl font-bold'>{product.name}</h1>
                  <div className='line-clamp-3 text-muted-foreground'>{product.description}</div>
            </div>
      </div>

      <form onSubmit={handlePayButtonClick}>
      <Card>
            <CardHeader>
                  <CardTitle>Get the Product</CardTitle>
                  {errorMessage && <CardDescription className='text-destructive'>{errorMessage}</CardDescription>}
                  <CardDescription className='text-desctructive'></CardDescription>
            </CardHeader>
            <CardContent>
                 <div className='mt-4 space-y-6'>
                 <Input type="text" placeholder="Full Name" className='input' onChange={(e)=>setName(e.target.value)} required/>
                 <Input type="email" placeholder="Email" className='input' onChange={(e)=>setEmail(e.target.value)} required/>
                 </div>
            </CardContent>
            <CardFooter>
                  <Button className='w-full' size="lg" disabled={ isLoading}
                  >
                      {isLoading ?  "Submitting...": `Purchase via esewa`}
                  </Button>
            </CardFooter>
      </Card>
      </form>
      </div>  
      )
}

export default Checkout2