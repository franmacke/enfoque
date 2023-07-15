
const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const DEBUG = true

document.addEventListener('DOMContentLoaded', async () => {
    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)


    let toggle = await toggleSwitch()
    toggle.addEventListener('click', handleToggleSwitch)

    renderListaDominios()
})

async function handleToggleSwitch() {
    const estado = await enviarMensaje('TOGGLE')
    return estado
}

async function getToggle() {
    return await enviarMensaje('STATE')
}

async function handleAgregadoRapido() {
    addDominiosBloqueados(await getPestaniaActiva())
    await renderListaDominios()
}

async function renderListaDominios() {
    let lista = await getDominiosBloqueados()
    listaHTML = lista.map(dominio => { return `<h3> ${dominio} </h3>` }).join('')

    const elemento = document.querySelector('#lista-dominios')
    elemento.innerHTML = listaHTML
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
        .catch(error => renderError(error))
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


async function toggleSwitch() {
    const element = document.querySelector('#toggle-switch')
    element.checked = await getToggle() === 1
    return element
}

async function enviarMensaje(accion, value = '') {
    let obj = {}
    obj['accion'] = accion
    obj['dominio'] = value

    return await browser.runtime.sendMessage(obj);
}


function renderError(error) {
    const element = document.querySelector('#error')

    element.style.display = 'block'
    element.innerHTML = error
}


function listItem (dominio) {

    return ` 
    <div> 
        <h3>
            ${dominio} 
        </h3>

        <button>
            x
        </button>
    </div>
    `
}