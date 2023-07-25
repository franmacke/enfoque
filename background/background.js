const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const KEY_TOGGLE = 'toggleEnfoque'
const DEBUG = false
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

const extensionURL = browser.runtime.getURL('/');

// Extraer el dominio de la URL
const url = new URL(extensionURL);
const dominioExtension = url.hostname;

console.log("Dominio de la extensión:", dominioExtension);



async function handleMensaje(message) {
    switch (message.accion) {
        case 'GET':
            return getDominiosBloqueados()
        case 'POST':
            return agregarDominio(message.dominio)
        case 'DELETE':
            return borrarDominio(message.id)
        case 'TOGGLE':
            return toggleEnfoque()
        case 'STATE':
            return getToggle()
        case 'default':
            throw "Al mensaje le falta una accion"
    }
}

function toggleEnfoque() {
    // console.log("Estado actual: ", getToggle())
    if (getToggle() === DEFAULT_SWITCH) {
        this.guardarToggle(ON_SWITCH)
    } else {
        this.guardarToggle(DEFAULT_SWITCH)
    }
    // console.log("Nuevo estado: ", getToggle())

    return getToggle()
}


function getDominiosBloqueados() {
    let listaDominios = localStorage.getItem(KEY_DOMINIOS_BLOQUEADOS)

    if (listaDominios === null) {
        this.guardarLista([])
        listaDominios = JSON.stringify([])
    }

    return JSON.parse(listaDominios)
}


function getToggle() {
    let toggle = Number(localStorage.getItem(KEY_TOGGLE))
    if (toggle === null) {
        return DEFAULT_SWITCH
    }
    return toggle
}

function agregarDominio(dominio) {
    let lista = getDominiosBloqueados()
    let currentID = 0

    if (Object.keys(lista).length > 0) {
        currentID = Object.keys(lista).length;
    }

    if (lista.find(item => item.dominio === dominio)) {
        throw Error('Ya esta en la lista')
    }

    lista.push({
        id: currentID,
        dominio: dominio
    })

    return guardarLista(lista)
}

function borrarDominio(id) {
    let lista = getDominiosBloqueados()
    let index = lista.findIndex((item) => item.id === id)

    if (!index) throw Error('Algo salio mal')

    lista.splice(index, 1)

    return guardarLista(lista)
}

function guardarLista(lista) {
    localStorage.setItem(KEY_DOMINIOS_BLOQUEADOS, JSON.stringify(lista))
    return lista
}

function guardarToggle(nuevoToggle) {
    if (typeof nuevoToggle != "number") throw Error("El toggle tiene que ser un numero")

    localStorage.setItem(KEY_TOGGLE, nuevoToggle.toString())
    return nuevoToggle
}