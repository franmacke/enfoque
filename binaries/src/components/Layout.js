import React from 'react'
import Toggle from './Toggle'

export const Layout = ({ children }) => {

    return (
        <>
            <div className='flex flex-col font-mono w-96 h-96 text-white bg-neutral-950 '>
                <header className='h-12 bg-neutral-800 flex items-center justify-between px-2 w-full'>
                    <h1 className='font-bold text-xl'>Enfoque</h1>
                    <Toggle />
                </header>

                <div className='p-2 relative h-full'>
                    {children}
                </div>
            </div>
        </>
    )
}