import Controller from "../controller/controller.mjs"

var controller = new Controller()
const ON_SWITCH = 1
const SERVER_URL = 'http://127.0.0.1:8000/api/'

document.addEventListener('DOMContentLoaded', async () => {


    let agregadoRapido = botonAgregadoRapido()
    agregadoRapido.addEventListener('click', handleAgregadoRapido)

    let toggle = await toggleSwitch()
    toggle.addEventListener('click', handleToggleSwitch)

    let feedback = document.querySelector("#send-feedback")
    feedback.addEventListener('click', handleSendFeedback)

    let feedbackButton = document.querySelector('#feedback-btn')
    feedbackButton.addEventListener('click', handleOpenFeedback)

    let feedbackCloseButton = document.querySelector('#feedback-close-btn')
    feedbackCloseButton.addEventListener('click', handleCloseFeedback)

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

function handleOpenFeedback() {
    console.log('Abierto')
    document.querySelector('#feedback').style.display = 'flex'
}

function handleCloseFeedback() {
    document.querySelector('#feedback').style.display = 'none'
}

async function renderListaDominios(lista = []) {
    if (lista.length === 0) {
        lista = await controller.getDominiosBloqueados()
    }

    const contenedorLista = document.querySelector('#lista-dominios')
    const contenedor = document.createElement("div")


    if (Object.keys(lista).length !== 0) {
        lista.forEach(item => {
            const elemento = listItem(item)
            contenedor.appendChild(elemento)
        })
    } else {
        const elemento = emptyListItem()
        contenedor.appendChild(elemento)
    }

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

function closeSuccess() {
    const element = document.querySelector('#success-noti')
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


function emptyListItem() {
    const container = document.createElement("div")
    const nombreDominio = document.createElement("h3")

    nombreDominio.innerHTML = 'Todavia no agregaste nada'
    nombreDominio.setAttribute('class', 'item-dominio')

    container.appendChild(nombreDominio)

    return container
}

async function handleSendFeedback() {
    let input = document.querySelector('#feedback-text')

    if (input.value.length === 0) return

    const body = {
        commentText: input.value,
        date: formatDateToYYYYMMDD(new Date())
    }

    const response = await fetch(SERVER_URL + 'comments/',
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => handleCloseFeedback())
        .then(() => renderSuccess('El feedback se mando con exito'))
        .catch(err => renderError("Hubo un error al mandar el feedback"))
}

function renderSuccess(texto) {
    const element = document.querySelector('#success-noti')

    element.style.display = 'flex'
    element.getElementsByClassName('success__title')[0].innerHTML = texto

    setTimeout(closeSuccess, 3000)
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
