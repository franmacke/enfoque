const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const DEBUG = true

function borrarLocalStorage() {
    localStorage.removeItem(KEY_DOMINIOS_BLOQUEADOS)
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
        case 'default':
            throw "Al mensaje le falta una accion"
    }
}


function getDominiosBloqueados() {
    let listaDominios = localStorage.getItem(KEY_DOMINIOS_BLOQUEADOS)

    if (listaDominios === null) {
        localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify([]))
        listaDominios = JSON.stringify([])
    }

    return JSON.parse(listaDominios)
}


function agregarDominio(dominio) {
    let lista = getDominiosBloqueados()

    lista.push(dominio)

    localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify(lista))

    return lista
}