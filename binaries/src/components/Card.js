import React from "react"


export default function Card({ title, children }) {

    return (
        <div className="bg-neutral-900 flex-grow flex h-2 flex-col rounded-md">
            <h1 className="bg-neutral-800 rounded-t-md p-2 relative">{title}</h1>
            <div className="p-2 h-fit flex flex-col overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}