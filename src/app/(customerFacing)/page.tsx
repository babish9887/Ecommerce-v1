import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { cache } from '@/lib/cache'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'


const getMostPopularProducts =  cache(()=>{
      return db.product.findMany({
            where:{isAvailableforPurchase:true},
            orderBy:{orders:{_count:"desc"}},
            take:6
      })
},["/", "getMostPopularProducts"], {revalidate:60*60*24})

const getNewestProducts = cache(()=>{
      return db.product.findMany({
            where:{isAvailableforPurchase:true},
            orderBy:{createdAt:"desc"},
            take:6
      })
},["/","getNewestProducts"], {revalidate:60*60})

function HomePage() {
  return (
    <main className='space-y-12'>
      <ProductGridSection productFetcher={getMostPopularProducts} title='Most Popular'/>
      <ProductGridSection productFetcher={getNewestProducts} title='Newest'/>

    </main>
  )
}


async function ProductGridSection({title, productFetcher}:{title:string,productFetcher:()=>Promise<Product[]>}){
      return(
      <div className='space-y-4'>
      <div className='flex gap-4'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <Button asChild variant={'outline'}>
                  <Link href='/products' className='space-x-2'>
                        <span>View All</span>
                        <ArrowRight className='size-4'/>
                  </Link>
            </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* <Suspense fallback={
                  <>
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  </>
            }>
                  <ProductSuspense productFetcher={productFetcher}/>
            </Suspense> */}
            {(await productFetcher()).map(product=>(
            <ProductCard key={product.id} {...product}/>
      ))}
      </div>
      </div>
)
}

async function ProductSuspense({productFetcher}:{productFetcher:()=>Promise<Product[]>}){
      return (await productFetcher()).map(product=>(
            <ProductCardSkeleton key={product.id} {...product}/>
      ))
}




export default HomePage