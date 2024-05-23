import Nav, { NavLink } from '@/components/Nav'
import React from 'react'

export const dynamic = 'force-dynamic'

const CustomerLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <>
      <Nav />
      <div className='container my-6'>{children}</div>
    </>
  )
}

export default CustomerLayout