'use client'
import React from 'react'

function FilterShell({children}) {
  return (
    <div className='grid grid-cols-4'>
    {children}
    </div>
    
  )
}

export default FilterShell