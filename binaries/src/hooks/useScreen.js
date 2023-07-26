import { useState } from "react"

const useScreen = (initialScreen) => {

    const [screen, setScreen] = useState(initialScreen)

    const changeScreen = (newScreen) => {
        setScreen(newScreen)
    }

    return [screen, changeScreen]
}

export { useScreen }