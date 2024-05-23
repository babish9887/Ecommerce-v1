"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'
import React, { Children, ComponentProps } from 'react'

function Nav() {
  return (
    <nav className='bg-primary text-primary-foreground flex justify-around items-center px-4 h-16'>
      <a href='/'>
            <h1 className='hidden sm:block sm:text-3xl font-bold'>Digital Oasis</h1>
      </a>
      <div>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/products'>Products</NavLink>
            <NavLink href='/orders'>My Orders</NavLink>
      </div>
    </nav>
  )
}

export function NavLink(props:Omit<ComponentProps<typeof Link>, "className">){
      const pathname=usePathname()
      const data=pathname.split('/')
      //@ts-ignore
      return <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground transition duration-300", props.href===pathname && "bg-background text-foreground")}/>

}

export default Nav