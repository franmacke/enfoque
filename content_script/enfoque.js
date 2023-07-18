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
    if (await enviarMensaje("STATE") !== ON_SWITCH)
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
        <body style="background-color: #f2f2f2; color: #333333; font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
                <h1 style="font-size: 24px; text-align: center; max-width: 400px;">¡Estás en medio de una sesión de estudio! No puedes usar esta página.</h1>
            </div>
            <style>
                @media (prefers-color-scheme: dark) {
                    body {
                        background-color: #333333 !important;
                        color: #f2f2f2 !important;
                    }
                }
            </style>
        </body>
    `
}
