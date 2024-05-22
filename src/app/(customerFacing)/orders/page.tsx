"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, DownloadIcon, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import Orders from './Orders'
import axios from 'axios'
import { Resend } from 'resend'
import { formatCurrency } from '@/lib/Formatter'
import { sendVerifyEmail } from '@/lib/mailer2'
import toast from 'react-hot-toast'
import getUser from '@/app/actions/getUser'

function page() {
      const [afterEmail, setAfterEmail]=useState(false)
      const [afterEmailVerified, setAfterEmailVerified]=useState(false)
      const [isLoading, setIsLoading]=useState(false)

      const [email, setEmail]=useState<string>()
      const [code, setCode]=useState<number>()

      const [Orders, setOrders]=useState<any>([])
      const [products, setProducts]=useState<any>([])



      const handleSubmit=async (e:any)=>{
            if(afterEmail && afterEmailVerified){
                  setAfterEmail(false)
                  setAfterEmailVerified(false)
                  return
            }
            setIsLoading(true)
            e.preventDefault()


            try {
                  
           
        if(afterEmail ){

            const res=await axios.post("/api/verifycode", {email, code})


            if(res.data.success){
                  const res=await axios.post('/api/getUser', {email})
                  if(!res.data.user) return
                  console.log(res.data.user)
                  const userId=res.data.user?.id
                  if(res.data.user){
                  const res=await axios.post('/api/getUserDownloads', {userId})
                  setOrders(res.data.usersOrders)
                  console.log(res.data.usersOrders)
                  }

                  setAfterEmailVerified(true)
            } else {
                  toast.error(res.data.message)
            }
        } else {
            const res =await axios.post("/api/sendVerificationCode", {email})
            console.log(res)
            if(res.data.success){
                  setAfterEmail(true);
                  toast.success(res.data.message)
            } else{
                  toast.error(res.data.message)
            }
        }
      } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")      
      } finally{
            setIsLoading(false)
      }
      }

  return (
      <>
    <form className='max-2-xl mx-auto'>
      <Card>
            <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>Enter your email to get All your Purchases</CardDescription>
            </CardHeader>
            <CardContent>
                  <div className='space-y-2'>
                        <Label>email</Label>
                        <Input type='email' required onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  {afterEmail && !afterEmailVerified && 
                  <div className='space-y-2'>
                  <Label>Enter the code we have just sent to email</Label>
                  <Input type='number' required onChange={(e)=>setCode(parseInt(e.target.value))}/>
            </div>}
            </CardContent>
            <CardFooter>
                  <Button disabled={isLoading} onClick={handleSubmit}>{afterEmail? "Submit": "Request code"}</Button>
            </CardFooter>
      </Card>
    </form>
      {afterEmail && afterEmailVerified && 
      (
            <>
            <h1 className='font-semibold mt-6 mb-4 text-3xl'>Here is All your Purchases!</h1>
            <Table>
            
            <TableHeader>
                  <TableRow>
                        
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Purchase Date</TableHead>

                        <TableHead className='w-0'>
                              <span className='sr-only'>Actions</span>
                        </TableHead>

                  </TableRow>
                  {Orders.map((order:any)=>{
                        return (
                              <TableRow key={order.id}>
                                    <TableCell className=''>
                                          <div className='flex flex-col'>
                                          <h4 className='font-semibold '>{order.name}</h4> 
                                          <p className='text-gray-700'>{order.description}</p>
                                          </div>
                                    </TableCell>
                                    <TableCell>{formatCurrency(order.price)}</TableCell>

                                    <TableCell>{order.purchaseDate}</TableCell>

                              <TableCell>
                              <Button className='mt-4'>
                              <a href={`http://localhost:3000/products/download/${order.orderId}?exp=false`}>{"Download"}</a>
                              </Button>
                              </TableCell>
                              </TableRow>
                        )
                  })}
            </TableHeader>
            <TableBody>
                 
            </TableBody>
      </Table>
      </>
      )}
      </>
  )
}



export default page