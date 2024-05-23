import { EmailTemplate } from "@/lib/email";
import { Resend } from 'resend';
import * as React from 'react';
import db from "@/db/db";
import { sendEmail } from "@/lib/mailer";
import { connect } from "http2";

const resend = new Resend("re_Wns3aW9A_pUcauH3K8U9eFH84tWDghCdP");

export async function POST(req:Request) {
  try {
      const {id, name, email} =await req.json()
      console.log(id, name, email)
      if(!email && !name){
            return Response.json({success:false}, {status:405})
      }
      const product = await db.product.findUnique({ where: { id: id } });
      const user= await db.user.findUnique({ where: { email:email } });
      
      const ifOldVerificationData = await db.downloadVerification.findFirst({
            where: { 
                userId: user?.id,
                productId: product?.id
            }
        });
        
      if(ifOldVerificationData){
            return Response.json({ success:false, message:"You have already purchased this Product! Check my orders Section!" }, { status: 500 });
            
      }
      const verifcationData=await db.downloadVerification.create({
            data: {
                  product:{connect: {id: product?.id}},
                  user:{connect: {id:user?.id}},
                  expiresAt: new Date(Date.now()+1000*60*60*24)
            }
      })

      const order=await db.order.create({
            data:{
                  pricePaid:product?.price || 0,
                  user: {connect: {id:user?.id}},
                  product:{connect:{id:product?.id}
            }
            }
      })
      console.log(order)
      const href=`https://babish9887-ecommerce-nextjs.vercel.app/products/download/${verifcationData.id}`
     const emailStatus=await sendEmail({email:email, firstname:name.split(" ")[0], href, product:product?.name, price:product?.price})

    if (!emailStatus) {
      return Response.json({ success:false, message:"failed to send Email" }, { status: 500 });
    }
    return Response.json({success:true, href:href}, {status:200});
  } catch (error) {
      console.log(error)
    return Response.json({ error }, { status: 500 });
  }
}
