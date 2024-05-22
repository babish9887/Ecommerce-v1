"use client";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import React, { Suspense, useEffect, useState } from "react";
import { cache } from "@/lib/cache";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

async function page() {
  const [products, setProducts] = useState([]);
  const [position, setPosition] = React.useState("A-Z");
  useEffect(()=>{
      async function GetProducts(){
           const res=await axios.get(`/api/getproducts/?order=${position}`) 
           setProducts(res.data.products)
      }
      GetProducts()
  },[setPosition])
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl sm:5xl font-bold mb-6">Products</h1>
        <div className="flex justify-center items-center gap-4">
          <p>Sort By: </p>
          <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <Button variant="outline">{position}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="A-Z">A-Z</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Top Sales">Top Sales</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Price Low to High">Price Low to High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Price High to Low">Price High to Low</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Newest First">Newest First</DropdownMenuRadioItem>

                        </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products && products.length > 0 && <Product products={products} />}
      </div>
    </>
  );
}

async function Product({ products }: any) {
  return products.map((product: any) => (
    <ProductCard key={product.id} {...product} />
  ));
}

export default page;
