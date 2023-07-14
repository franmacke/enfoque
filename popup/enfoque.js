const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const DEBUG = true

document.addEventListener('DOMContentLoaded', () => {
    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)

    renderListaDominios()
})

async function handleAgregadoRapido() {
    addDominiosBloqueados(await getPestaniaActiva())
    await renderListaDominios()
}

async function renderListaDominios() {
    let lista = await getDominiosBloqueados()

    console.log(lista)

    lista.map(dominio => {
        `
            <h3> ${dominio} </h3>
        `
    })

    const elemento = listaDominios()
    elemento.innerHTML = lista
}

async function getPestaniaActiva() {
    const tab = browser.tabs.query({ currentWindow: true, active: true })
        .then((tabs) => tabs[0], console.error)
        .then(tab => tab.url)
        .then(tab => new URL(tab))
        .then(url => url.hostname);
    return tab
}

async function addDominiosBloqueados(dominio) {
    const dominiosBloqueados = await enviarMensaje('POST', dominio)
    // console.log('POPUP DB: ', dominiosBloqueados)
    return dominiosBloqueados
}

async function getDominiosBloqueados() {
    const response = await enviarMensaje('GET')
    return response
}

function botonAgregadoRapido() {
    return document.querySelector('#agregar-rapido')
}

function listaDominios() {
    return document.querySelector('#lista-dominios')
}

async function enviarMensaje(accion, value = '') {
    let obj = {}
    obj['accion'] = accion
    obj['dominio'] = value

    return await browser.runtime.sendMessage(obj);
}