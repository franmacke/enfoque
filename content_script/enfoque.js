console.log('Content Script Loaded')

if (document.readyState != "loading") {
    verificarBloqueado()
} else {
    document.addEventListener('DOMContentLoaded', verificarBloqueado)
}

async function getPestaniaActiva() {
    const tab = location.hostname;
    return tab
}

async function verificarBloqueado() {
    const pestania = await getPestaniaActiva()
    const dominiosBloqueados = await getDominiosBloqueados()

    if (dominiosBloqueados.includes(pestania)) {
        console.log('Bloqueado')
        bloquearPagina()
    } else {
        console.log('No esta bloqueado')
    }
}

async function getDominiosBloqueados() {
    const dominiosBloqueados = await enviarMensaje('GET')

    console.log(dominiosBloqueados)
    return dominiosBloqueados
}

async function enviarMensaje(accion, value = '') {
    let obj = {}
    obj['accion'] = accion
    obj['dominio'] = value

    return await browser.runtime.sendMessage(obj);
}

function bloquearPagina() {
    let body = document.body
    body.innerHTML = pantallaBloqueo()
}

function pantallaBloqueo() {

    return `
        <div class='pantalla-bloqueo'>
            <h1>DEJA DE BOLUDEAR Y PONETE A LABURAR</h1>
        </div>
    `
}