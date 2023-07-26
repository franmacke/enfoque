

export default function Domain({ domain, ondelete }) {

    return (
        <>
            <div id={domain.id} className="flex flex-row justify-start items-center space-x-2">
                <img
                    src={`https://www.google.com/s2/favicons?domain=${domain.dominio}`}
                    alt="favicon"
                    className="items-center justify-center"
                />
                <span className="flex flex-grow items-center">{domain.dominio}</span>
                <button onClick={() => ondelete(domain.id)}>
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                    </svg>
                </button>
            </div>
        </>
    )
}