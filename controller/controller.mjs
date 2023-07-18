export default class Controller {

    async toggleSwitch() {
        const estado = await this.enviarMensaje('TOGGLE')
        return estado
    }

    async getToggle() {
        return await this.enviarMensaje('STATE')
    }

    async addDominiosBloqueados() {
        const pestaniaActual = await this.getPestaniaActiva()
        const dominiosBloqueados = await this.enviarMensaje('POST', pestaniaActual)
        // console.log('POPUP DB: ', dominiosBloqueados)
        return dominiosBloqueados
    }

    async getDominiosBloqueados() {
        const response = await this.enviarMensaje('GET')
        return response
    }

    async deleteDominio(item) {
        const response = await this.enviarMensaje("DELETE", item)
        return response
    }

    async getPestaniaActiva() {
        const tab = browser.tabs.query({ currentWindow: true, active: true })
            .then((tabs) => tabs[0], console.error)
            .then(tab => tab.url)
            .then(tab => new URL(tab))
            .then(url => url.hostname);
        return tab
    }

    async enviarMensaje(accion, value = '') {
        let obj = {}
        obj['accion'] = accion
        obj['dominio'] = value

        return await browser.runtime.sendMessage(obj);
    }

    async recargarPagina() {
        browser.tabs.reload()
    }
}