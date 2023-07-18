import Controller from "../controller/controller.mjs"

var controller = new Controller()
const ON_SWITCH = 1


document.addEventListener('DOMContentLoaded', async () => {
    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)

    let toggle = await toggleSwitch()
    toggle.addEventListener('click', handleToggleSwitch)

    renderListaDominios()
})

async function handleToggleSwitch() {
    const state = await controller.toggleSwitch()
}

async function getToggle() {
    return await controller.getToggle()
}

async function handleAgregadoRapido() {
    controller.addDominiosBloqueados()
        .then(async (lista) => await renderListaDominios(lista))
        .then(async () => {
            if (await getToggle() == ON_SWITCH) controller.recargarPagina()
        })
        .catch(error => renderError(error))
}

async function renderListaDominios(lista = []) {
    if (lista.length === 0) {
        lista = await controller.getDominiosBloqueados()
    }

    const contenedorLista = document.querySelector('#lista-dominios')
    const contenedor = document.createElement("div")

    lista.forEach(item => {
        const elemento = listItem(item)
        contenedor.appendChild(elemento)
    })

    contenedorLista.innerHTML = ""
    contenedorLista.appendChild(contenedor)
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

    element.style.display = 'flex'
    element.getElementsByClassName('error__title')[0].innerHTML = error

    setTimeout(closeError, 3000)
}

function closeError() {
    const element = document.querySelector('#error')
    element.style.display = 'none'
}

async function handleBorrarDominio(item) {
    await controller.deleteDominio(item)
    await renderListaDominios()
}

function listItem(item) {
    const container = document.createElement("div")
    const nombreDominio = document.createElement("h3")
    const botonEliminar = document.createElement("button")
    const trashCan = document.createElement('div')

    nombreDominio.innerHTML = item.dominio
    container.setAttribute("id", item.id)

    container.setAttribute('class', 'item')
    nombreDominio.setAttribute('class', 'item-dominio')
    botonEliminar.setAttribute('class', 'button')

    trashCan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="17px" height="17px"><path fill="#ffffff" d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>`

    botonEliminar.addEventListener("click", () => handleBorrarDominio(item))
    botonEliminar.appendChild(trashCan)

    container.appendChild(nombreDominio)
    container.appendChild(botonEliminar)

    return container
}
