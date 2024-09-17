import React from 'react'
import Sidebar from './Sidebar'
const Layout = ({children}) => {
  return (
    <div class="flex p-4 min-h-screen bg-[#FFDE74]">
      <Sidebar />
          <main className='px-4 flex-1'>
              <div className='bg-white rounded-lg p-5'>
          {children}</div></main>
      </div>
  )
}

export default Layout