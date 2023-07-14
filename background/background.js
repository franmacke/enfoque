const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const KEY_TOGGLE = 'toggleEnfoque'
const DEBUG = true
const DEFAULT_SWITCH = 0
const ON_SWITCH = 1

function borrarLocalStorage() {
    localStorage.removeItem(KEY_DOMINIOS_BLOQUEADOS)
    localStorage.removeItem(KEY_TOGGLE)
}
if (DEBUG) {
    borrarLocalStorage()
}

browser.runtime.onMessage.addListener(handleMensaje)

async function handleMensaje(message) {
    switch (message.accion) {
        case 'GET':
            return getDominiosBloqueados()
        case 'POST':
            return agregarDominio(message.dominio)
        case 'DELETE':
            return
        case 'TOGGLE':
            return toggleEnfoque()
        case 'STATE':
            return getToggle()
        case 'default':
            throw "Al mensaje le falta una accion"
    }
}

function toggleEnfoque() {
    if (getToggle() === DEFAULT_SWITCH) {
        localStorage.setItem(KEY_TOGGLE, ON_SWITCH)
    } else {
        localStorage.setItem(KEY_TOGGLE, DEFAULT_SWITCH)
    }
    return getToggle()
}


function getDominiosBloqueados() {
    let listaDominios = localStorage.getItem(KEY_DOMINIOS_BLOQUEADOS)


    if (listaDominios === null) {
        localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify([]))
        listaDominios = JSON.stringify([])
    }

    return JSON.parse(listaDominios)
}


function getToggle() {
    let toggle = localStorage.getItem(KEY_TOGGLE)
    if (toggle === null) {
        return DEFAULT_SWITCH
    }
    return toggle
}

function agregarDominio(dominio) {
    let lista = getDominiosBloqueados()

    if (!lista.includes(dominio)) {
        lista.push(dominio)
    } else {
        throw Error('Ya esta en la lista')
    }

    localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify(lista))

    return lista
}