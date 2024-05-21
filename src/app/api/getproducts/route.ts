import db from "@/db/db"
import { NextResponse } from "next/server"

export async function POST(req:Request){
      const {order}=await req.json()



      const products=await db.product.findMany({
            where:{isAvailableforPurchase:true}, 
            orderBy:{name:"asc"}})
      return NextResponse.json({success:true, products}, {status:200})
}