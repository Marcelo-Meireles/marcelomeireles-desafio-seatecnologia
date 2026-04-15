# marcelomeireles-desafio-seatecnologia

Automação de testes end-to-end para o **Desafio Tester** da SEA Tecnologia, utilizando **Playwright** e **TypeScript**, com abordagem focada em qualidade de software, rastreabilidade de casos de teste e padrão profissional de documentação.

## Objetivo

Este repositório tem como objetivo:

- Automatizar os principais fluxos da aplicação do desafio (cadastro, listagem, edição e exclusão de registros).
- Validar regras de negócio e mensagens de validação de formulário, com base em um plano de testes previamente estruturado.
- Servir como evidência técnica da atuação como Analista de Testes, contemplando boas práticas de estrutura de projeto, Page Object Model e organização de suítes de testes.

## Stack técnica

- [Playwright](https://playwright.dev/) + [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Page Object Model (POM) para encapsular páginas e componentes da aplicação
- Suporte a geração de relatórios HTML nativos do Playwright
- CI/CD com GitHub Actions

## Estrutura do projeto

```text
marcelomeireles-desafio-seatecnologia/
├─ .github/
│  └─ workflows/
│     └─ playwright.yml         # Pipeline de CI com GitHub Actions
├─ tests/
│  ├─ cadastro.spec.ts          # Cenários de cadastro e listagem (TC001, TC006, TC007)
│  ├─ validacoes.spec.ts        # Cenários de validação de campos e mensagens (TC002–TC005, TC013, TC015)
│  ├─ edicao.spec.ts            # Cenários de edição de registros (TC008, TC009)
│  └─ exclusao.spec.ts          # Cenários de exclusão e cancelamento (TC010, TC011)
├─ src/
│  └─ pages/
│     ├─ CadastroPage.ts        # Page Object da tela de cadastro de funcionário
│     └─ ListagemPage.ts        # Page Object da tela de listagem e gerenciamento
├─ fixtures/
│  └─ dadosCadastro.json        # Dados de teste reutilizáveis
├─ reports/                     # Relatórios gerados pelo Playwright (HTML)
├─ playwright.config.ts         # Configuração do Playwright Test
├─ package.json
└─ README.md
```

## Casos de teste cobertos

Os casos de teste automatizados foram derivados de um plano de testes e de uma planilha de casos de teste construída especificamente para o desafio, com cenários em Gherkin para rastreabilidade.

### Cadastro e listagem

- **TC001** – Cadastro válido de funcionário.
- **TC006** – Exibição do registro recém-cadastrado na listagem.
- **TC007** – Atualização da listagem após novo cadastro.

### Validações

- **TC002** – Campos obrigatórios em branco.
- **TC003** – CPF inválido no cadastro.
- **TC004** – Data de nascimento inválida.
- **TC005** – Limite de caracteres em campo textual.
- **TC013** – Mensagens de sucesso e erro.
- **TC015** – Caracteres inesperados em campos.

### Edição

- **TC008** – Edição de registro com dados válidos.
- **TC009** – Edição de registro com dados inválidos.

### Exclusão

- **TC010** – Exclusão de registro existente.
- **TC011** – Cancelamento da exclusão de registro.

## Pré-requisitos

- Node.js instalado (versão LTS recomendada).
- Navegadores suportados pelo Playwright instalados.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Marcelo-Meireles/marcelomeireles-desafio-seatecnologia.git
cd marcelomeireles-desafio-seatecnologia
npm install
npx playwright install --with-deps
```

## Execução dos testes

### Executar toda a suíte

```bash
npm test
```

### Executar apenas os testes de cadastro

```bash
npx playwright test tests/cadastro.spec.ts
```

### Executar com navegador visível (modo headed)

```bash
npx playwright test --headed
```

### Abrir o relatório HTML após execução

```bash
npx playwright show-report
```

## CI/CD com GitHub Actions

O repositório conta com pipeline configurado via GitHub Actions (`.github/workflows/playwright.yml`), que executa automaticamente toda a suíte de testes a cada `push` ou `pull_request` na branch `main`, publicando o relatório HTML como artifact para download.

## Page Object Model (POM)

As ações e elementos da aplicação são encapsulados em classes de página:

- `CadastroPage.ts`: representa a tela de cadastro de funcionário, incluindo campos de formulário (Nome, CPF, RG, Data de Nascimento, Cargo, EPI), botão Salvar e ações de preenchimento.
- `ListagemPage.ts`: representa a tela de listagem e gerenciamento, incluindo ações de localizar funcionário, abrir menu de ações (elipses), editar, excluir e confirmar/cancelar exclusão.

Esse padrão reduz duplicação de código, centraliza o mapeamento de seletores e torna os testes mais legíveis e fáceis de manter.

## Relacionamento com o desafio

Este projeto foi construído a partir de:

- Enunciado e protótipo do **Desafio Tester** da SEA Tecnologia.
- Plano de testes formal, com definição de escopo, tipos de teste, critérios de entrada/saída e riscos.
- Planilha de casos de teste (com IDs TC001–TC015) e cenários em Gherkin, utilizada como base tanto para execução manual quanto para a automação com Playwright.

## Próximos passos

- Ampliação da cobertura para cenários adicionais (fluxos alternativos e regressão).
- Inclusão de testes de API complementares, caso endpoints estejam disponíveis.
