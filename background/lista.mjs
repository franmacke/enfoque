
export default class ListaDominios {
    constructor(listaString) {
        this.lista = []
        this.listaString = listaString

        return this.parseToJSON(this.listaString)
    }

    agregar(dominio) {
        if (!this.estaEnLista(dominio)) {
            this.lista.push({
                id: this.lista.length,
                dominio: dominio
            })
        } else {
            throw "Ya esta en la lista"
        }
    }

    estaEnLista(dominio) {
        return this.lista.find(item => item === dominio)
    }

    eliminar(id) {
        throw "No esta hecho todavia"
    }

    parseToJSON() {
        return JSON.parse(this.listaString)
    }

    parseToString() {
        return JSON.stringify(this.lista)
    }
}