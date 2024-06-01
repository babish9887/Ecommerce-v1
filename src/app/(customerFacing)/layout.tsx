"use client"
import Nav, { NavLink } from '@/components/Nav'
import React from 'react'

export const dynamic = 'force-dynamic'

const CustomerLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <>
      <Nav>
      <a href='/'>
            <h1 className='hidden sm:block sm:text-3xl font-bold'>Digital Oasis</h1>
      </a>
      <div>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/products'>Products</NavLink>
            <NavLink href='/orders'>My Orders</NavLink>
      </div>
     
      </Nav>
      <div className='container my-6'>{children}</div>
    </>
  )
}

export default CustomerLayout