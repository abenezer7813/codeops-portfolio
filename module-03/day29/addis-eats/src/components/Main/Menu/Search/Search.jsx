import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function Search() {
    const searchRef=useRef(null)

    useEffect(()=>{
        searchRef.current.focus()
    },[])

    

  return (
    <div>
        <input ref={searchRef} type="text" id='search' className='search' placeholder='Search Dishes'/>
    </div>
  )
}

export default Search