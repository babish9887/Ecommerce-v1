
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { EmailTemplate } from "@/lib/email";
import { Resend } from "resend";
import Product from "./Product";
import { connect } from "http2";

const resend = new Resend("re_jKD3mRE3_GWpffVnpTBnK1HUDLTKLk51A");

async function PurchaseSuccessPage({searchParams}: {
      searchParams:{id:string, name:string, email:string}
}) {
      
      console.log(searchParams.name, searchParams.email)
      const product=await db.product.findUnique({
            where:{id: searchParams.id} 
      })
      try {
            const user=await db.user.create({
                  data:{
                        email:searchParams.email,
                        name: searchParams.name,
                        isActivate:true

                  }
            })

      } catch (error) {
      }
    return (
     <Product product={product} name={searchParams.name} email={searchParams.email} />
    );
}

export default PurchaseSuccessPage;
