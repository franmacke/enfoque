import { useEffect, useState } from "react"


export default function Toggle() {

    const [status, setStatus] = useState(false)

    const handleToggle = () => {
        setStatus(!status)
    }

    useEffect(() => { console.log(status) }, [status])

    return (
        <label class="relative inline-flex items-center  cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" onChange={handleToggle} defaultValue={status} />
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}