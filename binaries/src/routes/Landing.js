import React, { useEffect, useState } from "react"
import Card from "../components/Card.js"
import Domain from "../components/Domain.js"
import Button from "../components/Button.js"
import Feedback from "./Feedback.js"
import { addDomain, getDomains, deleteDomain } from "../api/domainsApi.js"
import Error from "../components/Error.js"


export default function Landing({ setScreen }) {

    const [domains, setDomains] = useState([])
    const [error, setError] = useState('')

    const handleAddDomain = async () => {
        await addDomain()
            .catch(err => setError(err))

        await updateDomains()
    }

    const updateDomains = async () => {
        setDomains(await getDomainList())
    }

    const getDomainList = async () => {
        return await getDomains()
    }

    const deleteDomainFromList = async (id) => {
        await deleteDomain(id)
        await updateDomains()
    }

    const handleFeedback = () => setScreen(<Feedback setScreen={setScreen} />)

    useEffect(() => {
        getDomainList()
            .then(response => setDomains(response))
            .catch(err => setError(err))

        checkErrors()

        // let lista = []

        // for (let i = 0; i < 20; i++) {
        //     lista.push({ id: i + 1, dominio: 'youtube.com' })
        // }

        // setDomains(lista)
    }, [error])


    const checkErrors = () => {
        if (error) {
            setTimeout(() => setError(''), 3000)
        }
    }

    const showError = () => {
        if (error.length === 0) return
        return <Error error={error} />
    }

    const renderDomains = () => {
        if (domains.length === 0)
            return <h1>No agregaste nada todavia</h1>
        return domains.map(domain => <Domain key={domain.id} domain={domain} ondelete={deleteDomainFromList} />)
    }

    return (
        <>
            <div className="flex flex-col flex-grow h-full space-y-2 relative ">
                {showError()}
                <Card title="Sitios bloqueados">
                    {renderDomains()}
                </Card>

                <Button name={'Feedback'} onClick={handleFeedback} />
                <Button name={'Agregar sitio'} onClick={handleAddDomain} />
            </div>
        </>
    )
}