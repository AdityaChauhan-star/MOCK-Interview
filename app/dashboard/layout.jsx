import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    <div>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'></div>
      {children}
    </div>
  )
}

export default DashboardLayout