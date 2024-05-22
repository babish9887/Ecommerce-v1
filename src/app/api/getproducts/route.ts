import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){
      
      const params=req.nextUrl.searchParams
      const order=params.get('order')
      console.log(order)
      if(order=='Top Sales'){
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  include:{
                        orders:true
                  }});
                  products.forEach(product => {
                        product.totalOrders = product.orders.length;
                    });
                    products.sort((a, b) => b.totalOrders - a.totalOrders);

                  return NextResponse.json({success:true, products}, {status:200})

      } else if(order=='Price Low to High'){
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  orderBy:{price:"asc"}})
                  return NextResponse.json({success:true, products}, {status:200})

      } else if(order=='Price High to Low'){
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  orderBy:{price:"desc"}})
                  return NextResponse.json({success:true, products}, {status:200})

      }else if(order=='Newest First'){
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  orderBy:{createdAt:"asc"}})
                  return NextResponse.json({success:true, products}, {status:200})

      } else if(order=='A-Z'){
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  orderBy:{name:"asc"}})
                  return NextResponse.json({success:true, products}, {status:200})
      } else {
            const products=await db.product.findMany({
                  where:{isAvailableforPurchase:true}, 
                  orderBy:{name:"asc"}})
                  return NextResponse.json({success:true, products}, {status:200})
      }
}