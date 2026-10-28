export interface CashFlowAccount {
  title: string
  values: number[]
}

export const cashFlowAccountsMock: CashFlowAccount[] = [
  {
    title: "Recebimentos",
    values: [
      48200, 51600, 49100, 52800, 57400, 54900, 60300, 61800, 59200, 64100,
      66500, 43800,
    ],
  },
  {
    title: "Pagamentos",
    values: [
      32400, 35100, 33800, 36200, 38100, 36900, 39400, 40300, 38600, 41200,
      42800, 28600,
    ],
  },
]

export const cashFlowStartingBalanceMock = 128000

export const cashFlowUnitsMock = ["Unidade Centro", "Unidade Aldeota"]

export const cashFlowCostCentersMock = [
  "Geral",
  "Clínico",
  "Administrativo",
]
