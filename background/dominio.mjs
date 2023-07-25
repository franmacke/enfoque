
export default class ListaDominio {
    constructor() {
        this.lista = []
        this.lastID = 0
    }

    agregarDominio(dominio) {
        let obj = {
            id: this.lastID + 1,
            dominio: dominio
        }
        this.lista.push(obj)

        return this.lista
    }

    eliminarDominioPorID(id) {
        let elementoBorrado = {}

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id === id) {
                elementoBorrado = lista.splice(i, 1);
                break;
            }
        }
        return elementoBorrado
    }

    obtenerLista() {
        return this.lista
    }
}