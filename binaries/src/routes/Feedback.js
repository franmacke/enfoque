import Button from "../components/Button";
import Card from "../components/Card";
import Landing from "./Landing";


export default function Feedback({ setScreen }) {

    const handleCancelFeedback = () => {
        setScreen(<Landing setScreen={setScreen} />)
    }

    return (
        <>
            <div className="flex flex-col flex-grow h-full space-y-2">
                <Card title="Feedback">
                    <span>Decime lo que sea!</span>
                    <textarea
                        placeholder="Escribi aca!"
                        className="w-full h-full bg-neutral-800 resize-none p-1">

                    </textarea>
                </Card>

                <Button name={'Enviar'} />
                <Button name={'Cancelar'} onClick={handleCancelFeedback} />

            </div>
        </>
    )
}