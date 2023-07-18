import Controller from "../controller/controller.mjs"

var controller = new Controller()

document.addEventListener('DOMContentLoaded', async () => {
    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)

    let toggle = await toggleSwitch()
    toggle.addEventListener('click', handleToggleSwitch)

    renderListaDominios()
})

async function handleToggleSwitch() {
    const state = await controller.toggleSwitch()

    if (state === ON_SWITCH) {
        await controller.recargarPagina()
    }
}

async function getToggle() {
    return await controller.getToggle()
}

async function handleAgregadoRapido() {
    controller.addDominiosBloqueados()
        .then(async (lista) => await renderListaDominios(lista))
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

    element.style.display = 'block'
    element.innerHTML = error
}

async function handleBorrarDominio(item) {
    await controller.deleteDominio(item)
    await renderListaDominios()
}

function listItem(item) {
    const container = document.createElement("div")
    const nombreDominio = document.createElement("h3")
    const botonEliminar = document.createElement("button")

    nombreDominio.innerHTML = item.dominio
    botonEliminar.innerHTML = "x"
    container.setAttribute("id", item.id)

    botonEliminar.addEventListener("click", () => handleBorrarDominio(item))

    container.appendChild(nombreDominio)
    container.appendChild(botonEliminar)

    return container
}
