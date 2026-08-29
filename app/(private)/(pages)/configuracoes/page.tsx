import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Handshake,
  Hospital,
  Landmark,
  LayoutGrid,
  Pill,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Table2,
  UserPlus,
  UserRound,
  Users,
  Building2,
  HeartHandshake,
  CreditCard,
  Receipt,
  NotebookTabs,
  Monitor,
  Globe,
  FileSearch,
} from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ConfigItem {
  title: string
  description: string
  icon: LucideIcon
  href?: string
}

interface ConfigSection {
  value: string
  label: string
  items: ConfigItem[]
}

const geralItems: ConfigItem[] = [
  {
    title: "Agenda",
    description: "Horários, atendimentos, feriados, executantes e convênios.",
    icon: CalendarDays,
    href: "/configuracoes/agenda",
  },
  {
    title: "Consultórios, salas e painel chamador",
    description: "Consultórios, salas, recepção e fila de espera.",
    icon: Monitor,
    href: "/configuracoes/consultorios",
  },
  {
    title: "Agendamento Online",
    description:
      "Perfil, endereços, tipos de atendimento, profissionais, convênios, limite de agendamentos, API.",
    icon: Globe,
  },
  {
    title: "Informações gerais",
    description: "CNPJ, endereço, contato, nota fiscal, eCAC, etc.",
    icon: Building2,
    href: "/configuracoes/informacoes-gerais",
  },
  {
    title: "Usuários",
    description: "Adições, permissões e informações de usuários.",
    icon: Users,
    href: "/configuracoes/usuarios",
  },
  {
    title: "Unidades",
    description: "Gerenciamento e configuração de unidades e grupos.",
    icon: LayoutGrid,
    href: "/configuracoes/unidades",
  },
  {
    title: "Relacionamento",
    description:
      "Nesta seção você customiza a comunicação com seus pacientes aniversariantes.",
    icon: HeartHandshake,
  },
  {
    title: "Prontuários",
    description:
      "Configuração de campos e seções para customizar seu prontuário.",
    icon: NotebookTabs,
  },
  {
    title: "Laudos",
    description:
      "Configurações de grupos, modelos, motivos de revisão, fluxos e achados críticos.",
    icon: FileSearch,
    href: "/configuracoes/laudo",
  },
]

const financeiroItems: ConfigItem[] = [
  {
    title: "Financeiro",
    description:
      "Contas bancárias, plano de contas, centro de custos e tags financeiras.",
    icon: Landmark,
    href: "/configuracoes/financeiro",
  },
  {
    title: "Repasse",
    description:
      "Configuração de repasses dos profissionais da sua clínica e suas regras.",
    icon: Receipt,
    href: "/configuracoes/repasse",
  },
  {
    title: "Cartões",
    description: "Gerenciamento de cartões aceitos na sua clínica.",
    icon: CreditCard,
  },
]

const gestaoConvenioItems: ConfigItem[] = [
  {
    title: "Convênios",
    description: "Gerenciamento dos convênios aceitos na sua clínica.",
    icon: Handshake,
  },
  {
    title: "Hospitais",
    description: "Gerenciamento de hospitais da sua clínica.",
    icon: Hospital,
  },
  {
    title: "Materiais e medicamentos",
    description: "Gerenciamento de outras despesas de sua clínica.",
    icon: Pill,
  },
  {
    title: "Solicitantes",
    description: "Gerenciamento e definição de regras de solicitantes.",
    icon: UserRound,
  },
  {
    title: "Tabela de preços",
    description: "Gerenciamento de tabelas de preço da sua clínica.",
    icon: Table2,
  },
  {
    title: "Executantes",
    description: "Gerenciamento de médicos externos à sua clínica.",
    icon: Stethoscope,
  },
  {
    title: "Procedimentos",
    description: "Essa é a descrição do passo atual.",
    icon: ClipboardList,
  },
  {
    title: "Regras de faturamento",
    description: "Gestão das regras de faturamento dos convênios.",
    icon: FileText,
  },
]

const avancadasItems: ConfigItem[] = [
  {
    title: "Ações especiais",
    description:
      "Visualização de ações especiais nos registros da sua clínica.",
    icon: Sparkles,
  },
  {
    title: "Campos obrigatórios",
    description:
      "Configuração dos campos de preenchimento obrigatório no agendamento ou cadastro de um paciente.",
    icon: ClipboardCheck,
  },
  {
    title: "Como conheceu",
    description: 'Gerenciamento das opções do campo "Como conheceu".',
    icon: UserPlus,
  },
  {
    title: "Parametrização",
    description: "Gestão de módulos, tipos de prontuários, SMS e extras.",
    icon: SlidersHorizontal,
  },
  {
    title: "Compartilhamentos",
    description:
      "Gestão de meus pacientes compartilhado e pacientes compartilhados da clínica.",
    icon: Share2,
  },
]

const sections: ConfigSection[] = [
  {
    value: "geral",
    label: "Geral",
    items: geralItems,
  },
  {
    value: "financeiro",
    label: "Financeiro",
    items: financeiroItems,
  },
  {
    value: "gestao-convenio",
    label: "Gestão Convênio",
    items: gestaoConvenioItems,
  },
  {
    value: "avancadas",
    label: "Avançadas",
    items: avancadasItems,
  },
]

function ConfigItemContent({ item }: { item: ConfigItem }) {
  return (
    <>
      <ItemMedia variant="icon">
        <item.icon className="size-5 text-muted-foreground group-hover/item:text-primary" />
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="font-medium">{item.title}</ItemTitle>

        <ItemDescription>{item.description}</ItemDescription>
      </ItemContent>
    </>
  )
}

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Configurações</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode parametrizar todo o sistema de acordo com as
          suas necessidades.
        </p>
      </div>

      <Tabs defaultValue="geral">
        <TabsList variant="line">
          {sections.map((section) => (
            <TabsTrigger key={section.value} value={section.value}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent
            key={section.value}
            value={section.value}
            className="mt-4"
          >
            <ItemGroup className="grid grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Item
                  key={item.title}
                  variant="outline"
                  asChild
                  className="cursor-pointer hover:bg-accent"
                >
                  {item.href ? (
                    <Link href={item.href}>
                      <ConfigItemContent item={item} />
                    </Link>
                  ) : (
                    <div>
                      <ConfigItemContent item={item} />
                    </div>
                  )}
                </Item>
              ))}
            </ItemGroup>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
