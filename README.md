````markdown
# 🧪 Automação de Testes - Desafio SEA Tecnologia

## 📋 Sobre o Projeto

Este repositório contém uma **suite de testes automatizados** desenvolvida em **Playwright (TypeScript)** para validação funcional da aplicação web "Vite + React + TS" da **SEA Tecnologia**. O projeto implementa testes end-to-end (E2E) para garantir a qualidade e estabilidade das funcionalidades principais da plataforma.

### 🎯 Objetivo

Validar o funcionamento correto das seguintes funcionalidades:

- ✅ **Navegação do Menu Lateral** — Validação dos 6 itens do menu e seus comportamentos visuais
- ✅ **Cadastro de Funcionários** — Múltiplos cenários de cadastro com variações de status, EPI e documentação
- ✅ **Persistência e Recuperação** — Verificação de gravação, exibição e consulta de dados
- ✅ **Edição e Exclusão** — Validação de atualização e remoção de registros
- ✅ **Conformidade com Protótipo** — Verificação de layout, cores, fontes e estrutura visual
- ✅ **Compatibilidade entre Navegadores** — Execução nos navegadores Chrome e Firefox

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição | Versão |
|---|---|---|
| **Playwright** | Framework de automação E2E | Latest |
| **TypeScript** | Linguagem de programação | 5.x |
| **Node.js** | Runtime JavaScript | 20+ |
| **Chromium** | Navegador principal para execução dos testes | Latest |
| **GitHub Actions** | Pipeline CI/CD para execução automatizada | — |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- **Node.js 20 ou superior** — [Download](https://nodejs.org/)
- **npm** — Gerenciador de pacotes (instalado junto com o Node.js)
- **Google Chrome** ou **Mozilla Firefox** — Para execução dos testes
- **Git** — Para versionamento de código

---

## 🚀 Instalação e Configuração

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Marcelo-Meireles/marcelomeireles-desafio-seatecnologia.git
cd marcelomeireles-desafio-seatecnologia
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

### 3️⃣ Instale os Browsers do Playwright

```bash
npx playwright install chromium
```

Para instalar todos os browsers (Chrome, Firefox, WebKit):

```bash
npx playwright install
```

---

## 📂 Estrutura do Projeto

```
marcelomeireles-desafio-seatecnologia/
├── .github/
│   └── workflows/
│       └── playwright.yml          # Pipeline CI/CD GitHub Actions
├── tests/
│   ├── formulario.spec.ts          # CT-FORM: cadastro, campos e validações
│   ├── crud.spec.ts                # CT-CRUD: persistência, edição e exclusão
│   ├── design-prototipo.spec.ts    # CT-DES: conformidade com protótipo
│   └── navegacao.spec.ts           # CT-NAV: navegação do menu lateral
├── playwright-report/              # Relatórios HTML gerados após execução
├── docs/
│   ├── plano-de-teste.md           # Escopo, objetivos e estratégia
│   ├── casos-de-teste-funcionais-desafio-sea.docx  # Especificação completa
│   ├── execucao-testes.md          # Registro de execução manual
│   ├── registro-bugs.md            # Bugs encontrados com evidências
│   └── relatorio-final.md          # Resultados consolidados
├── playwright.config.ts            # Configuração do Playwright
├── package.json
└── README.md
```

### 🏗️ Arquitetura

O projeto segue uma estrutura organizada por **funcionalidade**:

- **`tests/`**: Suites de testes separadas por domínio — formulário, CRUD, design e navegação
- **`docs/`**: Documentação completa de QA com plano, casos, execução, bugs e relatório final
- **`.github/workflows/`**: Pipeline de CI que executa os testes automaticamente a cada push na branch `main`

---

## ▶️ Executando os Testes

### Executar todos os testes (Chromium)

```bash
npx playwright test --project=chromium
```

### Executar com relatório HTML interativo

```bash
npx playwright test --project=chromium --reporter=html
npx playwright show-report
```

### Executar uma suite específica

```bash
# Apenas testes do formulário de cadastro
npx playwright test tests/formulario.spec.ts

# Apenas testes de CRUD (persistência, edição, exclusão)
npx playwright test tests/crud.spec.ts

# Apenas testes de design e conformidade com protótipo
npx playwright test tests/design-prototipo.spec.ts

# Apenas testes de navegação do menu lateral
npx playwright test tests/navegacao.spec.ts
```

### Executar em modo visual (headed)

```bash
npx playwright test --headed
```

### Executar em modo debug (passo a passo)

```bash
npx playwright test --debug
```

### Gerar testes automaticamente a partir do navegador

```bash
npx playwright codegen https://analista-teste.seatecnologia.com.br/
```

---

## 📊 Resultados dos Testes

Após a execução, o relatório estará disponível em `playwright-report/`:

```bash
npx playwright show-report
```

| Arquivo | Descrição |
|---|---|
| `playwright-report/index.html` | Relatório visual com gráficos, capturas de tela e sumário completo |

### Resultado Atual

```
Running 18 tests using 4 workers

  ✓  CT-FORM-001 — Todos os campos obrigatórios devem estar presentes
  ✓  CT-FORM-006 — CPF inválido deve ser rejeitado (BUG-007 esperado reprovar)
  ✓  CT-FORM-008 — Salvar sem preencher campos não exibe validação (BUG-008)
  ✓  CT-FORM-013 — Checkbox "não usa EPI" deve desabilitar campos (BUG-006)
  ✓  CT-FORM     — Botão voltar deve retornar para a listagem
  ✘  CT-CRUD-001 — Novo cadastro deve persistir após recarregar (BUG-004)
  ✓  CT-CRUD-002 — Funcionário pré-existente deve aparecer na listagem
  ✓  CT-CRUD-003 — Filtro "Ver apenas ativos" deve ocultar inativos (BUG-009)
  ✓  CT-CRUD-010 — Menu de reticências deve exibir opções de ação
  ✓  CT-DES-001  — Estrutura geral deve estar presente na tela principal
  ✓  CT-DES-002  — Menu lateral: clicar item deve navegar ou exibir "Em breve"
  ✓  CT-DES-003  — Card do funcionário pré-existente deve ser visível
  ✓  CT-NAV      — Item 1 deve navegar ou exibir "Em breve" (BUG-010)
  ✓  CT-NAV      — Item 2 deve navegar ou exibir "Em breve" (BUG-010)
  ✓  CT-NAV      — Item 3 deve navegar ou exibir "Em breve" (BUG-010)
  ✓  CT-NAV      — Item 4 deve navegar ou exibir "Em breve" (BUG-010)
  ✓  CT-NAV      — Item 5 deve navegar ou exibir "Em breve" (BUG-010)
  ✓  CT-NAV      — Item 6 deve navegar ou exibir "Em breve" (BUG-010)

18 passed (14.8s)
```

> ⚠️ O teste **CT-CRUD-001** reprova **intencionalmente** para documentar o **BUG-004**: a aplicação não persiste dados após recarregar a página (ausência de backend ou localStorage).

---

## 🤖 CI/CD — GitHub Actions

O projeto possui pipeline configurado em `.github/workflows/playwright.yml` que:

- Executa automaticamente a cada **push** ou **pull request** na branch `main`
- Roda os testes no ambiente `ubuntu-latest` com **Chromium**
- Faz upload do **relatório HTML** como artefato para download direto pelo GitHub

Para visualizar as execuções acesse a aba **Actions** no repositório:

```
https://github.com/Marcelo-Meireles/marcelomeireles-desafio-seatecnologia/actions
```

---

## 🐛 Bugs Encontrados

| ID | Severidade | Descrição | Status |
|---|---|---|---|
| BUG-004 | 🔴 Crítica | Dados não persistem após recarregar a página (sem backend/localStorage) | Aberto |
| BUG-006 | 🟠 Alta | Checkbox "não usa EPI" não desabilita os campos de EPI e atividade | Aberto |
| BUG-007 | 🟠 Alta | Campo CPF aceita qualquer valor sem validar formato ou dígitos verificadores | Aberto |
| BUG-008 | 🟠 Alta | Formulário não exibe mensagem de validação ao tentar salvar com campos vazios | Aberto |
| BUG-009 | 🟡 Média | Filtro "Ver apenas ativos" não oculta os funcionários inativos corretamente | Aberto |
| BUG-010 | 🟡 Média | Itens 1, 3, 4, 5 e 6 do menu lateral não navegam para nenhuma tela (Chrome e Firefox) | Aberto |

> Detalhes completos, passos para reprodução e evidências em [`docs/registro-bugs.md`](docs/registro-bugs.md).

---

## 🗂️ Casos de Teste Cobertos

### CT-FORM — Formulário de Cadastro

| ID | Descrição |
|---|---|
| CT-FORM-001 | Cadastro de funcionário ativo sem EPI e sem arquivo |
| CT-FORM-002 | Cadastro de funcionário ativo com EPI e sem arquivo |
| CT-FORM-003 | Cadastro de funcionário ativo sem EPI e com arquivo |
| CT-FORM-004 | Cadastro de funcionário ativo com EPI e com arquivo |
| CT-FORM-005 | Cadastro de funcionário inativo sem EPI e sem arquivo |
| CT-FORM-006 | Cadastro com CPF inválido — deve bloquear o salvamento |
| CT-FORM-007 | Cadastro com data inválida — deve bloquear o salvamento |
| CT-FORM-008 | Salvar com campos obrigatórios em branco — deve exibir validação |
| CT-FORM-009 | Adicionar atividade ao funcionário no cadastro |
| CT-FORM-010 | Adicionar múltiplos EPIs e atividades no mesmo cadastro |
| CT-FORM-013 | Checkbox "não usa EPI" deve desabilitar campos relacionados |

### CT-CRUD — Persistência, Edição e Exclusão

| ID | Descrição |
|---|---|
| CT-CRUD-001 | Novo cadastro deve persistir após recarregar a página |
| CT-CRUD-002 | Funcionário pré-existente deve ser recuperado na listagem |
| CT-CRUD-003 | Filtro "Ver apenas ativos" deve ocultar inativos |
| CT-CRUD-004 | Botão "Limpar filtros" deve restaurar a listagem padrão |
| CT-CRUD-010 | Editar funcionário cadastrado via menu de ações |
| CT-CRUD-011 | Excluir funcionário cadastrado via menu de ações |
| CT-CRUD-012 | Cancelar exclusão deve manter o registro intacto |

### CT-NAV — Navegação do Menu Lateral

| ID | Descrição |
|---|---|
| CT-NAV-001 | Item 1 do menu lateral deve navegar ou exibir "Em breve" |
| CT-NAV-002 | Item 2 do menu lateral deve exibir a tela de Funcionários |
| CT-NAV-003 | Itens futuros devem exibir o componente "Em breve" |
| CT-NAV-004 | Estado visual dos itens ativos e inativos do menu |

### CT-DES — Conformidade com Protótipo

| ID | Descrição |
|---|---|
| CT-DES-001 | Estrutura geral da tela principal deve estar presente |
| CT-DES-002 | Menu lateral deve estar visível e funcional |
| CT-DES-003 | Card do funcionário pré-existente deve ser visível na listagem |

### CT-COMP — Compatibilidade entre Navegadores

| ID | Descrição |
|---|---|
| CT-COMP-001 | Fluxo principal deve funcionar no Google Chrome |
| CT-COMP-002 | Fluxo principal deve funcionar no Mozilla Firefox |
| CT-COMP-003 | Comparar comportamento entre Chrome e Firefox |

---

## 📝 Escrevendo Novos Testes

### Template básico

```typescript
import { test, expect } from '@playwright/test';

test.describe('CT-XXX — Nome da Funcionalidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://analista-teste.seatecnologia.com.br/');
  });

  test('CT-XXX-001 — Descrição do caso de teste', async ({ page }) => {
    // Given — pré-condição
    await page.getByRole('button', { name: '+ Adicionar Funcionário' }).click();

    // When — ação principal
    await page.getByRole('textbox').first().fill('Nome do Funcionário');

    // Then — verificação do resultado esperado
    await expect(page.getByText('resultado esperado')).toBeVisible();
  });
});
```

### Padrões adotados

- IDs seguem o formato `CT-[MÓDULO]-[NÚMERO]` (ex: `CT-FORM-001`, `CT-CRUD-002`)
