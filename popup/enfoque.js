import Controller from "../controller/controller.mjs"

const KEY_DOMINIOS_BLOQUEADOS = 'dominiosBloqueados'
const DEBUG = true

var controller = new Controller()

document.addEventListener('DOMContentLoaded', async () => {
    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)


    let toggle = await toggleSwitch()
    toggle.addEventListener('click', handleToggleSwitch)

    renderListaDominios()
})

async function handleToggleSwitch() {
    return await controller.toggleSwitch()
}

async function getToggle() {
    return await controller.getToggle()
}

async function handleAgregadoRapido() {
    controller.addDominiosBloqueados()
        .then(async () => await renderListaDominios())
        .catch(error => renderError(error))
}

async function renderListaDominios() {
    let lista = await controller.getDominiosBloqueados()
    let listaHTML = lista.map(dominio => { return `<h3> ${dominio} </h3>` }).join('')

    const elemento = document.querySelector('#lista-dominios')
    elemento.innerHTML = listaHTML
}

function botonAgregadoRapido() {
    return document.querySelector('#agregar-rapido')
}

async function toggleSwitch() {
    const element = document.querySelector('#toggle-switch')
    element.checked = await getToggle() === 1
    return element
}


function renderError(error) {
    const element = document.querySelector('#error')

    element.style.display = 'block'
    element.innerHTML = error
}

function listItem(dominio) {

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