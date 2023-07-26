import { useEffect } from "react"
import { useScreen } from "../hooks/useScreen"
import Landing from "../routes/Landing"

export default function Router() {
    const [screen, setScreen] = useScreen(<></>)

    useEffect(() => {
        setScreen(<Landing setScreen={setScreen} />)
    }, [])

    return (
        <>
            {screen}
        </>
    )
}

