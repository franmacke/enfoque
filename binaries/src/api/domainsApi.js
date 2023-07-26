// Defino browser como global para eslint, no borrar la linea de abajo.
/* global browser */

const KEY_DOMINIOS_BLOQUEADOS = 'domain-list'
const KEY_TOGGLE = 'toggleEnfoque'

const borrarLocalStorage = () => {
    localStorage.removeItem(KEY_DOMINIOS_BLOQUEADOS)
    localStorage.removeItem(KEY_TOGGLE)
}

const getCurrentTab = async () => {
    try {
        const tab = browser.tabs.query({ currentWindow: true, active: true })
            .then((tabs) => tabs[0], console.error)
            .then(tab => tab.url)
            .then(tab => new URL(tab))
            .then(url => url.hostname)
        return tab
    } catch {
        return 'google.com'
    }
}

const addDomain = async () => {
    // const tab = await getCurrentTab()
    const tab = 'youtube.com'
    const domainList = await getDomains()

    let currentID = 1

    if (Object.keys(domainList).length > 0) {
        currentID = Object.keys(domainList).length;
    }

    if (domainList.find(item => item.dominio === tab)) {
        throw Error('Ya esta en la lista')
    }

    domainList.push({
        id: currentID,
        dominio: tab
    })

    return save(KEY_DOMINIOS_BLOQUEADOS, domainList)
}

const getDomains = async () => {
    let domainList = localStorage.getItem(KEY_DOMINIOS_BLOQUEADOS)

    if (domainList === null) {
        localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify([]))
        domainList = JSON.stringify([])
    }

    return JSON.parse(domainList)
}

const deleteDomain = async (id) => {
    let lista = await getDomains()
    let index = lista.findIndex((item) => item.id === id)

    if (index === null) throw Error('Algo salio mal')

    lista.splice(index, 1)
    return save(KEY_DOMINIOS_BLOQUEADOS, lista)
}

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    return JSON.parse(localStorage.getItem(key))
}

export { getCurrentTab, addDomain, getDomains, deleteDomain }