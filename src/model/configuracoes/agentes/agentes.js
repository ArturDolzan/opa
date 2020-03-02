import ModelBase from '../../base/modelBase'

class Agentes extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},
            {id: "fone", label: "Telefone", hidden: false, type: "string"},
            {id: "email", label: "E-mail", hidden: false, type: "string"},
            {id: "cpf", label: "CPF", hidden: false, type: "string"},                        
            {id: "data_cadastro", label: "Data de cadastro", hidden: false, type: "date"},
            {id: "password", label: "Senha", hidden: true, type: "password"},
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Agentes