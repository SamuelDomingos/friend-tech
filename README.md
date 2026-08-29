# Friend Tech 🩺

**Friend Tech** é um clone do **Amigo One** ([appamigo.com.br](https://amigoapp.com.br)), o app "Seu melhor Amigo" para a área da saúde. O projeto recria a experiência de atendimento, organização de agenda/pacientes e conexão entre profissionais oferecida pelo app original — atendendo tanto **profissionais autônomos** quanto **clínicas e hospitais**.

Construído com **Next.js** e **shadcn/ui**.

---

## 📋 Sobre o projeto

O único app totalmente planejado para simplificar a rotina de quem cuida de pessoas, independente do porte:

- **Autônomos** — profissionais que atendem em plantões, consultórios compartilhados ou por telemedicina
- **Clínicas** — equipes que precisam centralizar agenda, recepção, prontuário e convênios
- **Hospitais** — operações maiores, com múltiplas unidades, equipes e níveis de acesso

Estruturado em três grandes pilares, assim como o produto original:

- **Atenda** — teleconsulta, prontuário e prescrição digital
- **Organize** — base de pacientes e agenda personalizada
- **Conecte-se** — comunidade e troca de conhecimento entre profissionais

---

## ✨ Funcionalidades

### 🩺 Atenda
- Teleconsulta segura na palma da mão
- Prontuário descomplicado e sempre disponível
- Prescrição digital de receitas, solicitações de exames e atestados
- Compartilhamento de documentos com o paciente via SMS

### 📅 Organize
- Base individual de pacientes
- Agenda única e personalizada
- Agendamento de consultas, teleconsultas, cirurgias e plantões
- Múltiplas visualizações da agenda (dia, semana, mês)
- Organização de encaixes e filas de espera

### 👥 Conecte-se
- Conexão e chat com colegas de profissão
- Acesso a notícias e artigos recentes da área da saúde
- Publicação de conteúdo e compartilhamento de casos
- Discussão de tratamentos e melhores soluções

### 🤖 Consulta Inteligente (IA)
- Transcrição em tempo real da consulta via IA
- Geração automática de resumo clínico
- Assistente virtual de IA para apoiar a rotina de atendimentos

### ✍️ AmigoSign (assinatura digital)
- Emissão de certificado digital
- Assinatura e compartilhamento seguro de documentos legais com o paciente

### 💰 Financeiro
- Integração de contas bancárias
- Controle financeiro e emissão de notas fiscais
- Contabilidade especializada para profissionais da saúde

### 🏥 Clínicas e hospitais
- Múltiplas visualizações e organização de encaixes e filas
- Agendamento rápido com disparo automático de SMS
- Links para coleta de cadastro e pré-consulta do paciente
- Rotinas otimizadas de confirmação de consultas
- Gestão de recepção, múltiplos profissionais e unidades
- Gestão de convênios e pagamentos
- Controle de perfis e permissões por função (médico, recepção, gestor)
- Relatórios e visão consolidada de atendimentos por unidade/equipe

### 💳 Planos
- **Autônomo — Mensal:** R$ 69,90
- **Autônomo — Anual:** R$ 699,90
- **Clínicas/Hospitais:** planos sob consulta, conforme número de profissionais e unidades

---

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org/) — framework React
- [shadcn/ui](https://ui.shadcn.com/) — biblioteca de componentes
- [Tailwind CSS](https://tailwindcss.com/) — estilização
- TypeScript

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
git clone <url-do-repositorio>
cd friend-tech
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de produção

```bash
npm run build
npm run start
```

---

## 🧩 Adicionando componentes (shadcn/ui)

Para adicionar novos componentes de UI ao projeto, rode:

```bash
npx shadcn@latest add button
```

Isso colocará os componentes na pasta `components/ui`.

### Usando componentes

```tsx
import { Button } from "@/components/ui/button";
```

---

## 📁 Estrutura do projeto

```
.
├── app/                    # Rotas e páginas (App Router)
│   ├── (auth)/             # Login, cadastro, onboarding
│   ├── agenda/             # Agenda e agendamentos
│   ├── atendimentos/       # Prontuário e registro de atendimentos
│   ├── teleconsulta/       # Salas de telemedicina
│   ├── prescricoes/        # Prescrição digital
│   ├── financeiro/         # Contas, faturamento e notas fiscais
│   ├── assinatura/         # AmigoSign — certificado e assinatura digital
│   ├── comunidade/         # Rede de profissionais
│   └── ia/                 # Consulta Inteligente / Amigo Intelligence
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   └── shared/             # Componentes reutilizáveis do projeto
├── lib/                    # Funções utilitárias, clients de API, hooks
├── public/                 # Arquivos estáticos
└── styles/                 # Estilos globais
```

> A estrutura acima é um guia de organização recomendado; ajuste conforme a evolução real do projeto.

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=
AUTH_SECRET=
AI_TRANSCRIPTION_API_KEY=
PAYMENT_PROVIDER_KEY=
```

> Ajuste as variáveis conforme os serviços realmente integrados (banco de dados, provedor de IA, gateway de pagamento, etc).

---

## 📜 Scripts disponíveis

| Comando           | Descrição                              |
|-------------------|-----------------------------------------|
| `npm run dev`     | Inicia o servidor de desenvolvimento    |
| `npm run build`   | Gera o build de produção                |
| `npm run start`   | Inicia o servidor em modo produção      |
| `npm run lint`    | Executa o linter                        |

---

## 🗺️ Roadmap

- [ ] Autenticação de usuários (autônomo, clínica, hospital)
- [ ] Multi-tenant: gestão de múltiplas unidades e equipes
- [ ] Perfis e permissões por função (médico, recepção, gestor)
- [ ] Agenda com múltiplas visualizações
- [ ] Prontuário eletrônico
- [ ] Teleconsulta
- [ ] Transcrição por IA + resumo clínico
- [ ] Prescrição digital
- [ ] Assinatura digital (AmigoSign)
- [ ] Módulo financeiro e emissão de notas fiscais
- [ ] Gestão de convênios e pagamentos
- [ ] Comunidade de profissionais
- [ ] Dashboard de insights com IA

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'feat: descrição da feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

## ⚠️ Aviso

O Friend Tech é um projeto de estudo/clone com fins educacionais, sem vínculo oficial com a Amigo Tech S/A. Todas as marcas e nomes originais pertencem aos seus respectivos donos.

---

## 📄 Licença

Defina a licença do projeto aqui (ex: MIT).