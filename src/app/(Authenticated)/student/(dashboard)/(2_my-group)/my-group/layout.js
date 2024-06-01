import React from 'react'

function layout({children}) {
  return (
    <div className='overflow-auto'>{children}</div>
  )
}

export default layout