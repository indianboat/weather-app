import React from 'react'

const LoadingSpinner = ({ size = 10 }) => {
  return (
    <>
      <div className={`animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-slate-700 rounded-full`} role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>

    </>
  )
}

export default LoadingSpinner