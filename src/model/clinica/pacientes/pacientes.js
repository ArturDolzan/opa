import ModelBase from '../../base/modelBase'

class Pacientes extends ModelBase {
    
    constructor() {
        super()

        let model = [
            {id: "nome", label: "Nome", hidden: false, type: "string"},
            {id: "fone", label: "Telefone", hidden: false, type: "string"},
            {id: "email", label: "E-mail", hidden: false, type: "string"},
            {id: "endereco", label: "Endereço", hidden: false, type: "string"},            
            {id: "cpf", label: "CPF", hidden: false, type: "string"},                        
            {id: "sexo", label: "Sexo", hidden: false, type: "int"},
            {id: "data_nascimento", label: "Data de nascimento", hidden: false, type: "datetime"},
            
        ]

        this.fields = [...this.fields, ...model]
    }
}

export default Pacientes