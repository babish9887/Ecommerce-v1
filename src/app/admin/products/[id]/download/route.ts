import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises'
import db from "@/db/db";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/db/config";

export async function GET(req:NextRequest, {params:{id}}:{params:{id:string}}){
      const product=await db.product.findUnique({where: {id}, select:{filePath: true, name: true}})
      if(product==null) return 

      const imageRef=ref(storage, product.filePath)

      const url=await getDownloadURL(imageRef)
      console.log(url)

      try {
      
            const respnse=await fetch(url)
            const blob=await respnse.blob()
            const blobUrl=URL.createObjectURL(blob)
      
            const link=document.createElement('a')
            link.href=blobUrl
            link.download='image.jpg'
            link.click()
            console.log(blobUrl)
            URL.revokeObjectURL(blobUrl)
          } catch (error) {
            console.log(error)
          }


}