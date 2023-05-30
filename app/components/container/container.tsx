import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="w-full sm:w-[80%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[80%] mx-auto ">
      {/* Your content here */}
      {children}
    </div>

  )
}

export default Container as React.FC<{children:React.ReactNode}>