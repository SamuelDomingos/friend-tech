import type { PacienteDetalhe } from "../dados-mock"
import type { CadastroPacienteFormData } from "../../_schemas/cadastro-paciente.schema"

const DADOS_COMPLEMENTARES: Record<
  string,
  Partial<CadastroPacienteFormData>
> = {
  "1": {
    nomeSocial: "",
    cpf: "123.456.789-00",
    rg: "2003012345678",
    sexo: "Feminino",
    estadoCivil: "Casada",
    profissao: "Analista de sistemas",
    nomeMae: "Antônia Silva",
    responsavel: "",
    email: "maria.silva@email.com",
    cep: "60175-047",
    logradouro: "Rua Padre Valdevino",
    numero: "1500",
    complemento: "Apto 802",
    bairro: "Aldeota",
    plano: "UNIMED Nacional",
    carteirinha: "0849201192837",
    validadeCarteirinha: "2028-12-31",
    observacoes: "Cliente VIP desde 2024.",
  },
}

export function montarCadastro(
  paciente: PacienteDetalhe
): CadastroPacienteFormData {
  return {
    nomeCompleto: paciente.nome,
    nomeSocial: "",
    cpf: "",
    rg: "",
    nascimento: paciente.dataNascimento,
    sexo: "",
    estadoCivil: "",
    profissao: "",
    nomeMae: "",
    responsavel: "",
    celular: paciente.telefone,
    telefone: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: paciente.cidade,
    estado: paciente.estado,
    convenio: paciente.convenioPrincipal,
    plano: "",
    carteirinha: "",
    validadeCarteirinha: "",
    observacoes: "",
    ...DADOS_COMPLEMENTARES[paciente.id],
  }
}
