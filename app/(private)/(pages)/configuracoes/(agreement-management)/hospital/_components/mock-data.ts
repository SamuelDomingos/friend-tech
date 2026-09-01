export interface HospitalInsuranceLink {
  convenioId: string
  convenioNome: string
  hospitalCode: string
  hospitalName: string
  hospitalCnpj: string
}

export interface Hospital {
  id: string
  nome: string
  cnes: string
  convenios: HospitalInsuranceLink[]
}

export const hospitalsMock: Hospital[] = [
  {
    id: "h1",
    nome: "Hospital São Lucas",
    cnes: "2077469",
    convenios: [
      {
        convenioId: "c1",
        convenioNome: "Amil",
        hospitalCode: "AMI-SL01",
        hospitalName: "Hospital São Lucas LTDA",
        hospitalCnpj: "12.345.678/0001-90",
      },
      {
        convenioId: "c2",
        convenioNome: "Unimed",
        hospitalCode: "",
        hospitalName: "",
        hospitalCnpj: "",
      },
    ],
  },
  {
    id: "h2",
    nome: "Hospital Santa Casa",
    cnes: "1122334",
    convenios: [],
  },
]
