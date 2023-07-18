console.log('Content Script Loaded')

const ON_SWITCH = 1

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
    if (await enviarMensaje("STATE") !== ON_SWITCH )
        return

    const pestania = await getPestaniaActiva()
    const dominiosBloqueados = await getDominiosBloqueados()

    if (dominiosBloqueados.find(item => item.dominio === pestania)) {
        console.log('Bloqueado')
        bloquearPagina()
    } else {
        console.log('No esta bloqueado')
    }
}

async function getDominiosBloqueados() {
    const dominiosBloqueados = await enviarMensaje('GET')
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
